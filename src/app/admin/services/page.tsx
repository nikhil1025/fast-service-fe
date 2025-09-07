'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Edit, Trash2, Plus, Star } from 'lucide-react'
import { api, Service } from '@/lib/api'
import ServiceModal from '@/components/admin/modals/ServiceModal'
import DeleteConfirmModal from '@/components/admin/modals/DeleteConfirmModal'
import Pagination from "@/components/Pagination"

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchServices(page);
  }, [page, filterCategory]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async (currentPage: number = 1) => {
    try {
      setLoading(true);
      const categoryId = filterCategory !== "all" ? filterCategory : undefined;
      const res = await api.getServices(categoryId, currentPage, limit);
      setServices(res.data);
      setTotal(res.total);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = () => {
    setSelectedService(null);
    setModalMode("create");
    setShowServiceModal(true);
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setModalMode("edit");
    setShowServiceModal(true);
  };

  const handleDeleteService = (service: Service) => {
    setSelectedService(service);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedService) return;

    try {
      await api.deleteService(selectedService.id);
      await fetchServices();
    } catch (error) {
      console.error("Failed to delete service:", error);
      alert("Failed to delete service");
    }
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || service.category?.slug === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Services</h1>
        <button
          onClick={handleAddService}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Add Service
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="all">All Categories</option>
              <option value="cleaning">Cleaning</option>
              <option value="moving">Moving</option>
              <option value="maintenance">Maintenance</option>
              <option value="salon-spa">Salon & Spa</option>
            </select>
          </div>
        </div>

        {/* Services Grid */}
        <div className="p-6">
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary/20 transition-colors m-3 md:m-2 lg:m-3"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-gray-900 line-clamp-1">
                        {service.title}
                      </h5>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditService(service)}
                          className="text-gray-600 hover:text-primary"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service)}
                          className="text-gray-600 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    {/* <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p> */}
                    <div className="flex items-center justify-between w-full mb-4">
                      {/* Left side: rating + reviews */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-yellow-400">
                          <Star size={16} fill="currentColor" />
                          <span className="ml-1 text-gray-800 font-medium">
                            {service.rating}
                          </span>
                        </div>
                        <span className="text-gray-500">
                          ({service.reviewCount})
                        </span>
                      </div>

                      {/* Right side: price */}
                      <div className="text-lg font-bold text-primary">
                        {service.price}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {service.category?.name}
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          service.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {service.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No services found</p>
            </div>
          )}
        </div>
          <Pagination
            page={page}
            limit={limit}
            total={total}
            onPageChange={(newPage) => setPage(newPage)}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1); // reset to first page when limit changes
            }}
          />
      </div>

      {/* Service Modal */}
      <ServiceModal
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        onSuccess={fetchServices}
        service={selectedService}
        mode={modalMode}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Service"
        message="Are you sure you want to delete this service?"
        itemName={selectedService?.title}
      />
    </div>
  );
}