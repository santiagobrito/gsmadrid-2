import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Colegio Oficial de Graduados Sociales de Madrid',
    template: '%s | GS Madrid',
  },
  description:
    'Colegio Oficial de Graduados Sociales de Madrid. Representamos y defendemos los intereses de los Graduados Sociales colegiados en la Comunidad de Madrid.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://gsmadrid.com'
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={plusJakarta.variable}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
