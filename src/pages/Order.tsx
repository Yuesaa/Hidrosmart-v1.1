
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar, Footer } from '@/components/HomeComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Droplets, ShoppingCart, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

const Order = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [orderData, setOrderData] = useState({
    color: '',
    kuantitas: 1,
    phone: profile?.phone || '',
    alamat: profile?.address || ''
  });

  const productPrice = 299000; // Harga produk HidroSmart
  const shippingCost = 15000; // Ongkir

  React.useEffect(() => {
    if (!user) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    setOrderData(prev => ({
      ...prev,
      kuantitas: action === 'increase' 
        ? prev.kuantitas + 1 
        : Math.max(1, prev.kuantitas - 1)
    }));
  };

  const subtotal = productPrice * orderData.kuantitas;
  const total = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderData.color) {
      toast.error('Silakan pilih warna');
      return;
    }

    // Navigate to payment page with order data
    navigate('/payment', {
      state: {
        orderData: {
          ...orderData,
          subtotal_harga: subtotal,
          total_harga: total,
          ongkir: shippingCost
        }
      }
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Pesan HidroSmart</h1>
              <p className="text-gray-600">Lengkapi form pemesanan di bawah ini</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Product Info */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Droplets className="h-6 w-6 text-blue-600" />
                    <span>HidroSmart Tumbler</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white text-center">
                    <Droplets className="h-16 w-16 mx-auto mb-4 text-blue-200" />
                    <h3 className="text-xl font-bold mb-2">HIDROSMART</h3>
                    <p className="text-blue-200">Smart Tumbler with Health Monitoring</p>
                    <div className="mt-4 text-2xl font-bold">
                      Rp {productPrice.toLocaleString('id-ID')}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Fitur Utama:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Smart sensor untuk monitoring hidrasi</li>
                      <li>• Aplikasi mobile terintegrasi</li>
                      <li>• Real-time health tracking</li>
                      <li>• Battery life hingga 7 hari</li>
                      <li>• Material BPA-free dan food grade</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Order Form */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                    <span>Form Pemesanan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="color">Pilih Warna*</Label>
                      <Select value={orderData.color} onValueChange={(value) => setOrderData({...orderData, color: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih warna HidroSmart" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hitam">Hitam</SelectItem>
                          <SelectItem value="putih">Putih</SelectItem>
                          <SelectItem value="biru">Biru</SelectItem>
                          <SelectItem value="merah">Merah</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Jumlah*</Label>
                      <div className="flex items-center space-x-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange('decrease')}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-xl font-semibold w-12 text-center">
                          {orderData.kuantitas}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange('increase')}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon*</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Nomor telepon Anda"
                        value={orderData.phone}
                        onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="alamat">Alamat Pengiriman*</Label>
                      <Textarea
                        id="alamat"
                        placeholder="Alamat lengkap untuk pengiriman"
                        value={orderData.alamat}
                        onChange={(e) => setOrderData({...orderData, alamat: e.target.value})}
                        required
                        rows={3}
                      />
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <h4 className="font-semibold text-gray-900">Ringkasan Pesanan</h4>
                      <div className="flex justify-between text-sm">
                        <span>Subtotal ({orderData.kuantitas} item)</span>
                        <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Ongkos Kirim</span>
                        <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>Rp {total.toLocaleString('id-ID')}</span>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3"
                    >
                      Lanjut ke Pembayaran
                    </Button>
                  </form>
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

export default Order;
