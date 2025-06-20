
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Droplets, Smartphone, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  #KNOW YOUR
                </span>
                <br />
                <span className="text-gray-900">HEALTY WITH US</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Sistem monitoring kesehatan pintar dengan teknologi sensor tumbler yang canggih. 
                Pantau hidrasi dan kesehatan Anda secara real-time.
              </p>
            </div>

            {/* Feature Highlights */}
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

            {/* CTA Buttons */}
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

          {/* Right Content - Product Image */}
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
            
            {/* Floating Elements */}
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

export default HeroSection;
