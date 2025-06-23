
import React, { useState } from 'react';
import { Navbar, Footer } from '@/components/HomeComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Mail, Phone, MapPin, Clock, Send, Droplets, Filter, Zap, Award, Users, ShieldCheck, Headphones, Star } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    toast.success('Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const faqData = [
    {
      id: "item-1",
      question: "Apa itu HIDROSMART dan bagaimana cara kerjanya?",
      answer: "HIDROSMART adalah sistem filter air canggih yang menggunakan teknologi reverse osmosis untuk menghasilkan air minum berkualitas tinggi. Sistem ini bekerja dengan menyaring air melalui beberapa tahap filtrasi untuk menghilangkan kontaminan, bakteri, dan zat berbahaya lainnya.",
      icon: <Droplets className="h-5 w-5 text-blue-600" />
    },
    {
      id: "item-2",
      question: "Berapa lama garansi produk HIDROSMART?",
      answer: "Semua produk HIDROSMART dilengkapi dengan garansi resmi selama 2 tahun untuk komponen utama dan 1 tahun untuk aksesori. Garansi mencakup kerusakan manufaktur dan layanan perbaikan gratis selama masa garansi berlaku.",
      icon: <ShieldCheck className="h-5 w-5 text-green-600" />
    },
    {
      id: "item-3",
      question: "Seberapa sering filter perlu diganti?",
      answer: "Filter pre-treatment perlu diganti setiap 6-12 bulan, sedangkan membran RO perlu diganti setiap 18-24 bulan. Waktu penggantian dapat bervariasi tergantung kualitas air baku dan intensitas penggunaan. Kami akan mengingatkan Anda saat saatnya penggantian.",
      icon: <Filter className="h-5 w-5 text-orange-600" />
    },
    {
      id: "item-4",
      question: "Berapa konsumsi listrik sistem HIDROSMART?",
      answer: "Sistem HIDROSMART sangat hemat energi dengan konsumsi listrik rata-rata hanya 24 watt (setara dengan 1 lampu LED). Biaya operasional bulanan sangat minimal, sekitar Rp 15.000-25.000 per bulan tergantung tarif listrik daerah Anda.",
      icon: <Zap className="h-5 w-5 text-yellow-600" />
    },
    {
      id: "item-5",
      question: "Apakah HIDROSMART memiliki sertifikat resmi?",
      answer: "Ya, semua produk HIDROSMART telah tersertifikasi oleh Kementerian Kesehatan RI, memiliki sertifikat ISO 9001:2015, dan telah lulus uji laboratorium terakreditasi. Kami juga memiliki sertifikat halal dari MUI untuk memastikan produk aman dikonsumsi.",
      icon: <Award className="h-5 w-5 text-purple-600" />
    },
    {
      id: "item-6",
      question: "Bagaimana cara perawatan sistem HIDROSMART?",
      answer: "Perawatan sangat mudah: bersihkan housing filter setiap 3 bulan, ganti filter sesuai jadwal, dan lakukan pembilasan sistem setiap minggu. Tim teknisi kami juga menyediakan layanan perawatan berkala untuk memastikan sistem selalu dalam kondisi optimal.",
      icon: <Users className="h-5 w-5 text-indigo-600" />
    },
    {
      id: "item-7",
      question: "Apakah tersedia layanan purna jual?",
      answer: "Tentu! Kami menyediakan layanan purna jual lengkap meliputi: instalasi gratis, pelatihan penggunaan, layanan konsultasi 24/7, maintenance berkala, dan ketersediaan spare part. Tim customer service kami siap membantu Anda kapan saja.",
      icon: <Headphones className="h-5 w-5 text-red-600" />
    },
    {
      id: "item-8",
      question: "Apa keunggulan HIDROSMART dibanding produk lain?",
      answer: "HIDROSMART unggul dalam hal: teknologi terdepan dengan efisiensi tinggi, desain compact yang hemat tempat, sistem monitoring otomatis, garansi lengkap, layanan purna jual terbaik, dan harga yang kompetitif. Kepuasan pelanggan adalah prioritas utama kami.",
      icon: <Star className="h-5 w-5 text-amber-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Tim ahli kami siap membantu Anda dengan solusi air bersih terbaik
          </p>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Informasi Kontak</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Alamat</h3>
                    <p className="text-gray-600">
                      Jl. Teknologi No. 123<br />
                      Jakarta Selatan 12345<br />
                      Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Telepon</h3>
                    <p className="text-gray-600">+62 21 1234 5678</p>
                    <p className="text-gray-600">+62 812 3456 7890 (WhatsApp)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@hidrosmart.com</p>
                    <p className="text-gray-600">support@hidrosmart.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Jam Operasional</h3>
                    <p className="text-gray-600">Senin - Jumat: 08:00 - 17:00</p>
                    <p className="text-gray-600">Sabtu: 08:00 - 15:00</p>
                    <p className="text-gray-600">Minggu: Tutup</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Kirim Pesan</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Masukkan nama lengkap"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="border-gray-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">No. Telepon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Masukkan no. telepon"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Masukkan alamat email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subjek</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Masukkan subjek pesan"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tulis pesan Anda di sini..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="border-gray-300 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section with 2-column layout */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Temukan jawaban atas pertanyaan-pertanyaan umum tentang produk dan layanan HIDROSMART
            </p>
          </div>

          {/* FAQ in 2 columns */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <Accordion type="single" collapsible className="space-y-4">
                {faqData.slice(0, 4).map((faq) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id}
                    className="border border-gray-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <div className="flex items-center space-x-3">
                        {faq.icon}
                        <span className="font-semibold text-gray-900">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Right Column */}
            <div>
              <Accordion type="single" collapsible className="space-y-4">
                {faqData.slice(4, 8).map((faq) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id}
                    className="border border-gray-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <div className="flex items-center space-x-3">
                        {faq.icon}
                        <span className="font-semibold text-gray-900">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Additional Help Section */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="py-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Masih ada pertanyaan lain?
                </h3>
                <p className="text-gray-600 mb-4">
                  Tim customer service kami siap membantu Anda 24/7
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Hubungi Kami
                  </Button>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Mail className="h-4 w-4 mr-2" />
                    Kirim Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
