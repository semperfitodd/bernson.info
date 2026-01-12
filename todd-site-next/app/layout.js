import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['600', '700'],
})

export const metadata = {
  metadataBase: new URL('https://todd.bernson.info/'),
  title: {
    default: 'Todd Bernson | Chief AI & Technical Officer | AWS Ambassador',
    template: '%s | Todd Bernson'
  },
  description: 'Todd Bernson is Chief AI & Technical Officer at BSC Analytics and AWS Ambassador. Expert in cloud architecture, AI solutions, and technical leadership with 30+ certifications across AWS, Azure, and Google Cloud.',
  keywords: [
    'Todd Bernson',
    'Chief AI Officer',
    'Chief Technical Officer',
    'AWS Ambassador',
    'cloud architecture',
    'artificial intelligence',
    'AI solutions',
    'technical leadership',
    'BSC Analytics',
    'cloud computing',
    'AWS',
    'Azure',
    'Google Cloud',
    'cloud certifications',
    'DevOps',
    'infrastructure as code',
    'US Marine veteran',
    'technology executive'
  ],
  authors: [{ name: 'Todd Bernson' }],
  creator: 'Todd Bernson',
  publisher: 'Todd Bernson',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://todd.bernson.info/',
    siteName: 'Todd Bernson',
    title: 'Todd Bernson | Chief AI & Technical Officer | AWS Ambassador',
    description: 'Chief AI & Technical Officer at BSC Analytics. AWS Ambassador with 30+ cloud certifications. Transforming businesses through AI and cloud innovation.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Todd Bernson - Chief AI & Technical Officer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Todd Bernson | Chief AI & Technical Officer | AWS Ambassador',
    description: 'AWS Ambassador and Chief AI & Technical Officer. Expert in cloud architecture and AI solutions.',
    images: ['/og-image.jpg'],
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
  verification: {},
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="canonical" href="https://todd.bernson.info/" />
      </head>
      <body>{children}</body>
    </html>
  )
}
