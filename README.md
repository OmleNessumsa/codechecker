# Vercel Code Checker (n8n Webhook)

- Voer een code in. Bij een juiste code speelt `success.mp4` af; bij fout kleurt het scherm rood.
- Webhook URL (vast): `https://asmussen.app.n8n.cloud/webhook/992a293f-581e-4174-a65b-ccea1a2221bd?code=<CODE>`
- API-route forceert Node runtime en probeert eerst **POST** (met code in body), valt terug op **GET**.

## Installatie
```bash
npm install
npm run dev
```

## Deploy
- Push naar GitHub en importeer in Vercel.
- Logs zie je onder **Project → Functions**.

## Debug
- De UI toont tijdelijk een debug-paneel met de response van /api/check-code.
- In server logs zie je errors via `console.error`.
