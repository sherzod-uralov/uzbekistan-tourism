import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-light">Uzbekistan Tours</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Discover the beauty and rich culture of Uzbekistan with our expertly crafted tours.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-4 w-4" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-4 w-4" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-light">Tours</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/tours" className="text-gray-400 hover:text-white transition-colors text-sm">
                    All Tours
                  </Link>
                </li>
                <li>
                  <Link
                      href="/tours?category=historical"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Historical Tours
                  </Link>
                </li>
                <li>
                  <Link
                      href="/tours?category=cultural"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Cultural Tours
                  </Link>
                </li>
                <li>
                  <Link
                      href="/tours?category=adventure"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Adventure Tours
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="text-lg font-light">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-light">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">Tashkent, Uzbekistan</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">+998 90 123 45 67</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">info@uzbekistantours.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">&copy; 2025 Uzbekistan Tours. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}
