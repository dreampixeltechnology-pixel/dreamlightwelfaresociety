import type {Metadata} from 'next';
import './globals.css'; // Global styles
import ClientAppShell from '@/components/ClientAppShell';

const appUrl = process.env.APP_URL || 'https://samarpan-ngo-khatima.org';

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: 'Dreamlight Welfare Society (NGO) Khatima Uttarakhand | Official Portal',
  description: 'Official portal of Dreamlight Welfare Society (NGO) in Khatima, Uttarakhand. Dedicated to rural child education, free medical camps, Himalayan tree plantation, and women empowerment.',
  keywords: [
    'Dreamlight Welfare Society',
    'Dreamlight Welfare Society Khatima',
    'NGO Khatima Uttarakhand',
    'Dreamlight NGO Donation',
    'Free Medical Health Camps Khatima',
    'Rural Child Education Vidya Jyoti',
    'Women Vocational Sewing Center',
    'Harela Tree Plantation Khatima',
    'NGO Udham Singh Nagar',
    'NGO NITI Aayog Darpan'
  ],
  authors: [{ name: 'Dreamlight Welfare Society' }],
  creator: 'Dreamlight Welfare Society',
  publisher: 'Dreamlight Welfare Society',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: appUrl,
  },
  openGraph: {
    title: 'Dreamlight Welfare Society (NGO) Khatima, Uttarakhand',
    description: 'Empowering rural lives in Khatima through quality child education, free medical camps, women self-reliance, and tree plantation. Starting ₹100 donation.',
    url: appUrl,
    siteName: 'Dreamlight Welfare Society (NGO)',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Dreamlight Welfare Society NGO Khatima Uttarakhand Child Education',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dreamlight Welfare Society (NGO) Khatima Uttarakhand',
    description: 'Transforming rural lives with education, free healthcare & women empowerment in Khatima. Donate starting ₹100.',
    images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['NGO', 'Organization'],
  name: 'Dreamlight Welfare Society',
  alternateName: ['Dreamlight NGO Khatima', 'Dreamlight Welfare Society Uttarakhand'],
  legalName: 'Dreamlight Welfare Society (Regd. NGO Khatima)',
  description: 'Registered Welfare Society and NGO dedicated to quality child education, free medical & health camps, environmental sustainability, and women empowerment in Khatima, Uttarakhand.',
  url: appUrl,
  telephone: '+919528049722',
  email: 'dreampixeltechnology@gmail.com',
  taxID: 'AAATD8934E',
  foundingLocation: {
    '@type': 'Place',
    name: 'Khatima, Udham Singh Nagar, Uttarakhand, India',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Near Subhash Chowk, Tanakpur Road',
    addressLocality: 'Khatima',
    addressRegion: 'Uttarakhand',
    postalCode: '262308',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.9221,
    longitude: 79.9678,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+919528049722',
    contactType: 'Helpline & Donor Support',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Uttarakhand, India',
  },
  nonprofitStatus: 'Nonprofit501c3',
  knowsAbout: [
    'Rural Child Education',
    'Free Medical Camps',
    'Women Vocational Sewing & SHG',
    'Himalayan Afforestation & Tree Plantation',
    '80G Tax Exemption'
  ],
  potentialAction: {
    '@type': 'DonateAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${appUrl}/#home`,
      inLanguage: 'en-IN',
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform'
      ]
    },
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: 100,
      priceCurrency: 'INR'
    }
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#fafaf7] text-stone-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900" suppressHydrationWarning>
        <ClientAppShell>
          {children}
        </ClientAppShell>
      </body>
    </html>
  );
}
