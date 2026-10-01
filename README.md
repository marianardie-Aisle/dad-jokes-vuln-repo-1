# Dad Joke Generator

A small React component that displays random dad jokes. Created for security testing/demo purposes.

## Contents

- `dad-jokes-test.js` — React App component (dad joke generator)
- `scanner-fixtures.js` — intentional insecure patterns for static-analysis scanners (not imported by the UI, does not start a server)
- `security-demo-test.js` — standalone Node script that checks for the intentionally insecure demo patterns

`scanner-fixtures.js` uses public placeholder secrets and request-to-sink patterns (SQL concatenation, HTML concatenation, file paths, shell commands, `eval`, open redirects, outbound URLs, disabled TLS verification, permissive CORS, session cookies, and object-key assignment) so SAST tools have something to flag. It is for scanner testing only.

## Run the demo checks

Run the lightweight security-demo verification with:

```bash
node security-demo-test.js
```
