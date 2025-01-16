import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import MainLayout from '@/components/layout/main-layout';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'DigiBook',
  icons: {
    icon: '/assets/logoBook.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning={true}>
        <NextTopLoader showSpinner={true} />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
