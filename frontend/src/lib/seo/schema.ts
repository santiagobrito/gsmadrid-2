const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gsmadrid.com';
const SITE_NAME = 'Colegio Oficial de Graduados Sociales de Madrid';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'Colegio Oficial de Graduados Sociales de Madrid. Representamos y defendemos los intereses de los Graduados Sociales colegiados.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C/ Jose Abascal, 44 — 5.a izq.',
      addressLocality: 'Madrid',
      postalCode: '28003',
      addressCountry: 'ES',
    },
    telephone: '+34915230888',
    email: 'admon@graduadosocialmadrid.org',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.4367,
      longitude: -3.6936,
    },
    sameAs: [
      'https://twitter.com/GSMadrid',
      'https://www.linkedin.com/company/colegio-graduados-sociales-madrid',
    ],
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function eventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  url,
  image,
}: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name,
    description,
    startDate,
    ...(endDate && { endDate }),
    location: location
      ? {
          '@type': 'Place',
          name: location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Madrid',
            addressCountry: 'ES',
          },
        }
      : undefined,
    organizer: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    url: `${SITE_URL}${url}`,
    ...(image && { image }),
  };
}

export function articleSchema({
  title,
  description,
  datePublished,
  dateModified,
  url,
  image,
  authorName,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
  authorName?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    url: `${SITE_URL}${url}`,
    ...(image && { image }),
    author: {
      '@type': authorName ? 'Person' : 'Organization',
      name: authorName || SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}
