import CallToActionSection from '@/components/CallToActionSection'

export default function TermsAndConditionsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary-dark/70"></div>
        </div>
        <div className="container-custom relative">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-xl text-white/90">
              Please read our terms carefully before using our services
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container-custom prose max-w-4xl">
          <h4>1. Introduction</h4>
          <p>
            By booking or using any service from Fast Services, you agree to the
            following Terms & Conditions. These terms apply to all customers.
          </p>

          <h4>2. Services</h4>
          <p>
            We provide home services including cleaning, maintenance, moving,
            and pest control. Service details will be agreed upon at booking.
          </p>

          <h4>3. Payments</h4>
          <p>
            Payments must be made in full upon completion of services unless
            otherwise agreed. Late or failed payments may result in penalties.
          </p>

          <h4>4. Liability</h4>
          <p>
            While we ensure the highest quality service, Fast Services is not
            liable for indirect or incidental damages caused during service.
          </p>

          <h4>5. Cancellations</h4>
          <p>
            Cancellations must be made at least 24 hours in advance. Failure to
            do so may result in a cancellation fee.
          </p>

          <h4>6. Governing Law</h4>
          <p>
            These terms are governed by the laws of the UAE. Any disputes shall
            be resolved under UAE jurisdiction.
          </p>
        </div>
      </section>

      <CallToActionSection />
    </div>
  )
}
