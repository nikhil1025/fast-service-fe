// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { Phone, ChevronDown, Menu, User, LogOut } from 'lucide-react'
// import MegaMenu from './MegaMenu'
// import MobileMenu from './MobileMenu'
// import { ServiceCategory } from '@/types'
// import { useAuth } from '@/hooks/useAuth'

// export default function Header() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(null)
//   const [showUserMenu, setShowUserMenu] = useState(false)
  
//   const { user, logout, isAuthenticated } = useAuth()

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen)
//     if (!isMobileMenuOpen) {
//       document.body.style.overflow = 'hidden'
//     } else {
//       document.body.style.overflow = 'auto'
//     }
//   }

//   const handleLogout = () => {
//     logout()
//     setShowUserMenu(false)
//   }

//   return (
//     <header className="sticky top-0 z-50 w-full bg-white shadow-md">
//       <div className="container-custom">
//         <div className="flex items-center justify-between h-16 md:h-20">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link href="/" className="font-bold text-xl md:text-2xl">
//               Fast Services
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             <div className="relative nav-item group">
//               <button className="nav-link flex items-center gap-1">
//                 Services <ChevronDown size={16} />
//               </button>
//               <MegaMenu />
//             </div>
//             <Link href="/about" className="nav-link">About Us</Link>
//             <Link href="/contact" className="nav-link">Contact</Link>
//             <Link href="/blog" className="nav-link">Blog</Link>
//           </nav>

//           {/* Call Button and User Menu (Desktop) */}
//           <div className="hidden md:flex items-center space-x-4">
//             <button 
//               onClick={() => window.location.href = 'tel:+971123456789'}
//               className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition duration-200"
//             >
//               <Phone size={18} />
//               <span>+971 12 345 6789</span>
//             </button>
            
//             {isAuthenticated && user ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setShowUserMenu(!showUserMenu)}
//                   className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-primary transition-colors"
//                 >
//                   <User size={18} />
//                   <span>{user.name}</span>
//                   <ChevronDown size={16} />
//                 </button>
                
//                 {showUserMenu && (
//                   <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
//                     <div className="py-1">
//                       <Link
//                         href="/profile"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         onClick={() => setShowUserMenu(false)}
//                       >
//                         Profile
//                       </Link>
//                       <Link
//                         href="/bookings"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         onClick={() => setShowUserMenu(false)}
//                       >
//                         My Bookings
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
//                       >
//                         <LogOut size={16} />
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link href="/customer-login" className="nav-link">
//                 Login
//               </Link>
//             )}
//           </div>

//           {/* Mobile Navigation */}
//           <div className="flex items-center md:hidden space-x-2">
//             <button 
//               onClick={() => window.location.href = 'tel:+971123456789'}
//               className="flex items-center gap-1 px-3 py-2 bg-primary text-white rounded-md"
//             >
//               <Phone size={18} />
//               <span className="text-sm">Call</span>
//             </button>
            
//             <button 
//               onClick={toggleMobileMenu}
//               className="p-2 hover:text-primary focus:outline-none"
//             >
//               <Menu size={24} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <MobileMenu 
//         isOpen={isMobileMenuOpen} 
//         onClose={toggleMobileMenu}
//         activeCategory={activeCategory}
//         setActiveCategory={setActiveCategory}
//       />
//     </header>
//   )
// }
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, ChevronDown, Menu, User, LogOut, Search } from 'lucide-react'
import MegaMenu from './MegaMenu'
import MobileMenu from './MobileMenu'
import { useAuth } from '@/hooks/useAuth'
import { useCategories } from '@/hooks/useCategories'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const { user, logout, isAuthenticated } = useAuth()
  const { categories } = useCategories()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl md:text-2xl">
              Fast Services 4U
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="relative nav-item group">
              <button className="nav-link flex items-center gap-1">
                Services <ChevronDown size={16} />
              </button>
              <MegaMenu categories={categories} />
            </div>
            <Link href="/about" className="nav-link">About Us</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
            {/* <Link href="/services" className="nav-link">All Services</Link> */}
          </nav>

          {/* Call Button and User Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => window.location.href = 'tel:+971123456789'}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition duration-200"
            >
              <Phone size={18} />
              <span>+971 12 345 6789</span>
            </button>
            
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <User size={18} />
                  <span>{user.name}</span>
                  <ChevronDown size={16} />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/bookings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Bookings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/customer-login" className="nav-link">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden space-x-2">
            <button 
              onClick={() => window.location.href = 'tel:+971123456789'}
              className="flex items-center gap-1 px-3 py-2 bg-primary text-white rounded-md"
            >
              <Phone size={18} />
              <span className="text-sm">Call</span>
            </button>
            
            <button 
              onClick={toggleMobileMenu}
              className="p-2 hover:text-primary focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={toggleMobileMenu}
        categories={categories}
      />
    </header>
  )
}