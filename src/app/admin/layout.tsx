'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      // Don't redirect if we're already on the login page
      if (pathname === '/admin/login') {
        setIsCheckingAuth(false)
        return
      }

      // Wait for auth to load
      if (loading) return

      // If no user or not admin, redirect to admin login
      if (!user || user.role !== 'admin') {
        router.push('/admin/login')
        return
      }

      setIsCheckingAuth(false)
    }

    checkAuth()
  }, [user, loading, router, pathname])

  // Show loading while checking authentication
  if (loading || isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If we're on the login page, show it without admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // If user is not admin, don't render anything (redirect will happen)
  if (!user || user.role !== 'admin') {
    return null
  }

  // Render admin layout for authenticated admin users
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}