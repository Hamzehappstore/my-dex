'use client';
import { useState } from 'react';

export default function Home() {
  const [amount, setAmount] = useState('');
  const [wallet, setWallet] = useState('');

  const handleConnect = () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          if (accounts.length > 0) setWallet(accounts[0]);
        })
        .catch(err => console.log(err));
    } else {
      const siteUrl = encodeURIComponent(window.location.href);
      window.location.href = `https://link.trustwallet.com/open_url?coin_id=60&url=${siteUrl}`;
    }
  };

  return (
    <main style={{
      backgroundColor: '#0a0f1d',
      color: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        backgroundColor: '#161f33',
        padding: '25px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid #23304d',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '20px' }}>⚡ صرافی هوشمند DEX</h2>

        <button 
          onClick={handleConnect}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: wallet ? '#10b981' : '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}>
          {wallet ? `متصل: ${wallet.substring(0, 6)}...` : '🛡️ اتصال به Trust Wallet'}
        </button>

        <div style={{ backgroundColor: '#0d1322', padding: '12px', borderRadius: '10px', marginBottom: '10px', textAlign: 'right' }}>
          <span style={{ fontSize: '11px', color: '#64748b' }}>پرداخت:</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <input 
              type="number" 
              placeholder="0.0" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '16px', width: '70%', outline: 'none' }}
            />
            <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>ETH</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#0d1322', padding: '12px', borderRadius: '10px', marginBottom: '20px', textAlign: 'right' }}>
          <span style={{ fontSize: '11px', color: '#64748b' }}>دریافت (تقریبی):</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <span style={{ fontSize: '16px' }}>{amount ? (amount * 3000).toFixed(2) : '0.0'}</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>USDT</span>
          </div>
        </div>

        <button 
          onClick={handleConnect}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#059669',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '15px',
            cursor: 'pointer'
          }}>
          تبدیل آنی (Swap)
        </button>
      </div>
    </main>
  );
}
