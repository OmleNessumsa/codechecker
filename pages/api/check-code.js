// Force Node.js runtime (not Edge) for compatibility
export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { code } = req.body || {};
  if (typeof code !== "string" || code.length === 0) {
    return res.status(400).json({ error: "Missing code", valid: false });
  }

  // Build the n8n webhook URL with the code as query param (as requested)
  const url = `https://asmussen.app.n8n.cloud/webhook/992a293f-581e-4174-a65b-ccea1a2221bd?code=${encodeURIComponent(code)}`;

  // Timeout safeguard
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    // Try POST first (n8n Webhook supports multiple methods if enabled); also include code in body for convenience
    let response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
      signal: controller.signal,
    });

    // If method not allowed, retry with GET
    if (response.status === 405 || response.status === 404) {
      response = await fetch(url, { method: "GET", signal: controller.signal });
    }

    const text = await response.text();
    let parsed = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      // not JSON
    }

    // Normalize to boolean
    let valid = false;
    if (parsed && typeof parsed === "object") {
      if (typeof parsed.body === "string") valid = parsed.body.toLowerCase() === "true";
      else if (typeof parsed.valid === "boolean") valid = parsed.valid;
      else if (typeof parsed.success === "boolean") valid = parsed.success;
    } else if (typeof text === "string") {
      const t = text.trim().toLowerCase();
      if (t === "true" || t === '"true"') valid = true;
    }

    clearTimeout(timeout);
    return res.status(200).json({ valid, upstreamStatus: response.status, raw: text });
  } catch (error) {
    clearTimeout(timeout);
    console.error("Webhook call failed:", error);
    return res.status(200).json({ valid: false, error: String(error && error.message || error) });
  }
}
