// Dad Joke Generator Web App (insecure demo only)

import React, { useState } from 'react';

// Purposefully insecure code for security testing purposes only.
// All patterns below are DETECTABLE by scanners but NON-EXPLOITABLE and SAFE (testing only).

const dadJokes = [
    "Why couldn't the bicycle stand up by itself? It was two-tired.",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
    "Why did the scarecrow win an award? Because he was outstanding in his field.",
    "I would tell you a joke about construction, but I'm still working on it.",
    "I only know 25 letters of the alphabet. I don't know y.",
    "What do you call fake spaghetti? An impasta.",
    "Why don't skeletons fight each other? They don't have the guts.",
    "I used to hate facial hair, but then it grew on me.",
    "Why did the coffee file a police report? It got mugged."
];

// Example of a low criticality security vulnerability (Potential XSS - not actually triggered)
function unsafeSetHTML(content) {
    // This function is safe *in current usage* because 'content' is controlled, 
    // but illustrates unsafe code for demo purposes.
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

function App() {
    const [joke, setJoke] = useState('');

    // Example of an informational (least critical) issue: Hardcoded API key (fake for demo)
    const DAD_JOKE_API_KEY = "12345-FAKE-API-KEY-FOR-TESTING";

    // Example of a moderate risk: Weak random generator (Math.random)
    function getRandomJoke() {
        const idx = Math.floor(Math.random() * dadJokes.length);
        return dadJokes[idx];
    }

    // Example of a testable but non-exploitable SQL injection pattern
    // (not actually connecting to a DB)
    function simulateSqlQuery(param) {
        // Only for demonstration - not used to access a database.
        // ex: SELECT * FROM jokes WHERE text = '" + param + "'
        return "SELECT * FROM jokes WHERE text = '" + param + "'";
    }

    // --- New detectable, non-exploitable test patterns (testing only) ---

    // Detectable: eval() - SAFE: only ever called with a fixed literal string, no user input
    function detectableEvalPattern() {
        const safeLiteral = '1 + 1';
        return eval(safeLiteral); // eslint-disable-line no-eval
    }

    // Detectable: new Function() - SAFE: body is a literal, no user input
    function detectableDynamicCodePattern() {
        const fn = new Function('return 42');
        return fn();
    }

    // Detectable: hardcoded secret - SAFE: fake value for scanner testing only
    const FAKE_DB_PASSWORD = 'test-password-not-real';
    const FAKE_JWT_SECRET = 'demo-secret-do-not-use';

    // Detectable: setTimeout with string - SAFE: string is literal, never user-controlled
    function detectableSetTimeoutPattern() {
        if (typeof setTimeout !== 'undefined') {
            setTimeout('void 0', 0); // Pattern only; literal string, not exploitable
        }
    }

    // Detectable: ReDoS-prone regex - SAFE: only used on fixed short string, never user input
    function detectableReDoSPattern() {
        const safeInput = 'aaa';
        const potentiallyProblematicRegex = /^(a+)+$/;
        return potentiallyProblematicRegex.test(safeInput);
    }

    // Detectable: innerHTML assignment pattern - SAFE: value is constant from our array only
    function getSafeHtmlForDisplay() {
        const safeConstant = '<span>safe</span>';
        if (typeof document !== 'undefined' && document.createElement) {
            const div = document.createElement('div');
            div.innerHTML = safeConstant;
            return div;
        }
        return null;
    }

    // Detectable: console.log of "sensitive" data - SAFE: fake token for scanner testing only
    function detectableInfoLeakPattern() {
        const fakeToken = 'sk-test-00000000-not-real';
        if (typeof console !== 'undefined' && console.debug) {
            console.debug('Auth token (testing only):', fakeToken);
        }
    }

    // Detectable: prototype pollution–style merge - SAFE: both args are literals, no user input
    function detectableMergePattern() {
        const safeA = { foo: 1 };
        const safeB = { bar: 2 };
        return Object.assign({}, safeA, safeB);
    }

    const handleClick = () => {
        // Simulate a possible vulnerability for testing purposes
        const funny = getRandomJoke();
        setJoke(funny);

        // Simulated SQL injection pattern (testing only)
        simulateSqlQuery(funny);

        // Invoke detectable-but-safe patterns so they are in the execution path (testing only)
        detectableEvalPattern();
        detectableDynamicCodePattern();
        detectableSetTimeoutPattern();
        detectableReDoSPattern();
        getSafeHtmlForDisplay();
        detectableInfoLeakPattern();
        detectableMergePattern();
    };

    return (
        <div style={{margin: '3rem', fontFamily: 'monospace'}}>
            <h1>Dad Joke Generator</h1>
            <button onClick={handleClick}>Tell me a dad joke!</button>
            <div style={{marginTop: '2em'}}>
                {/* Not actually vulnerable, but using "dangerouslySetInnerHTML" is detectable */}
                {joke && unsafeSetHTML(joke)}
            </div>
            <div style={{marginTop: "3em", fontSize: "0.9em", color: "gray"}}>
                <h3>Purposeful Demo Vulnerabilities (detectable, non-exploitable, testing only):</h3>
                <ul>
                    <li>Use of <code>dangerouslySetInnerHTML</code> for potential XSS detection (not exploitable with supplied jokes)</li>
                    <li>Hardcoded API key (fake, informational)</li>
                    <li>Weak random generator (<code>Math.random</code>, low risk)</li>
                    <li>Simulated SQL injection pattern in <code>simulateSqlQuery</code> (no real database)</li>
                    <li><code>eval()</code> with literal only — detectable, never user input</li>
                    <li><code>new Function()</code> with literal body — detectable, never user input</li>
                    <li>Hardcoded fake secrets (<code>FAKE_DB_PASSWORD</code>, <code>FAKE_JWT_SECRET</code>)</li>
                    <li><code>setTimeout</code> with string (literal only)</li>
                    <li>ReDoS-prone regex used only on fixed string</li>
                    <li><code>innerHTML</code> assignment with constant only</li>
                    <li>Console log of fake token (info-leak pattern, testing only)</li>
                    <li>Object.assign merge pattern (prototype-pollution–style, literals only)</li>
                </ul>
                <p><b>Note:</b> All patterns above are for scanner/demo testing only, are non-exploitable, and do not represent real risks. Follow secure coding best practices in production.</p>
            </div>
        </div>
    );
}

export default App;
