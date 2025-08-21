import Link from 'next/link'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  Clock,
  ChevronRight
} from 'lucide-react'

export default function FooterSection() {
  return (
    <footer className="bg-primary-dark text-white/80">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Fast Services 4U</h3>
            <p className="mb-6">
              Your trusted partner for premium home services in Dubai. Quality service, guaranteed satisfaction.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Services', href: '/services' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact', href: '/contact' },
                { name: 'Careers', href: '/careers' },
                { name: 'Terms & Conditions', href: '/terms' },
                { name: 'Privacy Policy', href: '/privacy' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="flex items-center gap-2 hover:text-primary transition-colors duration-200"
                  >
                    <ChevronRight size={16} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              {[
                'Home Cleaning',
                'Deep Cleaning',
                'Moving Services',
                'AC Maintenance',
                'Pest Control',
                'Painting Services',
                'Home Maintenance'
              ].map((service) => (
                <li key={service}>
                  <a 
                    href="#" 
                    className="flex items-center gap-2 hover:text-primary transition-colors duration-200"
                  >
                    <ChevronRight size={16} />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:+971123456789" 
                  className="flex items-center gap-3 hover:text-primary transition-colors duration-200"
                >
                  <Phone size={18} />
                  +971 12 345 6789
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@fastservices.com" 
                  className="flex items-center gap-3 hover:text-primary transition-colors duration-200"
                >
                  <Mail size={18} />
                  info@fastservices.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>
                  Business Bay, Dubai,<br />
                  United Arab Emirates
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-1 flex-shrink-0" />
                <span>
                  Working Hours:<br />
                  Mon - Sun: 8:00 AM - 8:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Fast Services 4U. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="text-sm hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-sm hover:text-primary transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}