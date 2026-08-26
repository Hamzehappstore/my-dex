export const metadata = {
  title: '⚡ صرافی DEX آنلاین | سواپ سریع در Trust Wallet',
  description: 'تبدیل آنی اتریوم به تتر و سایر ارزها با کارمزد اپسیلونی و بدون احراز هویت.',
  openGraph: {
    title: '🚀 صرافی اختصاصی متصل به تراست ولت',
    description: 'همین حالا بدون ثبت‌نام ارزهای خود را با بالاترین سرعت تبدیل کنید.',
    url: 'https://trust-swap-dex.netlify.app',
    siteName: 'DEX Exchange',
    images: [
      {
        url: 'https://repository-images.githubusercontent.com/135780001/b8d3f180-82a8-11e9-8240-30514150d0a8',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0a0f1d' }}>{children}</body>
    </html>
  );
}
