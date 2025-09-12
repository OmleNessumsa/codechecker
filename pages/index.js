
import { useState } from "react";

export default function CodeChecker() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(null);

  const checkCode = async () => {
    try {
      const res = await fetch("/api/check-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setStatus(data.valid ? "valid" : "invalid");
    } catch (err) {
      console.error("Error:", err);
      setStatus("invalid");
    }
  };

  if (status === "valid") {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <video autoPlay controls className="w-full max-w-3xl rounded-xl shadow-xl">
          <source src="/success.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div className={\`flex flex-col items-center justify-center h-screen transition-all \${status === "invalid" ? "bg-red-900" : "bg-gray-950"}\`}>
      <h1 className="text-4xl mb-4 text-white font-mono">Voer je code in</h1>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="text-lg px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={checkCode}
          className="text-lg px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Verstuur
        </button>
      </div>
      {status === "invalid" && <p className="text-red-300 mt-4 font-mono">Ongeldige code!</p>}
    </div>
  );
}
