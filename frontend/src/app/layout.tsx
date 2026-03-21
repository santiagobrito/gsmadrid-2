import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Header, FALLBACK_NAV } from '@/components/layout/Header';
import type { NavItem } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { fetchGraphQL } from '@/lib/graphql/client';
import { GET_MENU } from '@/lib/graphql/queries/menu';
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

// Fetch menu from WordPress with fallback
async function getNavItems(): Promise<NavItem[]> {
  try {
    const data = await fetchGraphQL<{
      menuItems: {
        nodes: Array<{
          id: string;
          label: string;
          url: string;
          path: string;
          parentId: string | null;
        }>;
      };
    }>(GET_MENU, { location: 'PRIMARY' });

    const wpItems = data.menuItems.nodes
      .filter((item) => !item.parentId) // Only top-level items
      .map((item) => ({
        label: item.label,
        href: item.path || new URL(item.url).pathname,
      }));

    return wpItems.length > 0 ? wpItems : FALLBACK_NAV;
  } catch {
    // WordPress unavailable — use fallback
    return FALLBACK_NAV;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = await getNavItems();

  return (
    <html lang="es" className={plusJakarta.variable}>
      <body className="flex min-h-screen flex-col">
        <Header navItems={navItems} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
