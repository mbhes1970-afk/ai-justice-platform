// Netlify serverless function — Mistral API proxy
// Keeps API key server-side

const MISTRAL_API = 'https://api.mistral.ai/v1/chat/completions';

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders(), body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders(), body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'MISTRAL_API_KEY not configured' }),
    };
  }

  try {
    const body = JSON.parse(event.body);

    const response = await fetch(MISTRAL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: body.model || 'mistral-small-latest',
        messages: body.messages || [],
        temperature: body.temperature ?? 0.3,
        max_tokens: body.max_tokens ?? 2048,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return {
        statusCode: response.status,
        headers: corsHeaders(),
        body: JSON.stringify({ error: `Mistral API error: ${response.status}`, details: err }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Internal error', message: error.message }),
    };
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };
}
