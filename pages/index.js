import { useState } from "react";

export default function CodeChecker() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(null);
  const [debug, setDebug] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkCode = async () => {
    setLoading(true);
    setDebug(null);
    try {
      const res = await fetch("/api/check-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setDebug(data);
      setStatus(data.valid ? "valid" : "invalid");
    } catch (err) {
      setStatus("invalid");
      setDebug({ error: String(err) });
    } finally {
      setLoading(false);
    }
  };

  if (status === "valid") {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center p-6">
        <video autoPlay controls className="w-full max-w-4xl rounded-2xl shadow-2xl">
          <source src="/success.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${status === "invalid" ? "bg-red-950" : "bg-gray-950"}`}>
      <h1 className="text-4xl mb-6 text-white font-mono">Voer je code in</h1>
      <div className="flex gap-3">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="text-xl px-5 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          placeholder="Bijv. 123456"
        />
        <button
          onClick={checkCode}
          disabled={loading || !code}
          className="text-xl px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-lg shadow-lg font-semibold"
        >
          {loading ? "Checken..." : "Verstuur"}
        </button>
      </div>

      {status === "invalid" && (
        <p className="text-red-300 mt-4 font-mono text-lg">Ongeldige code!</p>
      )}

      {debug && (
        <div className="mt-8 max-w-2xl w-[90vw] bg-gray-900 text-gray-200 rounded-xl p-4 font-mono text-sm border border-gray-700">
          <div className="opacity-70 mb-2">Debug info:</div>
          <pre className="whitespace-pre-wrap break-words">{JSON.stringify(debug, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
