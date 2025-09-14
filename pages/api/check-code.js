
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { code } = req.body;
  const url = `https://asmussen.app.n8n.cloud/webhook/992a293f-581e-4174-a65b-ccea1a2221bd?code=${code}`;

  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    res.status(200).json({ valid: data.body === "true" });
  } catch (error) {
    console.error("Error calling webhook:", error);
    res.status(500).json({ valid: false });
  }
}
