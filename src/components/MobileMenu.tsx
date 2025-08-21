// 'use client'

// import Link from 'next/link'
// import { ChevronRight, ArrowLeft, X } from 'lucide-react'
// import { megaMenuCategories } from '@/data/menuData'
// import { ServiceCategory } from '@/types'

// interface MobileMenuProps {
//   isOpen: boolean
//   onClose: () => void
//   activeCategory: ServiceCategory | null
//   setActiveCategory: (category: ServiceCategory | null) => void
// }

// export default function MobileMenu({
//   isOpen,
//   onClose,
//   activeCategory,
//   setActiveCategory
// }: MobileMenuProps) {
//   const handleCategoryClick = (category: ServiceCategory) => {
//     setActiveCategory(category)
//   }

//   const handleBackClick = () => {
//     setActiveCategory(null)
//   }

//   return (
//     <>
//       {/* Overlay */}
//       <div 
//         className={`mobile-menu-overlay fixed inset-0 bg-black/50 z-40 ${isOpen ? 'open' : ''}`}
//         onClick={onClose}
//       ></div>

//       {/* Main Menu */}
//       <div className={`mobile-menu fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 shadow-lg ${isOpen ? 'open' : ''}`}>
//         <div className="flex justify-end p-4">
//           <button 
//             onClick={onClose}
//             className="p-2 text-gray-600 hover:text-primary focus:outline-none"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <div className="px-4 py-2">
//           <nav>
//             <ul className="space-y-1">
//               {megaMenuCategories.map((category, index) => (
//                 <li key={index}>
//                   <button 
//                     onClick={() => handleCategoryClick(category)}
//                     className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-100 rounded-md transition duration-150"
//                   >
//                     <span>{category.name}</span>
//                     <ChevronRight size={20} />
//                   </button>
//                 </li>
//               ))}
//               <li>
//                 <Link 
//                   href="/about"
//                   className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 rounded-md transition duration-150"
//                   onClick={onClose}
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link 
//                   href="/contact"
//                   className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 rounded-md transition duration-150"
//                   onClick={onClose}
//                 >
//                   Contact
//                 </Link>
//               </li>
//               <li>
//                 <Link 
//                   href="/blog"
//                   className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 rounded-md transition duration-150"
//                   onClick={onClose}
//                 >
//                   Blog
//                 </Link>
//               </li>
//               <li>
//                 <Link 
//                   href="/customer-login"
//                   className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 rounded-md transition duration-150"
//                   onClick={onClose}
//                 >
//                   Login
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>

//       {/* Category Submenu */}
//       {activeCategory && (
//         <div className={`secondary-menu fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 shadow-lg ${activeCategory ? 'open' : ''}`}>
//           <div className="p-4 border-b">
//             <button 
//               onClick={handleBackClick}
//               className="flex items-center gap-2 text-gray-700 hover:text-primary focus:outline-none"
//             >
//               <ArrowLeft size={20} />
//               <span className="font-semibold">{activeCategory.name}</span>
//             </button>
//           </div>

//           <div className="px-4 py-2">
//             <ul className="space-y-1">
//               {activeCategory.services.map((service, index) => (
//                 <li key={index}>
//                   <a 
//                     href="#"
//                     className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-100 rounded-md transition duration-150"
//                   >
//                     <span>{typeof service === 'string' ? service : service.name}</span>
//                     {typeof service !== 'string' && service.subcategories && (
//                       <ChevronRight size={20} />
//                     )}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }
'use client'

import Link from 'next/link'
import { ChevronRight, ArrowLeft, X } from 'lucide-react'
import { Category } from '@/lib/api'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  categories: Category[]
}

export default function MobileMenu({
  isOpen,
  onClose,
  categories
}: MobileMenuProps) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const { user, logout, isAuthenticated } = useAuth()

  const parentCategories = categories.filter(cat => !cat.parentId)

  const handleCategoryClick = (category: Category) => {
    if (category.children && category.children.length > 0) {
      setActiveCategory(category)
    } else {
      window.location.href = `/services/category/${category.slug}`
      onClose()
    }
  }

  const handleBackClick = () => {
    setActiveCategory(null)
  }

  const handleLogout = () => {
    logout()
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className={`mobile-menu-overlay fixed inset-0 bg-black/50 z-40 ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      ></div>

      {/* Main Menu */}
      <div className={`mobile-menu fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 shadow-lg ${isOpen ? 'open' : ''}`}>
        <div className="flex justify-end p-4">
          <button 
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-primary focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-4 py-2">
          <nav>
            <ul className="space-y-1">
              {parentCategories.map((category) => (
                <li key={category.id}>
                  <button 
                    onClick={() => handleCategoryClick(category)}
                    className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-100 rounded-md transition duration-150"
                  >
                    <span>{category.name}</span>
                    {category.children && category.children.length > 0 && (
                      <ChevronRight size={20} />
                    )}
                  </button>
                </li>
              ))}
              <li>
                <Link 
                  href="/services"
                  className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 rounded-md transition duration-150"
                  onClick={onClose}
                >
                  All Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/about"
                  className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 rounded-md transition duration-150"
                  onClick={onClose}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact"
                  className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 rounded-md transition duration-150"
                  onClick={onClose}
                >
                  Contact
                </Link>
              </li>
              
              {/* User Menu Items */}
              {isAuthenticated && user ? (
                <>
                  <li className="border-t border-gray-200 pt-2 mt-2">
                    <div className="px-4 py-2 text-sm text-gray-500">
                      Signed in as {user.name}
                    </div>
                  </li>
                  <li>
                    <Link 
                      href="/profile"
                      className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 rounded-md transition duration-150"
                      onClick={onClose}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/bookings"
                      className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 rounded-md transition duration-150"
                      onClick={onClose}
                    >
                      My Bookings
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 rounded-md transition duration-150"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link 
                    href="/customer-login"
                    className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 rounded-md transition duration-150"
                    onClick={onClose}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {/* Category Submenu */}
      {activeCategory && (
        <div className={`secondary-menu fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 shadow-lg ${activeCategory ? 'open' : ''}`}>
          <div className="p-4 border-b">
            <button 
              onClick={handleBackClick}
              className="flex items-center gap-2 text-gray-700 hover:text-primary focus:outline-none"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold">{activeCategory.name}</span>
            </button>
          </div>

          <div className="px-4 py-2">
            <ul className="space-y-1">
              <li>
                <Link 
                  href={`/services/category/${activeCategory.slug}`}
                  className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 rounded-md transition duration-150 font-medium text-primary"
                  onClick={onClose}
                >
                  View All {activeCategory.name}
                </Link>
              </li>
              {activeCategory.children?.map((subcategory) => (
                <li key={subcategory.id}>
                  <Link 
                    href={`/services/category/${subcategory.slug}`}
                    className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 rounded-md transition duration-150"
                    onClick={onClose}
                  >
                    {subcategory.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}