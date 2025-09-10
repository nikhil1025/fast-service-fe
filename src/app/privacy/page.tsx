import CallToActionSection from '@/components/CallToActionSection'

export default function PrivacyPolicyPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3184461/pexels-photo-3184461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary-dark/70"></div>
        </div>
        <div className="container-custom relative">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-white/90">
              Learn how we collect, use, and protect your personal information
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16">
        <div className="container-custom prose max-w-4xl">
          <h4>1. Introduction</h4>
          <p>
            Fast Services respects your privacy and is committed to protecting your personal data.
            This Privacy Policy explains how we collect, use, and safeguard your information.
          </p>

          <h4>2. Information We Collect</h4>
          <p>
            We may collect personal information such as your name, contact details, service history,
            and payment information when you use our services.
          </p>

          <h4>3. How We Use Your Information</h4>
          <p>
            Your information is used to provide and improve our services, communicate with you,
            process payments, and comply with legal obligations.
          </p>

          <h4>4. Data Security</h4>
          <p>
            We implement appropriate security measures to protect your data from unauthorized access,
            alteration, disclosure, or destruction.
          </p>

          <h4>5. Sharing Your Information</h4>
          <p>
            We do not sell your personal information. We may share it with trusted service providers
            or as required by law.
          </p>

          <h4>6. Your Rights</h4>
          <p>
            You have the right to access, correct, or request deletion of your personal data.
            Contact us if you wish to exercise these rights.
          </p>

          <h4>7. Changes to this Policy</h4>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page.
          </p>

          <h4>8. Contact Us</h4>
          <p>
            For any questions regarding this Privacy Policy, please contact us at support@fastservices.ae.
          </p>
        </div>
      </section>

      <CallToActionSection />
    </div>
  )
}
