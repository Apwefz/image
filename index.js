// pages/index.js

import { useState } from 'react';

export default function Home() {
  const [key, setKey] = useState('');
  const [date, setDate] = useState('');
  const [password, setPassword] = useState('');

  const generatePassword = async () => {
    const response = await fetch(`/api/get_password?key=${encodeURIComponent(key)}&date=${encodeURIComponent(date)}`);
    const data = await response.json();
    if (data.password) {
      setPassword(data.password);
    } else {
      setPassword('Hata: ' + data.error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 80 }}>
      <h1>🔐 Şifre Oluşturucu</h1>
      <input
        type="text"
        placeholder="Ortak Anahtar"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{ padding: 10, margin: 10, width: 250 }}
      />
      <br />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: 10, margin: 10, width: 250 }}
      />
      <br />
      <button onClick={generatePassword} style={{ padding: 10, width: 200 }}>
        Şifre Oluştur
      </button>
      <div style={{ marginTop: 20, fontSize: 24, fontWeight: 'bold' }}>
        {password && <>Şifre: {password}</>}
      </div>
    </div>
  );
}
