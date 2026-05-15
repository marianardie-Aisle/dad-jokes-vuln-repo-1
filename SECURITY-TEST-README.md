# Security Test Vulnerabilities (PR Purpose)

This PR introduces **intentional, detectable-but-safe** code patterns for testing security scanners (e.g. Snyk, Semgrep, CodeQL, SAST tools). None of these patterns are exploitable or connected to real systems.

## Intended use

- Verify that your security scanning pipeline detects the expected patterns.
- Tune false-positive handling (scanners may flag these; they are intentional).
- Demo or training for security review processes.

## What is included

| Pattern | Detectable as | Why it's safe |
|--------|----------------|----------------|
| `dangerouslySetInnerHTML` | XSS | Content is from a fixed joke array, not user input. |
| Hardcoded API key / secrets | Secret exposure | Fake placeholders only (e.g. `12345-FAKE-API-KEY-FOR-TESTING`). |
| `Math.random()` for selection | Weak randomness | Used only for joke display, not crypto or auth. |
| String-concatenated SQL | SQL injection | No database; returns a string only. |
| `eval()` | Code injection | Called with literal `'1 + 1'` only. |
| `new Function()` | Dynamic code | Body is a literal, no user input. |
| `setTimeout(string)` | Code injection | String is literal `'void 0'`. |
| ReDoS-prone regex | ReDoS | Applied only to fixed short string `'aaa'`. |
| `innerHTML` assignment | XSS | Value is constant `'<span>safe</span>'`. |
| `console.debug` with token | Info leak | Token is fake (`sk-test-...`). |
| `Object.assign` merge | Prototype pollution | Both arguments are object literals. |

## Important

- **Do not** use these patterns in production code.
- **Do** remove or replace them once scanner testing is complete, or keep in a dedicated test/demo app only.
