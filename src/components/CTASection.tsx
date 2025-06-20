
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              TERTARIK DENGAN PRODUK KAMI ?
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-blue-400">
              INGIN TAU LEBIH JAUH LAGI ?
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pengguna yang telah merasakan manfaat HidroSmart. 
              Mulai hidup lebih sehat hari ini!
            </p>
          </div>

          {/* Product Visual */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="bg-black rounded-3xl p-8 transform hover:scale-105 transition-transform duration-300">
                <Droplets className="h-24 w-24 mx-auto text-blue-400 mb-4" />
                <div className="text-white text-center">
                  <h4 className="text-2xl font-bold mb-2">HIDROSMART</h4>
                  <p className="text-blue-200">Smart Health Monitoring</p>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-blue-600/20 rounded-3xl blur-xl -z-10"></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/order">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Hubungi Kami
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 text-lg">
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">1000+</div>
              <div className="text-gray-300">Pengguna Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">4.8★</div>
              <div className="text-gray-300">Rating Aplikasi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-300">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
