'use client';
import { useState } from 'react';

export default function Home() {
  const [account, setAccount] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  const MY_FEE_WALLET = "0x0a4389b55DdB437901244ce5e33BaE6E8bA2Ed77";

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (err) {
        alert("خطا در اتصال به کیف پول");
      }
    } else {
      alert("لطفاً از داخل مرورگر کیف پول (مثل متامسک یا تراست‌ولت) وارد شوید.");
    }
  };

  const handleAmountChange = (val) => {
    setFromAmount(val);
    setToAmount(val ? (parseFloat(val) * 3100).toFixed(2) : '');
  };

  const handleSwap = () => {
    if (!account) {
      alert("لطفاً ابتدا کیف پول خود را متصل کنید.");
      return;
    }
    alert(`تراکنش ثبت شد!\nکارمزد معامله به ولت شما واریز شد:\n${MY_FEE_WALLET}`);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '1rem' }}>
      <div style={{ backgroundColor: '#1e293b', padding: '2rem', borderRadius: '1rem', width: '100%', maxWidth: '380px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#38bdf8' }}>صرافی اختصاصی (DEX)</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <button 
            onClick={connectWallet}
            style={{ backgroundColor: account ? '#059669' : '#3b82f6', color: '#fff', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}
          >
            {account ? `متصل: ${account.slice(0, 6)}...${account.slice(-4)}` : 'اتصال کیف پول (Connect)'}
          </button>
        </div>

        <div style={{ backgroundColor: '#334155', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.875rem', color: '#94a3b8' }}>پرداخت می‌کنید:</label>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', alignItems: 'center' }}>
            <input 
              type="number" 
              placeholder="0.0" 
              value={fromAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.25rem', width: '60%', outline: 'none' }}
            />
            <span style={{ fontWeight: 'bold', color: '#f8fafc' }}>ETH</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#334155', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.875rem', color: '#94a3b8' }}>دریافت می‌کنید (تقریبی):</label>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', alignItems: 'center' }}>
            <input 
              type="text" 
              readOnly 
              value={toAmount}
              placeholder="0.0" 
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.25rem', width: '60%', outline: 'none' }}
            />
            <span style={{ fontWeight: 'bold', color: '#f8fafc' }}>USDT</span>
          </div>
        </div>

        <button 
          onClick={handleSwap}
          style={{ width: '100%', padding: '1rem', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {account ? 'تبدیل آنی (Swap)' : 'ابتدا کیف پول را متصل کنید'}
        </button>
      </div>
    </div>
  );
}
