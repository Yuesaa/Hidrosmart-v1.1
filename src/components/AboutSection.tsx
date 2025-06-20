
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplets, Smartphone, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Product Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <Droplets className="h-24 w-24 mx-auto text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">HidroSmart Tumbler</h3>
                <p className="text-gray-600">Smart Sensor Technology</p>
              </div>
            </div>
            
            {/* Floating Info Cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 animate-fade-in">
              <div className="text-center">
                <Smartphone className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-semibold">App Connected</div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 animate-fade-in">
              <div className="text-center">
                <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-semibold">Safe & Secure</div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                ABOUT US
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Kami hadir untuk memberikan solusi monitoring kesehatan yang inovatif. 
                Dengan teknologi sensor canggih, HidroSmart membantu Anda memantau 
                kebutuhan hidrasi dan menjaga gaya hidup sehat.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                # TUMBLER SENSOR
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Dengan Adanya Produk ini Anda bisa mengecek dehidrasi anda dan sebuah 
                notifikasi akan muncul di hp anda lalu anda dapat minum dengan teratur.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-3">
                  <Droplets className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Sensor Canggih</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Integrasi Mobile</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Aman Digunakan</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Hemat Energi</span>
                </div>
              </div>
            </div>

            <Link to="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                Contact us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
