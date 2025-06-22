
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Navbar, Footer } from '@/components/HomeComponents';
import { Mail, Phone, MapPin, Clock, MessageCircle, HelpCircle, Droplets, Smartphone, Shield, Truck, CreditCard, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  subject: z.string().min(5, 'Subjek minimal 5 karakter'),
  message: z.string().min(10, 'Pesan minimal 10 karakter'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          subjek: data.subject,
          pesan: data.message,
          user_id: user?.id || null,
        });

      if (error) throw error;

      toast.success('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.');
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqData = [
    {
      question: "Apa itu HIDROSMART dan bagaimana cara kerjanya?",
      answer: "HIDROSMART adalah tumbler pintar dengan sensor canggih yang dapat memantau konsumsi air Anda secara real-time. Tumbler ini terhubung dengan aplikasi mobile melalui Bluetooth/WiFi untuk memberikan data akurat tentang hidrasi harian Anda, mengingatkan waktu minum, dan melacak pola konsumsi air untuk kesehatan optimal.",
      icon: <Droplets className="h-5 w-5 text-blue-600" />
    },
    {
      question: "Bagaimana cara menghubungkan HIDROSMART dengan smartphone?",
      answer: "Mudah sekali! Download aplikasi HIDROSMART dari App Store/Play Store, nyalakan Bluetooth pada smartphone Anda, tekan tombol pairing pada tumbler selama 3 detik hingga lampu berkedip, lalu ikuti instruksi di aplikasi untuk menyelesaikan proses pairing. Proses ini hanya membutuhkan waktu kurang dari 2 menit.",
      icon: <Smartphone className="h-5 w-5 text-blue-600" />
    },
    {
      question: "Apakah HIDROSMART waterproof dan aman untuk dicuci?",
      answer: "Ya! HIDROSMART memiliki sertifikasi IPX7 yang membuatnya tahan air dan aman untuk dicuci. Anda dapat mencuci bagian dalam dan luar tumbler dengan air mengalir. Namun, hindari merendam bagian sensor dalam air terlalu lama dan jangan gunakan dishwasher untuk menjaga kualitas sensor.",
      icon: <Shield className="h-5 w-5 text-blue-600" />
    },
    {
      question: "Berapa lama daya tahan baterai HIDROSMART?",
      answer: "Baterai HIDROSMART dapat bertahan hingga 30 hari dengan penggunaan normal. Tumbler dilengkapi dengan teknologi low-power consumption dan dapat dicharge menggunakan kabel USB-C yang disertakan. Indikator baterai akan muncul di aplikasi ketika perlu dicharge.",
      icon: <RefreshCw className="h-5 w-5 text-blue-600" />
    },
    {
      question: "Bagaimana kebijakan garansi dan pengembalian produk?",
      answer: "Kami memberikan garansi 2 tahun untuk kerusakan manufaktur dan 30 hari money-back guarantee jika Anda tidak puas. Garansi mencakup sensor, elektronik, dan aplikasi. Untuk klaim garansi, silakan gunakan fitur 'Guarantee Claim' di website atau hubungi customer service kami dengan menyertakan nomor seri produk.",
      icon: <Shield className="h-5 w-5 text-blue-600" />
    },
    {
      question: "Apakah tersedia pengiriman ke seluruh Indonesia?",
      answer: "Ya, kami melayani pengiriman ke seluruh Indonesia melalui berbagai ekspedisi terpercaya (JNE, J&T, SiCepat, dll). Pengiriman gratis untuk pembelian di atas Rp 500.000. Estimasi pengiriman 2-5 hari kerja untuk Jabodetabek, 3-7 hari kerja untuk kota besar lainnya.",
      icon: <Truck className="h-5 w-5 text-blue-600" />
    },
    {
      question: "Metode pembayaran apa saja yang diterima?",
      answer: "Kami menerima berbagai metode pembayaran: Transfer Bank (BCA, Mandiri, BNI, BRI), E-wallet (GoPay, OVO, DANA, ShopeePay), Kartu Kredit/Debit (Visa, MasterCard), dan COD untuk area tertentu. Semua transaksi dijamin aman dengan enkripsi SSL.",
      icon: <CreditCard className="h-5 w-5 text-blue-600" />
    },
    {
      question: "Bagaimana cara melakukan kalibrasi sensor untuk akurasi maksimal?",
      answer: "Kalibrasi otomatis dilakukan saat pertama kali setup. Untuk kalibrasi manual: kosongkan tumbler sepenuhnya, tekan tombol kalibrasi selama 5 detik, isi dengan air 500ml, konfirmasi di aplikasi. Lakukan kalibrasi ulang setiap 3 bulan atau jika akurasi menurun.",
      icon: <HelpCircle className="h-5 w-5 text-blue-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Hubungi Kami</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Tim customer service HIDROSMART siap membantu Anda 24/7. 
            Jangan ragu untuk menghubungi kami!
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-6 w-6 text-blue-600" />
                <span>Kirim Pesan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Input
                    {...register('name')}
                    placeholder="Nama Lengkap"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="Email"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Input
                    {...register('phone')}
                    placeholder="Nomor Telepon"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Input
                    {...register('subject')}
                    placeholder="Subjek"
                    className={errors.subject ? 'border-red-500' : ''}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <Textarea
                    {...register('message')}
                    placeholder="Pesan Anda"
                    rows={5}
                    className={errors.message ? 'border-red-500' : ''}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">info@hidrosmart.com</p>
                    <p className="text-gray-600">support@hidrosmart.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Telepon</h3>
                    <p className="text-gray-600">+62 812-3456-7890</p>
                    <p className="text-gray-600">+62 21-1234-5678</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Alamat</h3>
                    <p className="text-gray-600">
                      Jl. Teknologi No. 123<br />
                      Jakarta Selatan 12345<br />
                      Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Jam Operasional</h3>
                    <p className="text-gray-600">Senin - Jumat: 08:00 - 18:00</p>
                    <p className="text-gray-600">Sabtu: 09:00 - 15:00</p>
                    <p className="text-gray-600">Minggu: Libur</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <HelpCircle className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Temukan jawaban untuk pertanyaan yang paling sering ditanyakan tentang HIDROSMART. 
              Jika pertanyaan Anda tidak ada di sini, jangan ragu untuk menghubungi kami!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-50 p-2 rounded-full flex-shrink-0">
                        {faq.icon}
                      </div>
                      <span className="font-semibold text-gray-900 text-lg">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="pl-14">
                      <p className="text-gray-700 leading-relaxed text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Additional Help Section */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Masih Ada Pertanyaan?
                </h3>
                <p className="text-gray-700 mb-6">
                  Tim support HIDROSMART siap membantu Anda! Hubungi kami melalui live chat, 
                  email, atau telepon untuk mendapatkan bantuan personal.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Live Chat
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Hubungi Kami
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
