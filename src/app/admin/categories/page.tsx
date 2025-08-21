'use client'

import { useState, useEffect } from 'react'
import { Search, Plus, Edit, Trash2, FolderTree } from 'lucide-react'
import { api, Category } from '@/lib/api'
import CategoryModal from '@/components/admin/modals/CategoryModal'
import DeleteConfirmModal from '@/components/admin/modals/DeleteConfirmModal'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const data = await api.getCategoriesHierarchy()
      setCategories(data)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = () => {
    setSelectedCategory(null)
    setModalMode('create')
    setShowCategoryModal(true)
  }

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category)
    setModalMode('edit')
    setShowCategoryModal(true)
  }

  const handleDeleteCategory = (category: Category) => {
    setSelectedCategory(category)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!selectedCategory) return
    
    try {
      await api.deleteCategory(selectedCategory.id)
      await fetchCategories()
    } catch (error) {
      console.error('Failed to delete category:', error)
      alert('Failed to delete category')
    }
  }

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="divide-y divide-gray-200">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-6">
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <button 
          onClick={handleAddCategory}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>
        </div>

        {/* Categories List */}
        <div className="divide-y divide-gray-200">
          {filteredCategories.map((category) => (
            <div key={category.id}>
              {/* Parent Category */}
              <div className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{category.icon || '📁'}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500">Slug: {category.slug}</span>
                        <span className="text-xs text-gray-500">
                          {category.children?.length || 0} subcategories
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          category.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {category.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEditCategory(category)}
                      className="text-gray-600 hover:text-primary"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteCategory(category)}
                      className="text-gray-600 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Subcategories */}
              {category.children && category.children.length > 0 && (
                <div className="bg-gray-50 border-t border-gray-200">
                  {category.children.map((subcategory) => (
                    <div key={subcategory.id} className="pl-16 pr-6 py-3 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{subcategory.name}</h4>
                          <p className="text-sm text-gray-600">{subcategory.description}</p>
                          <span className="text-xs text-gray-500">Slug: {subcategory.slug}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            subcategory.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {subcategory.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <button 
                            onClick={() => handleEditCategory(subcategory)}
                            className="text-gray-600 hover:text-primary"
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteCategory(subcategory)}
                            className="text-gray-600 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No categories found</p>
          </div>
        )}
      </div>

      {/* Category Modal */}
      <CategoryModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onSuccess={fetchCategories}
        category={selectedCategory}
        mode={modalMode}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        itemName={selectedCategory?.name}
      />
    </div>
  )
}