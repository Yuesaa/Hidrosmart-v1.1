
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Navbar, Footer } from '@/components/HomeComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Banknote, Building2, Smartphone, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const orderData = location.state?.orderData;
  
  const [paymentData, setPaymentData] = useState({
    metode_pembayaran: '',
    bukti_transfer: ''
  });

  React.useEffect(() => {
    console.log('Payment component mounted with:', { user: user?.email, orderData });
    
    if (!user) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/auth');
      return;
    }
    
    if (!orderData) {
      toast.error('Data pesanan tidak ditemukan');
      navigate('/order');
      return;
    }
  }, [user, orderData, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentData.metode_pembayaran) {
      toast.error('Silakan pilih metode pembayaran');
      return;
    }

    if (!user || !orderData) {
      toast.error('Data tidak lengkap');
      return;
    }

    setLoading(true);

    try {
      console.log('Creating order with user:', user.id);
      console.log('Order data:', orderData);
      console.log('Payment data:', paymentData);

      // Prepare order data for insertion
      const orderInsertData = {
        user_id: user.id,
        name: profile?.name || user.email?.split('@')[0] || 'Unknown',
        email: user.email,
        phone: orderData.phone,
        alamat: orderData.alamat,
        color: orderData.color,
        kuantitas: parseInt(orderData.kuantitas.toString()),
        subtotal_harga: parseFloat(orderData.subtotal_harga.toString()),
        total_harga: parseFloat(orderData.total_harga.toString()),
        ongkir: orderData.ongkir.toString(),
        metode_pembayaran: paymentData.metode_pembayaran,
        bukti_transfer: paymentData.bukti_transfer || '',
        status: 'pending',
        tanggal_transaksi: new Date().toISOString()
      };

      console.log('Inserting order data:', orderInsertData);

      const { data, error } = await supabase
        .from('order')
        .insert(orderInsertData)
        .select();

      console.log('Insert result:', { data, error });

      if (error) {
        console.error('Database error:', error);
        throw new Error(`Gagal menyimpan pesanan: ${error.message}`);
      }

      if (!data || data.length === 0) {
        throw new Error('Tidak ada data yang dikembalikan dari database');
      }

      console.log('Order created successfully:', data[0]);
      toast.success('Pesanan berhasil dibuat!');
      
      // Navigate to dashboard after successful order creation
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      console.error('Error creating order:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!user || !orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const paymentMethods = [
    { value: 'bank_transfer', label: 'Transfer Bank', icon: Building2 },
    { value: 'e_wallet', label: 'E-Wallet (GoPay, OVO, DANA)', icon: Smartphone },
    { value: 'cash_on_delivery', label: 'Bayar di Tempat (COD)', icon: Banknote }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Pembayaran</h1>
              <p className="text-gray-600">Pilih metode pembayaran dan selesaikan transaksi Anda</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">HidroSmart Tumbler</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Warna: <span className="font-medium capitalize">{orderData.color}</span></p>
                      <p>Jumlah: <span className="font-medium">{orderData.kuantitas} unit</span></p>
                      <p>Pengiriman: <span className="font-medium">{orderData.alamat}</span></p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>Rp {Number(orderData.subtotal_harga).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ongkos Kirim</span>
                      <span>Rp {Number(orderData.ongkir).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total Pembayaran</span>
                      <span className="text-blue-600">Rp {Number(orderData.total_harga).toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Form */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                    <span>Metode Pembayaran</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <Label>Pilih Metode Pembayaran*</Label>
                      <div className="grid gap-3">
                        {paymentMethods.map((method) => (
                          <div 
                            key={method.value}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              paymentData.metode_pembayaran === method.value
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setPaymentData({...paymentData, metode_pembayaran: method.value})}
                          >
                            <div className="flex items-center space-x-3">
                              <method.icon className="h-5 w-5 text-gray-600" />
                              <span className="font-medium">{method.label}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {paymentData.metode_pembayaran === 'bank_transfer' && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Rekening Tujuan:</h4>
                        <div className="space-y-1 text-sm">
                          <p>Bank BCA: <strong>1234567890</strong></p>
                          <p>Bank Mandiri: <strong>0987654321</strong></p>
                          <p>A.n: <strong>PT HidroSmart Indonesia</strong></p>
                        </div>
                      </div>
                    )}

                    {paymentData.metode_pembayaran === 'e_wallet' && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">E-Wallet:</h4>
                        <div className="space-y-1 text-sm">
                          <p>GoPay: <strong>081234567890</strong></p>
                          <p>OVO: <strong>081234567890</strong></p>
                          <p>DANA: <strong>081234567890</strong></p>
                        </div>
                      </div>
                    )}

                    {(paymentData.metode_pembayaran === 'bank_transfer' || paymentData.metode_pembayaran === 'e_wallet') && (
                      <div className="space-y-2">
                        <Label htmlFor="bukti_transfer">Upload Bukti Transfer (Opsional)</Label>
                        <Input
                          id="bukti_transfer"
                          type="text"
                          placeholder="Link bukti transfer atau keterangan"
                          value={paymentData.bukti_transfer}
                          onChange={(e) => setPaymentData({...paymentData, bukti_transfer: e.target.value})}
                        />
                      </div>
                    )}

                    {paymentData.metode_pembayaran === 'cash_on_delivery' && (
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Bayar di Tempat (COD)</h4>
                        <p className="text-sm text-gray-600">
                          Anda akan membayar saat produk tiba di lokasi. Pastikan Anda berada di alamat yang tercantum saat kurir datang.
                        </p>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3"
                      disabled={loading}
                    >
                      {loading ? 'Memproses...' : 'Konfirmasi Pesanan'}
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

export default Payment;
