// pages/api/list.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'passwords.json');

  if (!fs.existsSync(filePath)) {
    return res.status(200).json([]);
  }

  const fileContent = fs.readFileSync(filePath);
  const data = JSON.parse(fileContent);

  res.status(200).json(data);
}
