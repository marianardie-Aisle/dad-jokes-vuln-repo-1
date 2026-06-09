// Dad Joke Generator Web App (insecure demo only)

import React, { useState } from 'react';

// Purposefully insecure code for security testing purposes only.

const dadJokes = [
    "Why couldn't the bicycle stand up by itself? It was two-tired.",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
    "Why did the scarecrow win an award? Because he was outstanding in his field.",
    "I would tell you a joke about construction, but I'm still working on it."
];

// Example of a low criticality security vulnerability (Potential XSS - not actually triggered)
function unsafeSetHTML(content) {
    // Render content safely by letting React escape it instead of using dangerouslySetInnerHTML.
    // This preserves behavior for developer-controlled jokes while preventing XSS if content becomes untrusted.
    return <div>{content}</div>;
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

    const handleClick = () => {
        // Simulate a possible vulnerability for testing purposes
        const funny = getRandomJoke();
        setJoke(funny);

        // Simulated SQL injection pattern (testing only)
        simulateSqlQuery(funny);
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
                <h3>Purposeful Demo Vulnerabilities:</h3>
                <ul>
                    <li>Use of <code>dangerouslySetInnerHTML</code> for potential XSS detection (not exploitable with supplied jokes)</li>
                    <li>Hardcoded API key (fake, informational)</li>
                    <li>Weak random generator (<code>Math.random</code>, low risk)</li>
                    <li>Simulated SQL injection pattern in function <code>simulateSqlQuery</code> (no real database interaction)</li>
                </ul>
                <p><b>Note:</b> All vulnerabilities above are present only for secure coding demo/testing and do not represent real risks in this code as written. Always follow secure coding best practices for production software.</p>
            </div>
        </div>
    );
}

export default App;
