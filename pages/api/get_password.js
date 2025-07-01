export default async function handler(req, res) {
  const { key, date } = req.query;

  if (!key || !date) {
    return res.status(400).json({ error: "key ve date parametreleri gerekli." });
  }

  const combined = `${key}|${date}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(combined);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  const password = hashHex.substring(0, 6).toUpperCase();

  res.status(200).json({ password });
}
