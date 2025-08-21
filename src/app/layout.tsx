import type { Metadata } from 'next'
import '@fontsource-variable/plus-jakarta-sans'
import './globals.css'
import Header from '@/components/Header'
import FooterSection from '@/components/FooterSection'
import { AuthProvider } from '@/hooks/useAuth'

export const metadata: Metadata = {
  title: 'Fast Services - Premium Home Services in Dubai',
  description: 'Book top-rated home services in Dubai. Your one-stop destination for cleaning, moving, maintenance, and more at affordable prices.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-jakarta min-h-screen">
        <AuthProvider>
          <Header />
          {children}
          <FooterSection />
        </AuthProvider>
      </body>
    </html>
  )
}