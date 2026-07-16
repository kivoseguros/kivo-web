/* ═══════════════════════════════════════════════════════════════
   KIVO TARIFICADOR — Servidor local
   Arranca con: node server.js
   Abre en:     http://localhost:3000
   ═══════════════════════════════════════════════════════════════ */

const express = require('express');
const path    = require('path');
const app     = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

/* ── CONFIG RESEND ─────────────────────────────────────────── */
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL     = 'KIVO Seguros <no-reply@kivoseguros.com>';

/* ── ENDPOINT /api/send-email ──────────────────────────────── */
app.post('/api/send-email', async (req, res) => {
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
    console.log(`✅ Email enviado a ${to} | id: ${data.id}`);
    res.json({ ok: true, id: data.id });
  } catch (e) {
    console.error('Error enviando email:', e);
    res.status(500).json({ error: e.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n🐾 KIVO Tarificador corriendo en http://localhost:${PORT}\n`);
});
