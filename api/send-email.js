// Vercel Serverless Function — KIVO Email API
// Endpoint: POST /api/send-email
// Body: { to, subject, html }

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL     = 'KIVO Seguros <no-reply@kivoseguros.com>';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'Faltan campos: to, subject, html' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ from: FROM_EMAIL, to, subject, html })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend error:', data);
      return res.status(response.status).json({ error: data });
    }

    console.log(`Email enviado a ${to} | id: ${data.id}`);
    return res.status(200).json({ ok: true, id: data.id });

  } catch (e) {
    console.error('Error:', e);
    return res.status(500).json({ error: e.message });
  }
}
