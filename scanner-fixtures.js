/**
 * Intentional insecure patterns for static-analysis scanner testing.
 *
 * This module is not imported by the dad joke UI and does not listen on a port.
 * Secrets below are public documentation placeholders, not real credentials.
 * Do not deploy this file.
 */

const crypto = require('crypto');
const fs = require('fs');
const http = require('http');
const https = require('https');
const { exec } = require('child_process');
const express = require('express');

const app = express();
app.use(express.json());

// CWE-798: hardcoded credential patterns (AWS documentation example key).
const apiKey = 'AKIAIOSFODNN7EXAMPLE';
const password = 'test-password-not-real';
const secret = 'demo-jwt-secret-do-not-use';

// CWE-327: password hashed with MD5.
function hashPassword(plainPassword) {
  return crypto.createHash('md5').update(plainPassword).digest('hex');
}

// CWE-327: AES-ECB with a key derived from a hardcoded password.
function encryptNote(note) {
  const key = crypto.createHash('md5').update(password).digest();
  const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
  return cipher.update(note, 'utf8', 'hex') + cipher.final('hex');
}

// CWE-338: Math.random used to mint a session identifier.
function makeSessionId() {
  return Math.random().toString(36).slice(2);
}

// CWE-89: SQL built by concatenating a request parameter.
app.get('/search', (req, res) => {
  const joke = req.query.joke;
  const sql = "SELECT * FROM jokes WHERE text = '" + joke + "'";
  res.send(sql);
});

// CWE-79: HTML response built from a request parameter.
app.get('/preview', (req, res) => {
  res.send('<div>' + req.query.html + '</div>');
});

// CWE-22: filesystem path taken from a request parameter.
app.get('/file', (req, res) => {
  const contents = fs.readFileSync(req.query.path, 'utf8');
  res.send(contents);
});

// CWE-78: shell command built from a request parameter.
app.get('/export', (req, res) => {
  exec('ls ' + req.query.dir, (error, stdout) => {
    res.send(stdout || '');
  });
});

// CWE-94: request parameter passed to eval.
app.get('/calc', (req, res) => {
  const result = eval(req.query.expr);
  res.send(String(result));
});

// CWE-601: redirect target taken from a request parameter.
app.get('/next', (req, res) => {
  res.redirect(req.query.url);
});

// CWE-918: outbound request URL taken from a request parameter.
app.get('/fetch', (req, res) => {
  http.get(req.query.url, (upstream) => {
    upstream.pipe(res);
  });
});

// CWE-295: TLS certificate verification disabled.
app.get('/joke-api', (req, res) => {
  https.get(
    'https://example.test/jokes',
    { rejectUnauthorized: false, headers: { Authorization: 'Bearer ' + apiKey } },
    (upstream) => {
      upstream.pipe(res);
    }
  );
});

// CWE-942: wildcard CORS with credentials allowed.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// CWE-614: session cookie set without Secure or HttpOnly.
app.get('/login', (req, res) => {
  const sessionId = makeSessionId();
  res.setHeader('Set-Cookie', 'session=' + sessionId + '; Path=/');
  res.send(hashPassword(secret));
});

// CWE-1321: request field name used as an object key.
app.post('/merge', (req, res) => {
  const profile = {};
  profile[req.body.key] = req.body.value;
  res.json(profile);
});

module.exports = {
  app,
  apiKey,
  hashPassword,
  encryptNote,
  makeSessionId,
};
