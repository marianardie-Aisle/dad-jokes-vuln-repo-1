const fs = require('fs');
const path = require('path');
const assert = require('assert');

const sourcePath = path.join(__dirname, 'dad-jokes-test.js');
const source = fs.readFileSync(sourcePath, 'utf8');

function test(name, fn) {
  try {
    fn();
    console.log(`PASS: ${name}`);
  } catch (error) {
    console.error(`FAIL: ${name}`);
    console.error(error.message);
    process.exitCode = 1;
  }
}

test('contains an expanded dad joke list', () => {
  const jokeLines = source.match(/^\s*"[^"]+",?$/gm) || [];
  assert.ok(jokeLines.length >= 30, `expected at least 30 jokes, found ${jokeLines.length}`);
});

test('all jokes are non-empty strings', () => {
  const jokes = source.match(/^\s*"([^"]+)",?$/gm) || [];
  jokes.forEach((line) => {
    const text = line.match(/"([^"]+)"/)[1];
    assert.ok(text.trim().length > 0, 'joke text must not be empty');
  });
});

test('retains the demo XSS pattern', () => {
  assert.match(source, /dangerouslySetInnerHTML/);
});

test('retains the fake hardcoded API key', () => {
  assert.match(source, /FAKE-API-KEY-FOR-TESTING/);
});

test('retains the weak random generator example', () => {
  assert.match(source, /Math\.random\s*\(/);
});

test('retains the simulated SQL injection pattern', () => {
  assert.ok(
    source.includes(`return "SELECT * FROM jokes WHERE text = '" + param + "'";`),
    'expected the simulated SQL query string concatenation to remain in place'
  );
});

test('retains the unsafeSetHTML helper for XSS demo', () => {
  assert.match(source, /function unsafeSetHTML/);
  assert.match(source, /unsafeSetHTML\(joke\)/);
});

test('retains the hardcoded API key variable', () => {
  assert.match(source, /const DAD_JOKE_API_KEY\s*=/);
});

test('documents demo vulnerabilities in the UI', () => {
  assert.match(source, /Purposeful Demo Vulnerabilities/);
  assert.match(source, /secure coding demo\/testing/);
});
