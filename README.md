# Vercel Code Checker (n8n Webhook, POST-only)

- Gebruiker voert een code in.
- Frontend doet POST naar `/api/check-code`.
- API route doet een POST naar jouw n8n webhook, inclusief code als queryparam en body.
- Response verwacht JSON: `{ "body": "true" }` of `{ "body": "false" }`.

## Installatie

```bash
npm install
npm run dev
```

## Deploy op Vercel

- Push naar GitHub en importeer in Vercel.
- Logs: Vercel dashboard → Functions.

## Debug

De UI toont een debug-paneel met de ruwe response uit n8n.
