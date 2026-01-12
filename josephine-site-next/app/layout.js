import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  metadataBase: new URL('https://josephine.bernson.info/'),
  title: {
    default: 'Josephine Bernson | Revenue Leadership & Executive Strategy',
    template: '%s | Josephine Bernson'
  },
  description: 'Josephine Bernson is a widely respected executive leader known for driving sustained growth in highly competitive industries. Recognized for revenue growth, go-to-market strategy, and leadership development.',
  keywords: [
    'Josephine Bernson',
    'revenue leadership',
    'executive strategy',
    'go-to-market strategy',
    'enterprise sales leadership',
    'market expansion',
    'organizational transformation',
    'leadership development',
    'executive advisory',
    'business growth',
    'sales strategy',
    'revenue operations'
  ],
  authors: [{ name: 'Josephine Bernson' }],
  creator: 'Josephine Bernson',
  publisher: 'Josephine Bernson',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://josephine.bernson.info/',
    siteName: 'Josephine Bernson',
    title: 'Josephine Bernson | Revenue Leadership & Executive Strategy',
    description: 'Recognized executive leader driving sustained growth in competitive industries. Expert in revenue strategy, enterprise sales, and organizational transformation.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Josephine Bernson - Revenue Leadership',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Josephine Bernson | Revenue Leadership & Executive Strategy',
    description: 'Recognized executive leader driving sustained growth in competitive industries.',
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
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href="https://josephine.bernson.info/" />
      </head>
      <body>{children}</body>
    </html>
  )
}
