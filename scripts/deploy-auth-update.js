#!/usr/bin/env node
/**
 * Deploy updated auth.php to WordPress container via EasyPanel
 * 1. Save script via updateScripts
 * 2. Trigger via webhook
 */
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const EP_KEY = 'e437b40d8bd51e3256fb6307cf9e10e550c051d4e95c6c616fc418b32f0aec06';
const PROJECT = 'graduados-sociales';
const SERVICE = 'web';

function epRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const bodyStr = body ? JSON.stringify(body) : '';
    const options = {
      hostname: 'panel.baitcore.com', port: 443,
      path: '/api/trpc/' + endpoint, method,
      headers: { 'Authorization': 'Bearer ' + EP_KEY, 'Content-Type': 'application/json' }
    };
    if (body) options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
    const req = https.request(options, (res) => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    req.on('error', reject);
    if (body) req.write(bodyStr);
    req.end();
  });
}

function triggerWebhook(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const mod = u.protocol === 'https:' ? https : http;
    mod.get(u.href, (res) => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
    }).on('error', reject);
  });
}

async function main() {
  const authPhp = fs.readFileSync(
    path.join(__dirname, '..', 'wordpress', 'theme', 'gsmadrid-headless', 'inc', 'auth.php'),
    'utf8'
  );
  const b64 = Buffer.from(authPhp).toString('base64');

  const scriptContent = [
    '#!/bin/bash',
    'THEME_DIR="/code/wp-content/themes/gsmadrid-headless"',
    'mkdir -p "$THEME_DIR/inc"',
    `echo '${b64}' | base64 -d > "$THEME_DIR/inc/auth.php"`,
    'echo "auth.php deployed: $(wc -c < $THEME_DIR/inc/auth.php) bytes"',
    'WP="wp --allow-root --path=/code"',
    '$WP cache flush 2>&1 | tail -3',
    'echo "DONE"'
  ].join('\n');

  const TOKEN = 'deploy-auth-' + Date.now();

  // Step 1: Get current scripts
  console.log('1. Getting current service config...');
  const input = encodeURIComponent(JSON.stringify({ json: { projectName: PROJECT, serviceName: SERVICE } }));
  const inspectRes = await epRequest('GET', `services.wordpress.inspectService?input=${input}`);
  const currentScripts = JSON.parse(inspectRes.body).result?.data?.json?.scripts || [];

  // Step 2: Add our deploy script
  const newScripts = currentScripts.filter(s => s.name !== 'deploy-auth');
  newScripts.push({ name: 'deploy-auth', content: scriptContent, webhookToken: TOKEN, enabled: true });

  console.log('2. Saving deploy script...');
  const updateRes = await epRequest('POST', 'services.wordpress.updateScripts', {
    json: { projectName: PROJECT, serviceName: SERVICE, scripts: newScripts }
  });
  console.log('   Update status:', updateRes.status);

  if (updateRes.status !== 200) {
    console.log('   Error:', updateRes.body.substring(0, 300));
    return;
  }

  // Step 3: Trigger via webhook
  console.log('3. Triggering script...');
  const webhookUrl = `http://51.255.174.32:3000/api/wordpress/script/${TOKEN}`;
  const triggerRes = await triggerWebhook(webhookUrl);
  console.log('   Trigger status:', triggerRes.status);
  console.log('   Output:', triggerRes.body.substring(0, 500));
}

main().catch(console.error);
