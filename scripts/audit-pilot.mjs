import fs from 'node:fs';
import vm from 'node:vm';

const baseUrl = process.env.PILOT_BASE_URL || 'http://172.20.52.227:2881';
const requiredHeaders = {
  'content-security-policy': ['default-src', "frame-ancestors 'none'", "object-src 'none'"],
  'strict-transport-security': ['max-age=', 'includeSubDomains'],
  'x-content-type-options': ['nosniff'],
  'x-frame-options': ['DENY'],
  'referrer-policy': ['no-referrer'],
  'permissions-policy': ['camera=()', 'microphone=()', 'geolocation=()'],
  'cross-origin-opener-policy': ['same-origin'],
  'cross-origin-resource-policy': ['same-origin'],
  'origin-agent-cluster': ['?1']
};

function fail(message) {
  throw new Error(message);
}

function checkInlineScriptSyntax() {
  const html = fs.readFileSync('htdocs/index.html', 'utf8');
  const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)];
  scripts.forEach(([, code], index) => {
    new vm.Script(code, { filename: `index-inline-${index}.js` });
  });

  ['pilot.css', 'pilot.js', 'manifest.webmanifest'].forEach(asset => {
    if (!fs.existsSync(`htdocs/${asset}`)) fail(`Missing pilot asset: ${asset}`);
  });

  if (/https?:\/\//i.test(html)) {
    fail('index.html should not depend on remote assets.');
  }
}

async function checkUrl(path) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: 'manual' });
  if (!response.ok && response.status < 300) fail(`${path} returned ${response.status}`);
  return response;
}

async function checkHeaders() {
  const response = await checkUrl('/');
  for (const [header, fragments] of Object.entries(requiredHeaders)) {
    const value = response.headers.get(header);
    if (!value) fail(`Missing security header: ${header}`);
    fragments.forEach(fragment => {
      if (!value.includes(fragment)) fail(`${header} is missing "${fragment}"`);
    });
  }
}

async function checkRoutes() {
  for (const path of ['/', '/simulation.html', '/flash.html', '/pilot.css', '/pilot.js', '/manifest.webmanifest']) {
    const response = await checkUrl(path);
    if (response.status >= 400) fail(`${path} returned ${response.status}`);
  }
}

checkInlineScriptSyntax();
await checkHeaders();
await checkRoutes();

console.log(`Pilot audit OK at ${baseUrl}`);
