import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MazaoLink | Connecting Tanzania\'s Farmers and Buyers',
  description: 'MazaoLink is a revolutionary agricultural marketplace connecting crop buyers with verified wholesalers across Tanzania through proximity-based matching.',
  keywords: 'agricultural marketplace, Tanzania farming, crop trading, farm to market, agricultural e-commerce',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}