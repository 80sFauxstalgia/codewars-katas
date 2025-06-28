import { useState } from "react";

const katas = [
  "filterList",
  "numberToString",
  "uniqueInOrder",
  "isIsogram",
  "returnNegative",
];

function App() {
  const [selectedKata, setSelectedKata] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [asArray, setAsArray] = useState(true); //checkbox
  const [error, setError] = useState("");

  async function runTest() {
    if (!selectedKata) {
      setError("Please select a kata before running the test.");
      return;
    }

    setError(""); // Clear any previous error

    try {
      const kataModule = await import(`./katas/${selectedKata}.js`);

      // ─── custom parser ──────────────────────────────────────────────
      let parsedInput;
      if (asArray) {
        parsedInput = input
          .split(",")
          .map((val) => val.trim())
          .map((val) => {
            const num = Number(val);
            return isNaN(num) ? val : num; // convert numeric strings
          });
      } else {
        parsedInput = input.trim();
      }
      // ────────────────────────────────────────────────────────────────

      const result = kataModule.default(parsedInput);
      setOutput(JSON.stringify(result, null, 2));
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    }
  }

  return (
    <div className="app-bg">
      <div className="glass-card">
        <h1>Kata Runner</h1>
        <img
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

        <label style={{ display: "block", marginBottom: "1rem" }}>
          <input
            type="checkbox"
            checked={asArray}
            onChange={() => setAsArray(!asArray)}
            style={{ marginRight: "0.5rem" }}
          />
          Treat input as array
        </label>

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
