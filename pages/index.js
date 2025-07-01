// pages/index.js

import { useState } from 'react';

export default function Home() {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setStatus('Şifre kaydedildi!');
      setPassword('');
    } else {
      setStatus('Hata oluştu!');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Şifre Ekle</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifre girin"
          required
        />
        <button type="submit">Kaydet</button>
      </form>
      <p>{status}</p>
    </div>
  );
}
