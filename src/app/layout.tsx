// app/layout.tsx
import './globals.css';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Providers from './providers';
import Footer from './components/Footer';
// import Providers from './providers';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Personal Finance Visualizer',
  description: 'Track personal finances with Next.js + Material UI + Recharts'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      <Footer/>
      </body>
    </html>
  );
}