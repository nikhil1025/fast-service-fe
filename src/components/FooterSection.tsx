"use client";

import { useAuth } from "@/hooks/useAuth";
import {
  ChevronRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FooterService {
  title: string;
  id: string;
}

interface MainSettings {
  contactPhone: string;
  contactEmail: string;
}

export default function FooterSection() {
  const { user, isAuthenticated } = useAuth();
  const [footerServices, setFooterServices] = useState<FooterService[]>([]);
  const [mainSettings, setMainSettings] = useState<MainSettings>({
    contactPhone: "+971 12 345 6789",
    contactEmail: "info@fastservices.com",
  });

  useEffect(() => {
    const fetchFooterServices = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL ||
      "https://api.fastservices4u.com/test/api"
          // "http://localhost:3001/test/api/settings/footer-services"
        );
        if (!res.ok) throw new Error("Failed to fetch footer services");
        const data = await res.json();
        setFooterServices(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchMainSettings = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL ||
            "https://api.fastservices4u.com/test/api"
          // "http://localhost:3001/test/api/settings/main"
        );
        if (!res.ok) throw new Error("Failed to fetch main settings");
        const data = await res.json();
        setMainSettings(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFooterServices();
    fetchMainSettings();
  }, []);

  if (user && user.role === "admin" && isAuthenticated) {
    return <></>;
  }

  return (
    <footer className="bg-primary-dark text-white/80">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">
              Fast Services 4U
            </h3>
            <p className="mb-6">
              Your trusted partner for premium home services in Dubai. Quality
              service, guaranteed satisfaction.
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
            <h3 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
                { name: "Careers", href: "/careers" },
                { name: "Terms & Conditions", href: "/terms" },
                { name: "Privacy Policy", href: "/privacy" },
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
            <h3 className="text-lg font-semibold text-white mb-6">
              Our Services
            </h3>
            <ul className="space-y-3">
              {footerServices.length > 0 ? (
                footerServices.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.id}
                      className="flex items-center gap-2 hover:text-primary transition-colors duration-200"
                    >
                      <ChevronRight size={16} />
                      {service.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-400">No services available</li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${mainSettings.contactPhone}`}
                  className="flex items-center gap-3 hover:text-primary transition-colors duration-200"
                >
                  <Phone size={18} />
                  {mainSettings.contactPhone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${mainSettings.contactEmail}`}
                  className="flex items-center gap-3 hover:text-primary transition-colors duration-200"
                >
                  <Mail size={18} />
                  {mainSettings.contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>
                  Business Bay, Dubai,
                  <br />
                  United Arab Emirates
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-1 flex-shrink-0" />
                <span>
                  Working Hours:
                  <br />
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
              © {new Date().getFullYear()} Fast Services 4U. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/terms"
                className="text-sm hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-sm hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookies"
                className="text-sm hover:text-primary transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
