import { useEffect } from 'react';

const SITE_URL = 'https://bnimtir-groupe.onrender.com';
const PHONE = '+212532465151';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BNIMTIR GROUPE',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpg`,
  description:
    'BNIMTIR GROUPE au Maroc : gestion de syndic, intérim, nettoyage professionnel et sécurité. Solutions sur mesure pour entreprises et copropriétés.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MA',
    addressLocality: 'Maroc',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: PHONE,
    email: 'bnimtirservice@gmail.com',
    contactType: 'customer service',
    availableLanguage: ['French', 'Arabic'],
  },
  sameAs: ['https://www.linkedin.com/in/groupe-b-83b3692a5/'],
  areaServed: {
    '@type': 'Country',
    name: 'Maroc',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'BNIMTIR GROUPE',
  image: `${SITE_URL}/logo.jpg`,
  '@id': SITE_URL,
  url: SITE_URL,
  telephone: PHONE,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MA',
  },
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
};

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'Gestion de Syndic',
        description: 'Administration complète de copropriétés au Maroc',
        provider: { '@type': 'Organization', name: 'BNIMTIR GROUPE' },
        areaServed: 'Maroc',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'Intérim',
        description: 'Mise à disposition de personnel qualifié au Maroc',
        provider: { '@type': 'Organization', name: 'BNIMTIR GROUPE' },
        areaServed: 'Maroc',
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'Nettoyage',
        description: 'Services de nettoyage professionnel au Maroc',
        provider: { '@type': 'Organization', name: 'BNIMTIR GROUPE' },
        areaServed: 'Maroc',
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        name: 'Sécurité',
        description: 'Solutions de gardiennage et surveillance au Maroc',
        provider: { '@type': 'Organization', name: 'BNIMTIR GROUPE' },
        areaServed: 'Maroc',
      },
    },
  ],
};

export default function Seo() {
  useEffect(() => {
    const schemas = [organizationSchema, localBusinessSchema, servicesSchema];
    const scripts = schemas.map((schema, i) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `schema-${i}`;
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
      return script;
    });

    return () => {
      scripts.forEach((s) => s.remove());
    };
  }, []);

  return null;
}
