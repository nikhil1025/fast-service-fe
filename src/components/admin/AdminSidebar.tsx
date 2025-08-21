'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Calendar, 
  MessageSquare, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Star,
  FolderTree,
  Search,
  Database,
  Shield
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Categories', href: '/admin/categories', icon: FolderTree },
  { name: 'Services', href: '/admin/services', icon: Package },
  { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { name: 'Reviews', href: '/admin/reviews', icon: Star },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Search', href: '/admin/search', icon: Search },
  { name: 'Data Management', href: '/admin/data', icon: Database },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-primary">Fast Services</span>
            </Link>
          )}
          {collapsed && (
            <Link href="/admin" className="flex items-center justify-center w-full">
              <Shield className="w-8 h-8 text-primary" />
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            {collapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                title={collapsed ? item.name : undefined}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Admin Badge */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin Panel</p>
                <p className="text-xs text-gray-500 truncate">Administrator</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}