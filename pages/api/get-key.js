export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST isteklerine izin verilir.' });
  }

  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Şifre eksik' });
  }

  if (password !== process.env.ACCESS_PASSWORD) {
    return res.status(401).json({ error: 'Şifre yanlış' });
  }

  const key = process.env.API_SECRET_KEY;

  if (!key) {
    return res.status(500).json({ error: 'Key tanımlı değil' });
  }

  res.status(200).json({ key });
}
