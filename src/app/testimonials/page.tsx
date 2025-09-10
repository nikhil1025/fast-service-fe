import CallToActionSection from "@/components/CallToActionSection";

export default function TestimonialsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary-dark/70"></div>
        </div>
        <div className="container-custom relative">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              What Our Clients Say
            </h1>
            <p className="text-xl text-white/90">
              Hear from our happy customers across Dubai and beyond
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Customer Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial Card */}
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-600 mb-4">
                "Fast Services made moving so easy! Professional and on time."
              </p>
              <h3 className="font-semibold text-gray-800">Sarah M.</h3>
              <p className="text-sm text-gray-500">Dubai Marina</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-600 mb-4">
                "The cleaning team was fantastic, my apartment has never looked
                better!"
              </p>
              <h3 className="font-semibold text-gray-800">Ahmed K.</h3>
              <p className="text-sm text-gray-500">Downtown Dubai</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-600 mb-4">
                "Very reliable service, highly recommend Fast Services for
                maintenance."
              </p>
              <h3 className="font-semibold text-gray-800">Priya S.</h3>
              <p className="text-sm text-gray-500">Jumeirah</p>
            </div>
          </div>
        </div>
      </section>

      <CallToActionSection />
    </div>
  );
}
