
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Briefcase, MapPin, Smartphone, Bell, Heart } from 'lucide-react';

const FeaturesSection = () => {
  const targetUsers = [
    {
      icon: Users,
      title: "PELAJAR & MAHASISWA",
      description: "Untuk mendukung aktivitas belajar dengan hidrasi yang optimal",
      image: "bg-gradient-to-br from-green-400 to-green-600"
    },
    {
      icon: Briefcase,
      title: "PEKERJA KANTORAN",
      description: "Membantu menjaga produktivitas dengan pengingat minum yang teratur",
      image: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      icon: MapPin,
      title: "TRAVELER",
      description: "Pendamping perjalanan yang memastikan hidrasi tetap terjaga",
      image: "bg-gradient-to-br from-purple-400 to-purple-600"
    }
  ];

  const features = [
    {
      icon: Smartphone,
      title: "Sensor & Notifikasi Langsung ke HP",
      description: "Terintegrasi dengan aplikasi mobile. 5 aplikasi, HidroSmart akan mengirimkan notifikasi saat anda perlu minum dengan teratur bernia untuk kenyamanan anda.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Heart,
      title: "Aplikasi Pelacak Hidrasi",
      description: "Pantau asupan air harian, atur target hidrasi, dan lihat progress secara real-time melalui aplikasi yang user-friendly untuk semua kalangan.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Bell,
      title: "Layar Sentuh Mini",
      description: "Tampilkan data air minum, indikator dehydrasi, serta progress harian langsung di layar sentuh kecil yang terletak pada tutup botol.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Desain Eco-Friendly & Stylish",
      description: "Menggunakan bahan yang ramah lingkungan dengan desain modern yang cocok untuk aktivitas harian, membuat tampilan tetap stylish dalam kehidupan sehari-hari.",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  return (
    <div className="space-y-20">
      {/* Target Users Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              # COCOK DIGUNAKAN UNTUK :
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {targetUsers.map((user, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <CardContent className="p-0">
                  <div className={`${user.image} h-48 flex items-center justify-center text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <user.icon className="h-16 w-16 z-10" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{user.title}</h3>
                    <p className="text-gray-600">{user.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              WE BUILD DIFFERENT
            </h2>
            <p className="text-xl text-gray-600">
              Fitur-fitur canggih yang membuat HidroSmart berbeda
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-lg flex-shrink-0`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
