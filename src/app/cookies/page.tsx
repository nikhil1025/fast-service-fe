import CallToActionSection from '@/components/CallToActionSection'

export default function CookiePolicyPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary-dark/70"></div>
        </div>
        <div className="container-custom relative">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-xl text-white/90">
              Learn how we use cookies to improve your browsing experience
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Policy Content */}
      <section className="py-16">
        <div className="container-custom prose max-w-4xl">
          <h4>1. Introduction</h4>
          <p>
            Fast Services uses cookies to enhance your experience on our website, analyze site usage, and support our marketing efforts.
          </p>

          <h4>2. What Are Cookies?</h4>
          <p>
            Cookies are small text files stored on your device by your browser. They help us remember your preferences and improve site functionality.
          </p>

          <h4>3. Types of Cookies We Use</h4>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for the basic functionality of the website.</li>
            <li><strong>Performance Cookies:</strong> Help us analyze site usage and improve performance.</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences and settings.</li>
            <li><strong>Marketing Cookies:</strong> Track user behavior for marketing campaigns.</li>
          </ul>

          <h4>4. Managing Cookies</h4>
          <p>
            You can control and delete cookies using your browser settings. Note that some cookies are essential for the website to function properly.
          </p>

          <h4>5. Changes to This Policy</h4>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be posted on this page.
          </p>

          <h4>6. Contact Us</h4>
          <p>
            If you have questions about our use of cookies, please contact us at support@fastservices.ae.
          </p>
        </div>
      </section>

      <CallToActionSection />
    </div>
  )
}
