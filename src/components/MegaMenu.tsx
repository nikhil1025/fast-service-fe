// 'use client'

// import React from 'react';
// import { megaMenuData } from '../data/menuData';

// const MegaMenu: React.FC = () => {
//   const handleServiceClick = (serviceName: string) => {
//     console.log(`Clicked on ${serviceName}`);
//     // Add navigation logic here
//   };

//   return (
//     <div className="mega-menu fixed left-1/2 -translate-x-1/2 mt-2 w-[90vw] max-w-7xl bg-white shadow-menu rounded-md overflow-hidden">
//       <div className="container-custom grid grid-cols-4 gap-6 py-6">
//         {megaMenuData.map((column, colIndex) => (
//           <div key={colIndex} className="flex flex-col">
//             {column.map((category, catIndex) => (
//               <div key={catIndex} className="mb-6 last:mb-0 pb-6 border-b border-gray-200 last:border-b-0">
//                 <h3 className="text-primary font-semibold text-lg mb-3">{category.name}</h3>
//                 <ul className="space-y-2">
//                   {category.services.map((service, serviceIndex) => (
//                     <li key={serviceIndex}>
//                       {typeof service === 'string' ? (
//                         <button 
//                           onClick={() => handleServiceClick(service)}
//                           className="text-gray-700 hover:text-primary block transition duration-150 text-left w-full"
//                         >
//                           {service}
//                         </button>
//                       ) : (
//                         <div>
//                           <button 
//                             onClick={() => handleServiceClick(service.name)}
//                             className="text-gray-700 hover:text-primary font-semibold block transition duration-150 text-left w-full"
//                           >
//                             {service.name}
//                           </button>
//                           {service.subcategories && (
//                             <ul className="pl-4 mt-1 space-y-1">
//                               {service.subcategories.map((subcat, subcatIndex) => (
//                                 <li key={subcatIndex}>
//                                   {typeof subcat === 'string' ? (
//                                     <button 
//                                       onClick={() => handleServiceClick(subcat)}
//                                       className="text-gray-600 hover:text-primary text-sm block transition duration-150 text-left w-full"
//                                     >
//                                       {subcat}
//                                     </button>
//                                   ) : (
//                                     <div>
//                                       <button 
//                                         onClick={() => handleServiceClick(subcat.name)}
//                                         className="text-gray-600 hover:text-primary font-semibold text-sm block transition duration-150 text-left w-full"
//                                       >
//                                         {subcat.name}
//                                       </button>
//                                       {subcat.items && (
//                                         <ul className="pl-3 mt-1 space-y-1">
//                                           {subcat.items.map((item, itemIndex) => (
//                                             <li key={itemIndex}>
//                                               <button 
//                                                 onClick={() => handleServiceClick(item)}
//                                                 className="text-gray-500 hover:text-primary text-xs block transition duration-150 text-left w-full"
//                                               >
//                                                 {item}
//                                               </button>
//                                             </li>
//                                           ))}
//                                         </ul>
//                                       )}
//                                     </div>
//                                   )}
//                                 </li>
//                               ))}
//                             </ul>
//                           )}
//                         </div>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MegaMenu;

'use client'

import React from 'react';
import Link from 'next/link';
import { Category } from '@/lib/api';

interface MegaMenuProps {
  categories: Category[];
}

const MegaMenu: React.FC<MegaMenuProps> = ({ categories }) => {
  // Filter parent categories and organize them into columns
  const parentCategories = categories.filter(cat => !cat.parentId);
  
  // Organize categories into columns (4 columns max)
  const columnsCount = Math.min(4, parentCategories.length);
  const itemsPerColumn = Math.ceil(parentCategories.length / columnsCount);
  
  const columns = [];
  for (let i = 0; i < columnsCount; i++) {
    const start = i * itemsPerColumn;
    const end = start + itemsPerColumn;
    columns.push(parentCategories.slice(start, end));
  }

  return (
    <div className="mega-menu fixed left-12 -translate-x-1/2 mt-2 w-[90vw] max-w-7xl bg-white shadow-menu rounded-md overflow-hidden">
      <div className="container-custom grid gap-6 py-6" style={{ gridTemplateColumns: `repeat(${columnsCount}, 1fr)` }}>
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col">
            {column.map((category) => (
              <div key={category.id} className="mb-6 last:mb-0 pb-6 border-b border-gray-200 last:border-b-0">
                <Link 
                  href={`/services/category/${category.slug}`}
                  className="text-primary font-semibold text-lg mb-3 block hover:text-primary/80 transition-colors"
                >
                  {category.name}
                </Link>
                {category.children && category.children.length > 0 && (
                  <ul className="space-y-2">
                    {category.children.map((subcategory) => (
                      <li key={subcategory.id}>
                        <Link 
                          href={`/services/category/${subcategory.slug}`}
                          className="text-gray-700 hover:text-primary block transition duration-150 text-sm"
                        >
                          {subcategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;