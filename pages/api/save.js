// pages/api/save.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Yalnızca POST isteği desteklenir');
  }

  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Şifre gerekli' });
  }

  const filePath = path.join(process.cwd(), 'passwords.json');
  let data = [];

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath);
    data = JSON.parse(fileContent);
  }

  data.push({
    password,
    timestamp: new Date().toISOString()
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(200).json({ success: true });
}
