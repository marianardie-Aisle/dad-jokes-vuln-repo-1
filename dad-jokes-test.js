// Dad Joke Generator Web App (insecure demo only)

import React, { useState } from 'react';

// Purposefully insecure code for security testing purposes only.

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
    "Why did the coffee file a police report? It got mugged.",
    "What do you call cheese that isn't yours? Nacho cheese.",
    "Why can't you hear a pterodactyl go to the bathroom? Because the P is silent.",
    "I used to be addicted to the hokey pokey, but then I turned myself around.",
    "What do houses wear? Address.",
    "Why did the math book look so sad? Because it had too many problems.",
    "Why did the golfer bring two pairs of pants? In case he got a hole in one.",
    "What do you call a factory that makes okay products? A satisfactory.",
    "Why don't eggs tell jokes? They'd crack each other up.",
    "How do you organize a space party? You planet.",
    "Why did the tomato blush? Because it saw the salad dressing.",
    "What do you call a belt made of watches? A waist of time.",
    "Why did the computer go to therapy? It had too many bytes from the past.",
    "What kind of shoes do ninjas wear? Sneakers.",
    "Why was the broom late? It swept in.",
    "Why don't scientists trust atoms? Because they make up everything.",
    "What do you call a bear with no teeth? A gummy bear.",
    "Why did the cookie go to the doctor? Because it felt crumbly.",
    "What do you call a fish wearing a bowtie? Sofishticated.",
    "Why did the stadium get hot after the game? All the fans left.",
    "What do you call a lazy kangaroo? A pouch potato.",
    "Why did the bicycle fall over? It was two-tired.",
    "What do you call a dinosaur that crashes his car? Tyrannosaurus wrecks.",
    "Why did the picture go to jail? Because it was framed.",
    "What do you call a boomerang that won't come back? A stick."
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
