import type { Metadata } from 'next';

const SITE_NAME = 'Colegio Oficial de Graduados Sociales de Madrid';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gsmadrid.com';

interface MetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: MetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/og-default.jpg`;

  return {
    title,
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'es_ES',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}
