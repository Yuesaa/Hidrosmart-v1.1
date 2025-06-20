
import React from 'react';
import { Navbar, Footer } from '@/components/HomeComponents';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplets, Smartphone, Shield, Zap, Users, Award, Target, Heart, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Kesehatan Pertama",
      description: "Kami percaya kesehatan adalah prioritas utama dalam hidup setiap orang"
    },
    {
      icon: Shield,
      title: "Kualitas Terjamin",
      description: "Produk berkualitas tinggi dengan standar internasional dan garansi resmi"
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Kepuasan pelanggan adalah tujuan utama dalam setiap layanan yang kami berikan"
    },
    {
      icon: Target,
      title: "Inovasi Berkelanjutan",
      description: "Terus berinovasi menghadirkan teknologi terdepan untuk kesehatan Anda"
    }
  ];

  const achievements = [
    { number: "10,000+", label: "Pengguna Aktif" },
    { number: "4.9★", label: "Rating Kepuasan" },
    { number: "99.9%", label: "Uptime Aplikasi" },
    { number: "24/7", label: "Customer Support" }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Health Officer",
      description: "Ahli kesehatan dengan pengalaman 15+ tahun dalam teknologi medis"
    },
    {
      name: "Michael Chen",
      role: "Lead Engineer",
      description: "Expert dalam IoT dan sensor technology dengan berbagai inovasi"
    },
    {
      name: "Lisa Rodriguez",
      role: "Product Manager",
      description: "Berpengalaman dalam product development dan user experience"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-cyan-600 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-white space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">ABOUT US</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              HidroSmart lahir dari visi untuk menghadirkan teknologi kesehatan yang mudah diakses 
              dan dapat diandalkan oleh setiap orang dalam kehidupan sehari-hari.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Cerita Kami
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Berawal dari keprihatinan akan minimnya kesadaran masyarakat terhadap pentingnya 
                hidrasi yang cukup, kami mengembangkan HidroSmart sebagai solusi inovatif yang 
                menggabungkan teknologi sensor canggih dengan kemudahan penggunaan.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Dengan dukungan tim ahli kesehatan dan teknologi, kami berkomitmen menghadirkan 
                produk yang tidak hanya canggih, tetapi juga mudah digunakan oleh siapa saja, 
                kapan saja, dan di mana saja.
              </p>
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3">
                  Hubungi Kami
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Droplets className="h-24 w-24 mx-auto text-blue-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">HidroSmart Innovation</h3>
                  <p className="text-gray-600">Technology for Better Health</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-xl text-gray-600">
              Prinsip yang memandu setiap langkah perjalanan HidroSmart
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-lg w-fit mx-auto">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pencapaian Kami
            </h2>
            <p className="text-xl text-gray-600">
              Kepercayaan Anda adalah pencapaian terbaik bagi kami
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-700 font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tim Kami
            </h2>
            <p className="text-xl text-gray-600">
              Ahli terbaik yang berdedikasi untuk kesehatan Anda
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mx-auto flex items-center justify-center">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-6 text-white">
            <h2 className="text-3xl md:text-4xl font-bold">
              Siap Memulai Hidup Sehat Bersama Kami?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pengguna yang telah merasakan manfaat HidroSmart
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/order">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                  Pesan Sekarang
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
