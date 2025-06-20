
import React, { useState } from 'react';
import { Navbar, Footer } from '@/components/HomeComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const contactInfo = [
    {
      icon: Phone,
      title: "Telepon",
      info: "+62 812-3456-7890",
      description: "Senin - Jumat, 08:00 - 17:00"
    },
    {
      icon: Mail,
      title: "Email",
      info: "info@hidrosmart.com",
      description: "Respon dalam 24 jam"
    },
    {
      icon: MapPin,
      title: "Alamat",
      info: "Jakarta, Indonesia",
      description: "Kantor pusat HidroSmart"
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      info: "24/7 Support",
      description: "Customer service siap membantu"
    }
  ];

  const services = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat langsung dengan tim support kami untuk bantuan cepat"
    },
    {
      icon: Headphones,
      title: "Phone Support",
      description: "Hubungi hotline kami untuk konsultasi produk dan layanan"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Kirim pertanyaan detail melalui email untuk respon lengkap"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-cyan-600 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-white space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">CONTACT US</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Kami siap membantu Anda dengan pertanyaan, saran, atau dukungan teknis. 
              Jangan ragu untuk menghubungi tim profesional kami.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-lg w-fit mx-auto">
                    <info.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                    <p className="text-blue-600 font-semibold mb-1">{info.info}</p>
                    <p className="text-gray-600 text-sm">{info.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardTitle className="text-2xl text-gray-900">Kirim Pesan</CardTitle>
                  <p className="text-gray-600">Lengkapi form di bawah ini dan kami akan segera menghubungi Anda</p>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 font-medium">
                          Nama Lengkap*
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Masukkan nama lengkap Anda"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="h-12"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-medium">
                          Email*
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Masukkan email Anda"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700 font-medium">
                          Nomor Telepon*
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Masukkan nomor telepon Anda"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="h-12"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-gray-700 font-medium">
                          Subjek*
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="Subjek pesan Anda"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700 font-medium">
                        Pesan*
                      </Label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        placeholder="Tulis pesan Anda di sini..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-12 text-lg font-semibold"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Kirim Pesan
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Support Services */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Layanan Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <service.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{service.title}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-lg bg-gradient-to-br from-blue-600 to-cyan-600">
                <CardContent className="p-6 text-white text-center space-y-4">
                  <h3 className="text-xl font-bold">Butuh Bantuan Cepat?</h3>
                  <p className="text-blue-100">
                    Tim customer service kami siap membantu Anda 24/7
                  </p>
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">
                    <Phone className="h-4 w-4 mr-2" />
                    Hubungi Sekarang
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">FAQ</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900">Berapa lama masa garansi?</p>
                      <p className="text-gray-600">Garansi produk berlaku selama 2 tahun</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Bagaimana cara klaim garansi?</p>
                      <p className="text-gray-600">Gunakan halaman Guarantee Claim di website</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Apakah ada biaya pengiriman?</p>
                      <p className="text-gray-600">Gratis ongkir untuk pembelian di atas Rp 500.000</p>
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

export default Contact;
