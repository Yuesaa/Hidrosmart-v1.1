
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Droplets, Smartphone, Bell, Heart, Users, Briefcase, MapPin, Shield, Zap, Menu, X, User, ShoppingCart, Phone, Home, Mail, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

// Navbar Component
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Droplets className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">HIDROSMART</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About Us</Link>
            <Link to="/contact" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <Phone className="h-4 w-4" />
              <span>Contact Us</span>
            </Link>
            <Link to="/guarantee" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <Shield className="h-4 w-4" />
              <span>Guarantee Claim</span>
            </Link>
            <Link to="/order" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart className="h-4 w-4" />
              <span>Order</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Masuk
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Daftar</Button>
            </Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About Us</Link>
              <Link to="/contact" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Phone className="h-4 w-4" />
                <span>Contact Us</span>
              </Link>
              <Link to="/guarantee" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Shield className="h-4 w-4" />
                <span>Guarantee Claim</span>
              </Link>
              <Link to="/order" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <ShoppingCart className="h-4 w-4" />
                <span>Order</span>
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="w-full">Daftar</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section Component
export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  #KNOW YOUR
                </span>
                <br />
                <span className="text-gray-900">HEALTHY WITH US</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Sistem monitoring kesehatan pintar dengan teknologi sensor tumbler yang canggih. 
                Pantau hidrasi dan kesehatan Anda secara real-time.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-blue-100">
                <Droplets className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Smart Sensor</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-blue-100">
                <Smartphone className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">App Integration</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-blue-100">
                <Bell className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Real-time Alert</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/order">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3">
                  Pesan Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-3">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 animate-scale-in">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-black rounded-2xl p-6 text-white text-center">
                  <Droplets className="h-16 w-16 mx-auto mb-4 text-blue-400" />
                  <h3 className="text-2xl font-bold mb-2">HIDROSMART</h3>
                  <p className="text-blue-200">Smart Tumbler Sensor</p>
                  <div className="mt-6 bg-blue-900/50 rounded-lg p-4">
                    <div className="text-sm text-blue-200">Status: Connected</div>
                    <div className="text-lg font-semibold mt-2">750ml / 1000ml</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                      <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg animate-bounce">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full p-4 shadow-lg animate-pulse">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
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

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Layanan</h3>
            <div className="space-y-2">
              <Link to="/dashboard" className="block hover:text-blue-400 transition-colors">Dashboard User</Link>
              <Link to="/admin" className="block hover:text-blue-400 transition-colors">Admin Panel</Link>
              <Link to="/support" className="block hover:text-blue-400 transition-colors">Customer Support</Link>
              <Link to="/warranty" className="block hover:text-blue-400 transition-colors">Warranty Service</Link>
            </div>
          </div>

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
