import { useState } from "react";

const katas = ["filterList"];

function App() {
  const [selectedKata, setSelectedKata] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  async function runTest() {
    if (!selectedKata) return;

    try {
      const kataModule = await import(`./katas/${selectedKata}.js`);
      // Parse input as JSON array
      const parsedInput = JSON.parse(input);
      const result = kataModule.default(parsedInput);
      setOutput(JSON.stringify(result));
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    }
  }

  return (
    <div>
      <h1>Kata Runner</h1>
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

      <input
        type="text"
        placeholder="Enter test input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={runTest}>Run</button>

      <pre>Output: {output}</pre>
    </div>
  );
}

export default App;
