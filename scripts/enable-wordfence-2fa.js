#!/usr/bin/env node
/**
 * Enable Wordfence Login Security 2FA for colegiado roles.
 *
 * Prerequisites: Wordfence Security 8.x already installed.
 * Wordfence Login Security (included with Wordfence) supports TOTP 2FA.
 *
 * This script:
 * 1. Enables Login Security module
 * 2. Makes 2FA available (optional) for profesional and precolegiado roles
 * 3. Does NOT force 2FA — users can activate it from their profile
 *
 * Run: node scripts/enable-wordfence-2fa.js
 */
const https = require('https');

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

async function main() {
  const script = [
    '#!/bin/bash',
    'WP="wp --allow-root --path=/code"',
    '',
    'echo "=== Enabling Wordfence Login Security 2FA ==="',
    '',
    '# Wordfence stores Login Security settings in wfls_settings option',
    '# Enable 2FA module and make it available for custom roles',
    '$WP option update wfls_settings \'{"enable_2fa":true,"allow_2fa_roles":["administrator","profesional","precolegiado"],"require_2fa_roles":[],"grace_period_enabled":false,"remember_device_enabled":true,"remember_device_duration":30,"xml_rpc_2fa_bypass":false}\' --format=json 2>&1',
    '',
    '# Activate Wordfence Login Security if not already',
    '$WP plugin is-active wordfence-login-security 2>/dev/null && echo "WF Login Security: already active" || $WP plugin activate wordfence-login-security 2>&1',
    '',
    '# Verify',
    'echo "=== Current 2FA config ==="',
    '$WP option get wfls_settings --format=json 2>&1 | head -5',
    '',
    'echo "DONE"'
  ].join('\n');

  const TOKEN = 'enable-2fa-' + Date.now();

  // Get current scripts
  console.log('1. Getting current scripts...');
  const input = encodeURIComponent(JSON.stringify({ json: { projectName: PROJECT, serviceName: SERVICE } }));
  const inspectRes = await epRequest('GET', `services.wordpress.inspectService?input=${input}`);
  const info = JSON.parse(inspectRes.body).result?.data?.json;

  if (!info?.enabled) {
    console.log('!! Service is DISABLED. Enable it first in EasyPanel, then re-run this script.');
    console.log('   Script saved locally — ready to deploy when service is up.');
    return;
  }

  const currentScripts = info.scripts || [];
  const newScripts = currentScripts.filter(s => s.name !== 'enable-2fa');
  newScripts.push({ name: 'enable-2fa', content: script, webhookToken: TOKEN, enabled: true });

  console.log('2. Saving 2FA script...');
  const updateRes = await epRequest('POST', 'services.wordpress.updateScripts', {
    json: { projectName: PROJECT, serviceName: SERVICE, scripts: newScripts }
  });
  console.log('   Status:', updateRes.status);
  console.log('3. Script saved. Trigger it from EasyPanel admin or re-run when webhook is accessible.');
}

main().catch(console.error);
