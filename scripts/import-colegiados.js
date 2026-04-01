#!/usr/bin/env node
/**
 * Import colegiados/precolegiados from CSV into WordPress
 *
 * CSV columns (header required):
 *   rol                 — "profesional" or "precolegiado" (required)
 *   nombre_completo     — Full name (required)
 *   email               — Email, used as WP login (required)
 *   dni_nie             — DNI or NIE
 *   numero_colegiado    — GS-XXXX or PRE-XXXX
 *   password            — If empty, auto-generated (8 chars)
 *   despacho            — Office name
 *   telefono            — Phone
 *   direccion           — Address
 *   codigo_postal       — Postal code
 *   web                 — Website URL
 *   linkedin            — LinkedIn URL
 *   bio                 — Professional bio (plain text)
 *   ejerciente          — "si" / "no" (default: no)
 *   mediador_registrado — "si" / "no" (default: no)
 *   acepta_turno_oficio — "si" / "no" (default: no)
 *   idiomas             — Comma-separated languages
 *   especialidades      — Comma-separated (creates terms if needed)
 *   localidades         — Comma-separated (creates terms if needed)
 *   visible_directorio  — "si" / "no" (default: no)
 *
 * Usage:
 *   node scripts/import-colegiados.js data/colegiados.csv
 *   node scripts/import-colegiados.js data/colegiados.csv --dry-run
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const EP_KEY = 'e437b40d8bd51e3256fb6307cf9e10e550c051d4e95c6c616fc418b32f0aec06';
const PROJECT = 'gsmadrid-2';
const SERVICE = 'wordpress';

// ---- CSV Parser (simple, handles quoted fields) ----

function parseCSV(text) {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  if (lines.length < 2) throw new Error('CSV must have header + at least 1 row');

  const headers = parseLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = parseLine(line);
    const row = {};
    headers.forEach((h, idx) => {
      row[h.trim().toLowerCase()] = (values[idx] || '').trim();
    });
    row._line = i + 1;
    rows.push(row);
  }
  return rows;
}

function parseLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else if (ch === ';' && !inQuotes) {
      // Also support semicolon delimiter
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

// ---- Validation ----

function validateRows(rows) {
  const errors = [];
  const emails = new Set();

  rows.forEach((row) => {
    const line = row._line;
    if (!row.rol || !['profesional', 'precolegiado'].includes(row.rol.toLowerCase())) {
      errors.push(`Line ${line}: 'rol' must be 'profesional' or 'precolegiado' (got: "${row.rol}")`);
    }
    if (!row.nombre_completo) {
      errors.push(`Line ${line}: 'nombre_completo' is required`);
    }
    if (!row.email) {
      errors.push(`Line ${line}: 'email' is required`);
    } else if (emails.has(row.email.toLowerCase())) {
      errors.push(`Line ${line}: duplicate email "${row.email}"`);
    } else {
      emails.add(row.email.toLowerCase());
    }
  });

  return errors;
}

// ---- Generate PHP import script ----

function generatePHP(rows) {
  const boolVal = (v) => ['si', 'sí', 'yes', 'true', '1'].includes((v || '').toLowerCase()) ? 'true' : 'false';

  const randomPass = () => {
    const chars = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let p = '';
    for (let i = 0; i < 10; i++) p += chars[Math.floor(Math.random() * chars.length)];
    return p;
  };

  // Escape PHP string
  const esc = (s) => (s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");

  let php = `
// Suppress emails during import
add_filter('wp_mail', function() { return false; }, 999);
remove_action('user_register', 'gsmadrid_email_bienvenida_precolegiado');
remove_action('transition_post_status', 'gsmadrid_email_bienvenida_colegiado');

$results = [];
$created = 0;
$skipped = 0;
$errors = 0;

`;

  rows.forEach((row, idx) => {
    const email = esc(row.email);
    const nombre = esc(row.nombre_completo);
    const rol = row.rol.toLowerCase();
    const password = row.password || randomPass();
    const numCol = esc(row.numero_colegiado);
    const dni = esc(row.dni_nie);

    php += `
// --- Row ${idx + 1}: ${nombre} ---
$email = '${email}';
if (email_exists($email) || username_exists($email)) {
  $results[] = "SKIP: $email (already exists)";
  $skipped++;
} else {
  $user_id = wp_insert_user([
    'user_login'   => $email,
    'user_email'   => $email,
    'user_pass'    => '${esc(password)}',
    'display_name' => '${nombre}',
    'role'         => '${rol}',
  ]);

  if (is_wp_error($user_id)) {
    $results[] = "ERROR: $email — " . $user_id->get_error_message();
    $errors++;
  } else {
    // user_register hook creates CPT automatically
    $post_id = get_user_meta($user_id, '_profesional_post_id', true);

    if ($post_id && function_exists('update_field')) {
      // Core fields
      update_field('nombre_completo', '${nombre}', $post_id);
      update_field('numero_colegiado', '${numCol}', $post_id);
      update_field('dni_nie', '${dni}', $post_id);
      update_field('email', '${email}', $post_id);
`;

    // Optional fields
    const optionalText = ['despacho', 'telefono', 'direccion', 'codigo_postal', 'web', 'linkedin', 'bio', 'idiomas'];
    optionalText.forEach((f) => {
      if (row[f]) {
        php += `      update_field('${f}', '${esc(row[f])}', $post_id);\n`;
      }
    });

    // Boolean fields
    const boolFields = ['ejerciente', 'mediador_registrado', 'acepta_turno_oficio', 'visible_directorio'];
    boolFields.forEach((f) => {
      if (row[f]) {
        php += `      update_field('${f}', ${boolVal(row[f])}, $post_id);\n`;
      }
    });

    // Taxonomies
    if (row.especialidades) {
      const terms = row.especialidades.split(',').map(t => t.trim()).filter(Boolean);
      terms.forEach((t) => {
        php += `      wp_set_object_terms($post_id, '${esc(t)}', 'especialidad', true);\n`;
      });
    }
    if (row.localidades) {
      const terms = row.localidades.split(',').map(t => t.trim()).filter(Boolean);
      terms.forEach((t) => {
        php += `      wp_set_object_terms($post_id, '${esc(t)}', 'localidad', true);\n`;
      });
    }

    // Publish if visible
    if (boolVal(row.visible_directorio) === 'true') {
      php += `      wp_update_post(['ID' => $post_id, 'post_status' => 'publish']);\n`;
    }

    php += `
    }

    $results[] = "OK: $email (user=$user_id, post=$post_id, rol=${rol}, pass=${esc(password)})";
    $created++;
  }
}

`;
  });

  php += `
// Summary
echo "\\n=== IMPORT RESULTS ===\\n";
echo "Created: $created | Skipped: $skipped | Errors: $errors\\n\\n";
foreach ($results as $r) { echo $r . "\\n"; }

wp_cache_flush();
`;

  return php;
}

// ---- EasyPanel API ----

function epRunScript(name, content) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ json: { projectName: PROJECT, serviceName: SERVICE, name, content } });
    const req = https.request({
      hostname: 'panel.baitcore.com', port: 443,
      path: '/api/trpc/services.wordpress.runScript',
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + EP_KEY, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let d = ''; res.on('data', (c) => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let d = ''; res.on('data', (c) => d += c);
      res.on('end', () => resolve(d));
    }).on('error', reject);
  });
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

// ---- Main ----

async function main() {
  const args = process.argv.slice(2);
  const csvPath = args.find((a) => !a.startsWith('--'));
  const dryRun = args.includes('--dry-run');

  if (!csvPath) {
    console.log('Usage: node scripts/import-colegiados.js <csv-file> [--dry-run]');
    console.log('');
    console.log('CSV columns: rol, nombre_completo, email, dni_nie, numero_colegiado,');
    console.log('  password, despacho, telefono, direccion, codigo_postal, web, linkedin,');
    console.log('  bio, ejerciente, mediador_registrado, acepta_turno_oficio, idiomas,');
    console.log('  especialidades, localidades, visible_directorio');
    process.exit(1);
  }

  // Read and parse CSV
  const csvText = fs.readFileSync(path.resolve(csvPath), 'utf8');
  const rows = parseCSV(csvText);
  console.log(`Parsed ${rows.length} rows from CSV`);

  // Validate
  const errors = validateRows(rows);
  if (errors.length > 0) {
    console.log('\nValidation errors:');
    errors.forEach((e) => console.log('  ' + e));
    process.exit(1);
  }
  console.log('Validation OK');

  // Generate PHP
  const php = generatePHP(rows);

  if (dryRun) {
    console.log('\n--- DRY RUN: PHP that would be executed ---');
    console.log(php);
    console.log('--- END DRY RUN ---');
    console.log(`\nWould import ${rows.length} records. Run without --dry-run to execute.`);
    return;
  }

  // Upload PHP as base64 and run via eval-file
  const phpB64 = Buffer.from(php).toString('base64');
  const bashScript = [
    '#!/bin/bash',
    'exec > /code/import-result.txt 2>&1',
    `echo "${phpB64}" | base64 -d > /tmp/import-colegiados.php`,
    'wp --allow-root --path=/code eval-file /tmp/import-colegiados.php',
    'rm -f /tmp/import-colegiados.php',
  ].join('\n');

  console.log('Uploading and executing import...');
  const result = await epRunScript('import-colegiados-' + Date.now(), bashScript);

  if (result.status !== 200) {
    console.log('EasyPanel error:', result.status, result.body.substring(0, 300));
    process.exit(1);
  }

  // Wait and read results
  console.log('Script submitted, waiting for results...');
  await sleep(5000);

  const output = await fetchUrl('https://gsmadrid-2-wordpress.a7lflv.easypanel.host/import-result.txt');
  console.log('\n' + output);

  // Clean up result file
  await epRunScript('cleanup-import', '#!/bin/bash\nrm -f /code/import-result.txt');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
