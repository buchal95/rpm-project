import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RPM Gamifikovaný - Metoda rychlého plánování',
  description: 'Gamifikovaný přístup k metodě rychlého plánování Tony Robbinse s úrovněmi a body zkušeností',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}