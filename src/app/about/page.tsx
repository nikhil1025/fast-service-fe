import { Users, Award, Clock, Shield } from 'lucide-react'
import CallToActionSection from '@/components/CallToActionSection'

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary-dark/70"></div>
        </div>
        <div className="container-custom relative">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Fast Services</h1>
            <p className="text-xl text-white/90">
              Your trusted partner for premium home services in Dubai since 2020
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020, Fast Services has grown from a small cleaning company to Dubai's leading home services provider. Our journey has been driven by a simple mission: to provide exceptional home services that make our customers' lives easier.
              </p>
              <p className="text-gray-600">
                Today, we serve thousands of satisfied customers across the UAE, offering a comprehensive range of services from cleaning and maintenance to moving and pest control. Our success is built on our commitment to quality, reliability, and customer satisfaction.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/5 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-primary mb-2">5K+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="bg-primary/5 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600">Services</div>
              </div>
              <div className="bg-primary/5 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-primary mb-2">7</div>
                <div className="text-gray-600">Cities Covered</div>
              </div>
              <div className="bg-primary/5 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-primary mb-2">4.8</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Choose Fast Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Team</h3>
              <p className="text-gray-600">Skilled professionals with years of experience</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Service</h3>
              <p className="text-gray-600">Guaranteed satisfaction with every service</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Timely Delivery</h3>
              <p className="text-gray-600">On-time service delivery, every time</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Service</h3>
              <p className="text-gray-600">Licensed and insured professionals</p>
            </div>
          </div>
        </div>
      </section>

      <CallToActionSection />
    </div>
  )
}