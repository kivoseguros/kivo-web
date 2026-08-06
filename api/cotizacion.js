// Vercel Serverless Function — KIVO
// GET /api/cotizacion?token=XXXX  → devuelve la cotización guardada en Supabase.
// Lee con la SERVICE ROLE key (solo en servidor, nunca expuesta al cliente).

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // token desde query (?token=) o parseando la URL por si acaso
  var token = (req.query && req.query.token) ||
    ((req.url.split('token=')[1] || '').split('&')[0]);
  token = token ? decodeURIComponent(token) : '';

  if (!token) {
    return res.status(400).json({ error: 'Falta el parámetro token' });
  }
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return res.status(500).json({ error: 'Config Supabase ausente en el servidor' });
  }

  try {
    var url = SUPABASE_URL + '/rest/v1/cotizaciones' +
      '?token=eq.' + encodeURIComponent(token) +
      '&select=email,mascotas,total,periodo,estado';

    var r = await fetch(url, {
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': 'Bearer ' + SERVICE_KEY
      }
    });
    var data = await r.json();

    if (!r.ok) {
      console.error('Supabase error:', data);
      return res.status(r.status).json({ error: data });
    }
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(404).json({ error: 'Cotización no encontrada' });
    }
    return res.status(200).json(data[0]);
  } catch (e) {
    console.error('Error /api/cotizacion:', e);
    return res.status(500).json({ error: e.message });
  }
};
