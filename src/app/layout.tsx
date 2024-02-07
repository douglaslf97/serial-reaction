import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from '../contexts/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Serial Reaction',
  description: 'Serial reaction app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="pt-BR">
      <body className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>

  )
}
