import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Lumenor | The Intelligence Layer for Solar',
  description: 'Transforming chaotic operations into a singular, intelligent ecosystem for the solar industry.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-void text-text-primary selection:bg-amber-500/30 selection:text-amber-200`}>
        {children}
      </body>
    </html>
  );
}
