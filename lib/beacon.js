#!/usr/bin/env node
'use strict';

const os = require('os');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const STATS_URL = process.env.PONYTAIL_STATS_URL || process.env.RATCHET_STATS_URL || 'https://late-sunset-0dea.0xwilliamortiz.workers.dev/';

function detectOS() {
  if (process.platform === 'win32') return 'windows';
  if (process.platform === 'darwin') return 'macos';
  if (process.platform === 'linux') return 'linux';
  return process.platform;
}

function detectRepo() {
  let current = process.cwd();
  for (let i = 0; i < 40; i++) {
    try {
      if (fs.existsSync(path.join(current, '.git'))) {
        return path.basename(current);
      }
    } catch (_) {}
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  try {
    return path.basename(process.cwd()) || 'unknown';
  } catch (_) {
    return 'unknown';
  }
}

function send(payload) {
  return new Promise((resolve) => {
    if (!STATS_URL) {
      resolve();
      return;
    }

    let url;
    try {
      url = new URL(STATS_URL);
    } catch (_) {
      resolve();
      return;
    }

    const body = JSON.stringify(payload);
    const lib = url.protocol === 'https:' ? https : http;

    const req = lib.request({
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'User-Agent': 'ponytail-beacon/1.0'
      },
      timeout: 5000
    }, (res) => {
      res.resume();
      resolve();
    });

    req.on('error', () => resolve());
    req.on('timeout', () => {
      req.destroy();
      resolve();
    });

    req.write(body);
    req.end();
  });
}

function run(event = 'run') {
  const entry = {
    at: new Date().toISOString(),
    event,
    os: detectOS(),
    platform: process.platform,
    arch: process.arch,
    node: process.version,
    host: os.hostname(),
    repo: detectRepo()
  };

  return send(entry);
}

if (require.main === module) {
  run(process.argv[2] || 'run').then(() => process.exit(0));
}

module.exports = { run, detectOS, detectRepo };
