export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { code } = req.body || {};
  if (!code) {
    return res.status(400).json({ valid: false, error: "Missing code" });
  }

  try {
    const url = `https://asmussen.app.n8n.cloud/webhook/992a293f-581e-4174-a65b-ccea1a2221bd?code=${encodeURIComponent(code)}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();

    return res.status(200).json({
      valid: data.body === "true",
      videoUrl: data.videoUrl || null,   // nieuw
      raw: data,
    });
  } catch (err) {
    console.error("Webhook call failed:", err);
    return res.status(500).json({ valid: false, error: String(err) });
  }
}
