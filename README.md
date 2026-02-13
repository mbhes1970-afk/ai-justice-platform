# AI Justice Platform

AI-gestuurde werkplaats voor de Nederlandse Rechtspraak — van zaak-intake tot vonnis.

## Onderdeel van Nxt Era Solutions

- **Website:** [nxterasolutions.eu](https://nxterasolutions.eu)
- **Email:** mbhes@nxterasolutions.eu

## Stack

- React 18 (Create React App)
- Mistral AI (via Netlify serverless function)
- Web Speech API (STT + TTS)
- Netlify hosting

## Installatie

```bash
npm install
cp .env.example .env
# Vul je MISTRAL_API_KEY in
npm start
```

## Netlify Deploy

1. Push naar GitHub
2. Verbind repo met Netlify
3. Stel `MISTRAL_API_KEY` in als environment variable
4. Deploy

## Deelprojecten

| # | Deelproject | Status |
|---|------------|--------|
| 1 | Architectuur & Visie | ✅ Gereed |
| 2 | Fundament (dit) | ✅ Gereed |
| 3 | Juridisch Onderzoek | 📋 Gepland |
| 4 | Zaakbeheer & Dossier | 📋 Gepland |
| 5 | Vonnis & Uitspraak | 📋 Gepland |
| 6 | Zitting & Griffie | 📋 Gepland |
| 7 | Spraak & Transcriptie | 📋 Gepland |

## Licentie

Proprietary — Nxt Era Solutions / HES Consultancy International
