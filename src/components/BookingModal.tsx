'use client'

import React, { useState } from 'react';
import { X, Calendar, CheckCircle } from 'lucide-react';
import { api } from '@/lib/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

interface FormData {
  name: string;
  mobile: string;
  address: string;
  date: string;
  message: string;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  address?: string;
  date?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, serviceName }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    address: '',
    date: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Mobile validation
    const mobileRegex = /^(?:\+971|00971|0)?(?:50|51|52|55|56|58|2|3|4|6|7|9)\d{7}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobile.trim())) {
      newErrors.mobile = 'Please enter a valid UAE mobile number';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Please enter a complete address';
    }

    // Date validation
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (selectedDate < today) {
      newErrors.date = 'Please select a future date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await api.createBooking({
        serviceName,
        name: formData.name,
        mobile: formData.mobile,
        address: formData.address,
        date: formData.date,
        message: formData.message || undefined,
      });

      setIsSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          mobile: '',
          address: '',
          date: '',
          message: ''
        });
        setIsSuccess(false);
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Booking failed:', error);
      // You could show an error message here
      alert('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setIsSuccess(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={handleClose}
        />
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50 p-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-4">
              Your booking for {serviceName} has been successfully submitted. We'll contact you soon to confirm the details.
            </p>
            <button 
              onClick={handleClose}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={handleClose}
      />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Book Now</h2>
          <button 
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-600 mb-6">Booking for: {serviceName}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="+971 XX XXX XXXX"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 ${
                errors.mobile ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.mobile && (
              <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              id="address"
              value={formData.address}
              onChange={handleChange}
              disabled={isSubmitting}
              rows={2}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                disabled={isSubmitting}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none disabled:opacity-50 ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{
                  colorScheme: 'light'
                }}
              />
              <Calendar 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
                size={18}
              />
            </div>
            {errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message (Optional)
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-2.5 rounded-md hover:bg-primary/90 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Booking'}
          </button>
        </form>
      </div>
    </>
  );
};

export default BookingModal;