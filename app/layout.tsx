import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Diamond Jewellery Store - WhatsApp Assistant',
  description: 'Chat with our AI assistant to explore our exquisite diamond jewellery collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
