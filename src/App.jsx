import { useState } from "react";

const katas = [
  "filterList",
  "numberToString",
  "uniqueInOrder",
  "isIsogram",
  "returnNegative",
  "foundNeedle",
  "mumble",
];

function App() {
  const [selectedKata, setSelectedKata] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [asArray, setAsArray] = useState(true);
  const [stripQuotes, setStripQuotes] = useState(true);
  const [error, setError] = useState("");

  async function runTest() {
    if (!selectedKata) {
      setError("Please select a kata before running the test.");
      return;
    }

    setError("");

    try {
      const kataModule = await import(`./katas/${selectedKata}.js`);

      let parsedInput;
      if (asArray) {
        parsedInput = input
          .split(",")
          .map((val) => val.trim())
          .map((val) => {
            const maybeUnquoted = stripQuotes
              ? val.replace(/^["']|["']$/g, "")
              : val;
            const num = Number(maybeUnquoted);
            return isNaN(num) ? maybeUnquoted : num;
          });
      } else {
        parsedInput = stripQuotes
          ? input.trim().replace(/^["']|["']$/g, "")
          : input.trim();
      }

      const result = kataModule.default(parsedInput);
      setOutput(JSON.stringify(result, null, 2));
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    }
  }

  return (
    <div className="app-bg">
      <div className="glass-card">
        <h1>KATA RUNNER</h1>
        <img
          id="codewars-badge"
          src="https://www.codewars.com/users/g0bizzle/badges/large"
          alt="Codewars Badge"
        />
        <p>Select a kata and enter input to run the test.</p>

        <select
          value={selectedKata}
          onChange={(e) => setSelectedKata(e.target.value)}
        >
          <option value="">-- Select Kata --</option>
          {katas.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>

        {error && (
          <div
            style={{
              color: "#ff6b6b",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            {error}
          </div>
        )}

        {/* ─── Single Toggles ───────────────────────────────────────────── */}
        <div className="toggle-group">
          <button
            onClick={() => setAsArray(!asArray)}
            className={`toggle-button ${asArray ? "active" : ""}`}
          >
            {`Array Mode: ${asArray ? "ON" : "OFF"}`}
          </button>

          <button
            onClick={() => setStripQuotes(!stripQuotes)}
            className={`toggle-button ${stripQuotes ? "active" : ""}`}
          >
            {`Strip Quotes: ${stripQuotes ? "ON" : "OFF"}`}
          </button>
        </div>

        <input
          type="text"
          placeholder={
            asArray ? 'e.g. 1, 2, "a", 3' : "Enter single value or text"
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={runTest}>Run</button>

        <pre>Output: {output}</pre>
      </div>
    </div>
  );
}

export default App;
