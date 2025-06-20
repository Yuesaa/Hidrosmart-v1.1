
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Droplets, User, ShoppingCart, Shield, Phone, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Droplets className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">HIDROSMART</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About Us
            </Link>
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

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">
                Daftar
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About Us
              </Link>
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
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="w-full">
                    Daftar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
