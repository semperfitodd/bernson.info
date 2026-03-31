import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
})

const BASE_URL = 'https://bernson.info'

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Todd Bernson | Chief AI & Technical Officer | AWS Ambassador',
    template: '%s | Todd Bernson',
  },
  description: 'Todd Bernson is Chief AI & Technical Officer at BSC Analytics and a three-time AWS Ambassador Award winner. He architects and delivers production AI and cloud systems for Fortune 500 enterprises — 30+ certifications across AWS, Azure, and GCP.',
  keywords: [
    'Todd Bernson',
    'Chief AI Officer',
    'AWS Ambassador',
    'BSC Analytics',
    'cloud architecture',
    'artificial intelligence',
    'MLOps',
    'Terraform',
    'Kubernetes',
    'AWS re:Invent speaker',
    'technical leadership',
    'enterprise AI',
  ],
  authors: [{ name: 'Todd Bernson', url: BASE_URL }],
  creator: 'Todd Bernson',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Todd Bernson',
    title: 'Todd Bernson | Chief AI & Technical Officer | AWS Ambassador',
    description: 'Chief AI & Technical Officer at BSC Analytics. Three-time AWS Ambassador Award winner. Delivering production AI and cloud systems for Fortune 500 enterprises.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Todd Bernson' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Todd Bernson | Chief AI & Technical Officer | AWS Ambassador',
    description: 'Chief AI & Technical Officer at BSC Analytics. Three-time AWS Ambassador Award winner.',
    images: ['/og-image.jpg'],
    creator: '@berntrx',
  },
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
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Todd Bernson',
  url: BASE_URL,
  jobTitle: 'Chief AI & Technical Officer',
  worksFor: {
    '@type': 'Organization',
    name: 'BSC Analytics',
    url: 'https://bscanalytics.com',
  },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Winthrop University' },
  ],
  sameAs: [
    'https://www.linkedin.com/in/todd-bernson/',
    'https://github.com/semperfitodd',
    'https://x.com/berntrx',
  ],
  knowsAbout: [
    'Cloud Architecture', 'Artificial Intelligence', 'Machine Learning', 'AWS',
    'Terraform', 'Kubernetes', 'DevOps', 'Technical Leadership',
  ],
  award: [
    'AWS Ambassador Award 2022 — #1 North America',
    'AWS Ambassador Award 2023 — Top Global',
    'AWS Ambassador Award 2024 — #1 North America',
    'Red Cross Hero Award',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KVSDNPQKQ9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KVSDNPQKQ9');
          `}
        </Script>
      </body>
    </html>
  )
}
