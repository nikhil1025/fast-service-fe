import CallToActionSection from '@/components/CallToActionSection'

export default function BlogHousingServicesPage() {
  const blogContent = {
    title: 'Housing Services in Dubai: Making Your Life Easier',
    date: 'September 10, 2025',
    author: 'Fast Services Team',
    image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    paragraphs: [
      "Finding reliable housing services in Dubai can be challenging, whether you are moving into a new apartment or need regular maintenance for your home.",
      "Fast Services offers a comprehensive range of housing solutions, from cleaning and pest control to maintenance and moving services, tailored to meet your needs.",
      "Our team of experienced professionals ensures top-quality service, timely delivery, and customer satisfaction. With hundreds of satisfied clients, we make your home life stress-free and comfortable.",
      "Booking our services is simple. You can schedule your required service online, and our experts will arrive on time, equipped to handle your tasks efficiently.",
    ],
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${blogContent.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 to-primary-dark/60"></div>
        </div>
        <div className="container-custom relative">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blogContent.title}</h1>
            <p className="text-white/90">
              By {blogContent.author} | {blogContent.date}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container-custom max-w-3xl prose prose-lg">
          {blogContent.paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}

          <h2>Why Choose Our Housing Services?</h2>
          <ul>
            <li>Experienced and professional team</li>
            <li>Reliable and timely service</li>
            <li>Wide range of services under one roof</li>
            <li>Customer satisfaction guaranteed</li>
          </ul>

          <p>
            Whether you need routine maintenance, cleaning, or moving services, our experts are here to make your home management seamless and stress-free.
          </p>
        </div>
      </section>

      <CallToActionSection />
    </div>
  )
}
