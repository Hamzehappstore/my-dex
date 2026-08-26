'use client';

import { useState } from 'react';

export default function Home() {
  const [amount, setAmount] = useState('');

  const connectWallet = () => {
    const siteUrl = encodeURIComponent(window.location.href);
    const trustWalletDeepLink = `https://link.trustwallet.com/open_url?coin_id=60&url=${siteUrl}`;

    // بررسی اینکه آیا کاربر داخل مرورگر تراست ولت است یا خیر
    if (typeof window !== 'undefined' && window.ethereum && window.ethereum.isTrust) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(() => alert('کیف پول با موفقیت متصل شد'))
        .catch((err) => console.error(err));
    } else {
      // هدایت مستقیم به اپلیکیشن تراست ولت
      window.location.href = trustWalletDeepLink;
    }
  };

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#ffffff',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#1e293b',
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '24px' }}>صرافی اختصاصی (DEX)</h2>
        
        <button 
          onClick={connectWallet}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
          🛡️ اتصال به Trust Wallet (پیش‌فرض)
        </button>

        <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '10px', marginBottom: '15px', textAlign: 'right' }}>
          <label style={{ fontSize: '12px', color: '#94a3b8' }}>پرداخت می‌کنید:</label>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <input 
              type="number" 
              placeholder="0.0" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '18px', width: '60%', outline: 'none' }}
            />
            <span style={{ fontWeight: 'bold' }}>ETH</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '10px', marginBottom: '20px', textAlign: 'right' }}>
          <label style={{ fontSize: '12px', color: '#94a3b8' }}>دریافت می‌کنید (تقریبی):</label>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <span style={{ fontSize: '18px' }}>{amount ? (parseFloat(amount) * 3000).toFixed(2) : '0.0'}</span>
            <span style={{ fontWeight: 'bold' }}>USDT</span>
          </div>
        </div>

        <button 
          onClick={connectWallet}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#10b981',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
          ابتدا کیف پول را متصل کنید
        </button>
      </div>
    </main>
  );
}
