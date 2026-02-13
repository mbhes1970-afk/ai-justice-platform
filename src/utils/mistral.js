// AI Justice Platform — Mistral API Utility
// Uses Netlify serverless function or direct API

const MISTRAL_MODEL = 'mistral-small-latest';

export async function sendToMistral(messages, systemPrompt) {
  const fullMessages = [];

  if (systemPrompt) {
    fullMessages.push({ role: 'system', content: systemPrompt });
  }

  fullMessages.push(...messages);

  try {
    // Try Netlify serverless function first
    const response = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MISTRAL_MODEL,
        messages: fullMessages,
        temperature: 0.3,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'Geen antwoord ontvangen.';
  } catch (error) {
    console.error('Mistral API error:', error);
    throw error;
  }
}

// Recording prompts per module
export const RECORDING_PROMPTS = {
  zaakbeheer: {
    nl: 'Verwerk dit transcript van een zaak-intake. Structureer als: 1) Rechtsgebied, 2) Partijen (eiser/gedaagde of verdachte), 3) Aard van het geschil, 4) Gevorderd/gewenst, 5) Relevante termijnen. Formaat als een zaak-registratie.',
    en: 'Process this case intake transcript. Structure as: 1) Legal domain, 2) Parties, 3) Nature of dispute, 4) Relief sought, 5) Relevant deadlines.',
  },
  vonnis: {
    nl: 'Verwerk dit gedicteerde vonnis. Structureer als: 1) Feiten, 2) Juridisch kader, 3) Overwegingen, 4) Beslissing. Markeer als "CONCEPT — vereist rechterlijke goedkeuring". Gebruik formele juridische taal.',
    en: 'Process this dictated verdict. Structure as: 1) Facts, 2) Legal framework, 3) Considerations, 4) Decision. Mark as "DRAFT — requires judicial approval".',
  },
  transcriptie: {
    nl: 'Verwerk dit zittingstranscript. 1) Identificeer sprekers (rechter, OvJ, advocaat, verdachte, getuige, griffier), 2) Structureer per spreker met tijdsaanduidingen, 3) Markeer belangrijke momenten (verweren, bewijsmiddelen, getuigenverklaringen), 4) Genereer een beknopt procesverbaal.',
    en: 'Process this hearing transcript. 1) Identify speakers (judge, prosecutor, attorney, defendant, witness, clerk), 2) Structure per speaker, 3) Flag key moments, 4) Generate a concise hearing report.',
  },
  dossier: {
    nl: 'Verwerk deze dictaat-notities over een dossier. Maak: 1) Samenvatting, 2) Tijdlijn, 3) Kernpunten, 4) Openstaande vragen.',
    en: 'Process these dictated file notes. Create: 1) Summary, 2) Timeline, 3) Key points, 4) Open questions.',
  },
  _default: {
    nl: 'Verwerk dit transcript en structureer het als een gestructureerd juridisch document. Gebruik formele taal en duidelijke kopjes.',
    en: 'Process this transcript and structure it as a formal legal document with clear headings.',
  },
};
