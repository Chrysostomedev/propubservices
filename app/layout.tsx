import type { Metadata, Viewport } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '../components/front/Navbar'
import { Footer } from '../components/front/Footer'
/* ── Fonts ──────────────────────────────────────────────────────── */
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

/* ── Metadata ───────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: 'Pro-Pub Service | Enseignes & Signalétique Abidjan',
    template: '%s | Pro-Pub Service',
  },
  description:
    'Spécialiste des enseignes 3D, façades décoratives, lettres LED, néon et habillage de commerces à Yopougon, Abidjan. Devis gratuit sous 48h.',
  keywords: [
    'enseigne 3D', 'façade décorative', 'lettre lumineuse LED', 'néon déco',
    'Alucobond', 'signalétique', 'imprimerie', 'Abidjan', 'Yopougon',
  ],
  authors: [{ name: 'Pro-Pub Service' }],
  openGraph: {
    title: 'Pro-Pub Service | Enseignes & Signalétique Abidjan',
    description: 'Donnez de l\'impact à votre commerce. Enseignes 3D, néon, LED, façades.',
    locale: 'fr_CI',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0C0C0F',
  width: 'device-width',
  initialScale: 1,
}

/* ── Root Layout ────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${syne.variable} ${dmSans.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body>
        <Navbar />
        <main style={{ paddingTop: 68 }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}