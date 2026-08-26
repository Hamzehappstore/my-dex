'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [refLink, setRefLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const queryParams = new URLSearchParams(window.location.search);
    const ref = queryParams.get('ref');
    if (ref) {
      localStorage.setItem('dex_referrer', ref);
    }
  }, []);

  const connectWallet = async () => {
    const siteUrl = encodeURIComponent(window.location.href);
    const trustWalletDeepLink = `https://link.trustwallet.com/open_url?coin_id=60&url=${siteUrl}`;

    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          const acc = accounts[0];
          setWalletAddress(acc);
          const currentUrl = window.location.origin;
          setRefLink(`${currentUrl}?ref=${acc}`);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      window.location.href = trustWalletDeepLink;
    }
  };

  const copyRefLink = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent("⚡ کارمزد صفر و تبدیل آنی ارزها در تراست ولت! همین حالا امتحان کنید:");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(refLink)}`, '_blank');
  };

  if (!isClient) return null;

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#0a0f1d',
      color: '#ffffff',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#161f33',
        padding: '30px',
        borderRadius: '20px',
        border: '1px solid #23304d',
        width: '100%',
        maxWidth: '420px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '20px' }}>⚡ صرافی هوشمند DEX</h2>
        
        <button 
          onClick={connectWallet}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: walletAddress ? '#10b981' : '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '20px'
          }}>
          {walletAddress ? `متصل شد: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}` : '🛡️ اتصال به Trust Wallet'}
        </button>

        <div style={{ backgroundColor: '#0d1322', padding: '15px', borderRadius: '12px', marginBottom: '12px', textAlign: 'right' }}>
          <label style={{ fontSize: '12px', color: '#64748b' }}>پرداخت می‌کنید:</label>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <input 
              type="number" 
              placeholder="0.0" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '18px', width: '60%', outline: 'none' }}
            />
            <span style={{ fontWeight: 'bold', color: '#38bdf8' }}>ETH</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#0d1322', padding: '15px', borderRadius: '12px', marginBottom: '20px', textAlign: 'right' }}>
          <label style={{ fontSize: '12px', color: '#64748b' }}>دریافت می‌کنید (تقریبی):</label>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <span style={{ fontSize: '18px' }}>{amount ? (parseFloat(amount) * 3000).toFixed(2) : '0.0'}</span>
            <span style={{ fontWeight: 'bold', color: '#10b981' }}>USDT</span>
          </div>
        </div>

        <button 
          onClick={connectWallet}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#059669',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '25px'
          }}>
          تبدیل آنی (Swap)
        </button>

        {walletAddress && (
          <div style={{
            backgroundColor: '#0f172a',
            padding: '15px',
            borderRadius: '12px',
            border: '1px dashed #38bdf8',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '13px', color: '#38bdf8', margin: '0 0 8px 0', fontWeight: 'bold' }}>
              🎁 لینک دعوت اختصاصی شما (۳۰٪ سود کارمزد)
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <button 
                onClick={copyRefLink}
                style={{
                  flex: 1,
                  padding: '8px',
                  backgroundColor: '#334155',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}>
                {copied ? '✔ کپی شد' : '📋 کپی لینک'}
              </button>
              <button 
                onClick={shareOnTwitter}
                style={{
                  flex: 1,
                  padding: '8px',
                  backgroundColor: '#1d9bf0',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}>
                🐦 اشتراک در X
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
