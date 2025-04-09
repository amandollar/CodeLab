import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Bot, Loader2, Send, Trash2 } from "lucide-react";

const LANGUAGES = [
  { id: 63, name: "C++ (G++ 17)", ext: "cpp" },
  { id: 52, name: "C (GCC)", ext: "c" },
  { id: 62, name: "Java", ext: "java" },
  { id: 71, name: "Python 3", ext: "python" },
];

const JUDGE0_API_KEY = "9ac584213bmsh2d9b3f826ec34e2p1e17b9jsn4b97df888e9d";
const JUDGE0_HOST = "judge0-ce.p.rapidapi.com";

export default function Compiler() {
  const [languageId, setLanguageId] = useState(63);
  const [code, setCode] = useState("// Write your code here...");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedLang = LANGUAGES.find((lang) => lang.id === languageId);

  // Load code from localStorage on mount
  useEffect(() => {
    const savedCode = localStorage.getItem("saved_code");
    if (savedCode) setCode(savedCode);
  }, []);

  // Save code to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("saved_code", code);
  }, [code]);

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const runCode = async () => {
    setLoading(true);
    setOutput("");
    setError("");

    try {
      const submission = await fetch(`https://${JUDGE0_HOST}/submissions?base64_encoded=false&wait=false`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": JUDGE0_API_KEY,
          "X-RapidAPI-Host": JUDGE0_HOST,
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
          stdin: input,
        }),
      });

      const { token } = await submission.json();

      let result;
      do {
        await sleep(1000);
        const res = await fetch(`https://${JUDGE0_HOST}/submissions/${token}?base64_encoded=false`, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": JUDGE0_API_KEY,
            "X-RapidAPI-Host": JUDGE0_HOST,
          },
        });
        result = await res.json();
      } while (result.status.id <= 2);

      setOutput(result.stdout || "");
      setError(result.stderr || result.compile_output || "");
    } catch (err) {
      setError("⚠️ Something went wrong while compiling.");
    } finally {
      setLoading(false);
    }
  };

  const resetCode = () => {
    setCode("// Write your code here...");
    localStorage.removeItem("saved_code");
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full">
            <Bot size={20} />
          </div>
          <div>
            <h1 className="font-semibold text-lg">SyncPiler</h1>
            <p className="text-xs opacity-80">SyncGrid Code Editor</p>
          </div>
        </div>

        <div className="flex gap-3">
          <select
            value={languageId}
            onChange={(e) => setLanguageId(Number(e.target.value))}
            className="bg-white text-black rounded-md px-3 py-1 text-sm shadow-md focus:outline-none"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>

          {/* Reset Button */}
          <button
            onClick={resetCode}
            className="flex items-center gap-1 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
            title="Clear Code"
          >
            <Trash2 size={16} />
            Reset
          </button>
        </div>
      </header>

      {/* Editor */}
      <div className="p-4 space-y-4">
        <Editor
          height="300px"
          language={selectedLang.ext}
          theme="vs-light"
          value={code}
          onChange={(val) => setCode(val || "")}
          className="rounded-md border border-gray-200"
        />

        <textarea
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
          placeholder="Optional Input (stdin)"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="flex justify-end">
          <button
            onClick={runCode}
            disabled={loading}
            className="p-3 px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md disabled:opacity-50 flex items-center"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            <span className="ml-2 font-medium">{loading ? "Compiling..." : "Run"}</span>
          </button>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl text-sm whitespace-pre-wrap min-h-[100px] shadow-inner bg-gray-100 text-black">
            <strong>Output:</strong><br/><br/>
            <pre>{output || (loading ? "Compiling..." : "No output yet.")}</pre>
          </div>
          {error && (
            <div className="p-4 rounded-xl text-sm whitespace-pre-wrap shadow-inner bg-red-100 text-red-800">
              <strong>Error:</strong>
              <pre>{error}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
