
import React, { useState } from 'react';
import { Navbar, Footer } from '@/components/HomeComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Clock, CheckCircle, Phone, Mail } from 'lucide-react';

const GuaranteeClaim = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    address: '',
    warrantyCode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-cyan-600 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-white space-y-6">
            <div className="flex justify-center">
              <Shield className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">GUARANTEE CLAIM</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Klaim garansi produk HidroSmart Anda dengan mudah dan cepat. 
              Kami berkomitmen memberikan layanan terbaik untuk kepuasan Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardTitle className="text-2xl text-gray-900">Form Klaim Garansi</CardTitle>
                  <p className="text-gray-600">Lengkapi form di bawah ini untuk mengajukan klaim garansi</p>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="text-gray-700 font-medium">
                        Nomor Telepon*
                      </Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="Nomor Telepon*"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="h-12 text-lg"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-700 font-medium">
                        Domisili*
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Domisili*"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="h-12 text-lg"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="warrantyCode" className="text-gray-700 font-medium">
                        Kode Garansi*
                      </Label>
                      <Input
                        id="warrantyCode"
                        name="warrantyCode"
                        type="text"
                        placeholder="Kode Garansi terletak pada Buku Panduan"
                        value={formData.warrantyCode}
                        onChange={handleInputChange}
                        className="h-12 text-lg"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-12 text-lg font-semibold"
                    >
                      Submit
                    </Button>
                  </form>

                  <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-center text-gray-800 font-semibold text-lg">
                      PESAN GARANSI AKAN KAMI KIRIM PALING LAMA 1×24 JAM
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <Clock className="h-12 w-12 text-blue-600 mx-auto" />
                    <h3 className="text-xl font-bold text-gray-900">Waktu Proses</h3>
                    <p className="text-gray-600">
                      Klaim garansi akan diproses maksimal 1×24 jam setelah pengajuan
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                    <h3 className="text-xl font-bold text-gray-900">Syarat & Ketentuan</h3>
                    <ul className="text-sm text-gray-600 space-y-2 text-left">
                      <li>• Produk masih dalam masa garansi</li>
                      <li>• Kode garansi masih valid</li>
                      <li>• Kerusakan bukan karena kelalaian pengguna</li>
                      <li>• Melampirkan bukti pembelian</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg bg-gradient-to-br from-blue-600 to-cyan-600">
                <CardContent className="p-6 text-white">
                  <div className="text-center space-y-4">
                    <Phone className="h-12 w-12 text-white mx-auto" />
                    <h3 className="text-xl font-bold">Butuh Bantuan?</h3>
                    <div className="space-y-2">
                      <p className="flex items-center justify-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>+62 812-3456-7890</span>
                      </p>
                      <p className="flex items-center justify-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>support@hidrosmart.com</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GuaranteeClaim;
