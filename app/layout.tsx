import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'El Dorado Shipping — Global Logistics',
  description:
    'One network. Every move. Air, ocean, customs, warehousing and project cargo engineered around visibility, reliability and control.',
  keywords: [
    'freight forwarding',
    'logistics',
    'supply chain',
    'air freight',
    'ocean freight',
    'customs brokerage',
    'warehousing',
    'project cargo',
  ],
  metadataBase: new URL('https://eldorado.shipping'),
  openGraph: {
    title: 'El Dorado Shipping — Global Logistics',
    description:
      'One network. Every move. Global freight, transport and supply-chain solutions built around visibility, reliability and control.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Dorado Shipping — Global Logistics',
    description:
      'One network. Every move. Global freight, transport and supply-chain solutions.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
