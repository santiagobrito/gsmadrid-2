import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Newsletter } from '@/components/sections/Newsletter';
import { CookieBanner } from '@/components/layout/CookieBanner';
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#2563EB] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Newsletter />
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
