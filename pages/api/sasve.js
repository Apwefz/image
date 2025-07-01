import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'keys.json');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Dosya bulunamadı" });
  }

  const data = fs.readFileSync(filePath, 'utf8');
  const keys = JSON.parse(data);
  
  res.status(200).json(keys);
}
