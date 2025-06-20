
import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">HIDROSMART</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Solusi monitoring kesehatan pintar untuk gaya hidup yang lebih sehat dan teratur.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Menu</h3>
            <div className="space-y-2">
              <Link to="/" className="block hover:text-blue-400 transition-colors">Home</Link>
              <Link to="/about" className="block hover:text-blue-400 transition-colors">About Us</Link>
              <Link to="/contact" className="block hover:text-blue-400 transition-colors">Contact Us</Link>
              <Link to="/guarantee" className="block hover:text-blue-400 transition-colors">Guarantee Claim</Link>
              <Link to="/order" className="block hover:text-blue-400 transition-colors">Order</Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Layanan</h3>
            <div className="space-y-2">
              <Link to="/dashboard" className="block hover:text-blue-400 transition-colors">Dashboard User</Link>
              <Link to="/admin" className="block hover:text-blue-400 transition-colors">Admin Panel</Link>
              <Link to="/support" className="block hover:text-blue-400 transition-colors">Customer Support</Link>
              <Link to="/warranty" className="block hover:text-blue-400 transition-colors">Warranty Service</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-sm">info@hidrosmart.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-sm">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-sm">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 HidroSmart. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
