
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Package, Clock, CheckCircle, Star, Shield, User, Truck } from 'lucide-react';

const UserDashboard = () => {
  const { user, profile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [guarantees, setGuarantees] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    totalSpent: 0
  });

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch orders
      const { data: ordersData } = await supabase
        .from('order')
        .select('*')
        .eq('user_id', user.id)
        .order('tanggal_transaksi', { ascending: false });

      // Fetch guarantees
      const { data: guaranteesData } = await supabase
        .from('guarantee')
        .select('*')
        .eq('user_id', user.id)
        .order('tanggal_claim', { ascending: false });

      // Fetch reviews
      const { data: reviewsData } = await supabase
        .from('ulasan')
        .select('*')
        .eq('user_id', user.id);

      setOrders(ordersData || []);
      setGuarantees(guaranteesData || []);
      setReviews(reviewsData || []);

      // Calculate stats
      const totalOrders = ordersData?.length || 0;
      const completedOrders = ordersData?.filter(order => order.status === 'delivered').length || 0;
      const pendingOrders = ordersData?.filter(order => order.status === 'pending' || order.status === 'processing').length || 0;
      const totalSpent = ordersData?.reduce((sum, order) => sum + (order.total_harga || 0), 0) || 0;

      setStats({
        totalOrders,
        completedOrders,
        pendingOrders,
        totalSpent
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Menunggu' },
      processing: { color: 'bg-blue-100 text-blue-800', label: 'Diproses' },
      shipped: { color: 'bg-purple-100 text-purple-800', label: 'Dikirim' },
      delivered: { color: 'bg-green-100 text-green-800', label: 'Selesai' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Dibatalkan' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Selamat datang, {profile?.name || user?.email}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pesanan</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pesanan Selesai</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pesanan Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Belanja</p>
                <p className="text-2xl font-bold text-blue-600">Rp {stats.totalSpent.toLocaleString('id-ID')}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders">Status Pesanan</TabsTrigger>
          <TabsTrigger value="reviews">Ulasan</TabsTrigger>
          <TabsTrigger value="warranty">Garansi</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Belum ada pesanan</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order: any) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">HidroSmart - {order.color}</h3>
                          <p className="text-sm text-gray-600">Jumlah: {order.kuantitas} unit</p>
                          <p className="text-sm text-gray-600">
                            Tanggal: {new Date(order.tanggal_transaksi).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(order.status)}
                          <p className="text-lg font-bold mt-1">
                            Rp {order.total_harga?.toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        {getStatusIcon(order.status)}
                        <span>
                          {order.status === 'pending' && 'Pesanan sedang diverifikasi'}
                          {order.status === 'processing' && 'Pesanan sedang dikemas'}
                          {order.status === 'shipped' && 'Pesanan dalam perjalanan'}
                          {order.status === 'delivered' && 'Pesanan sudah diterima'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Ulasan Saya</CardTitle>
            </CardHeader>
            <CardContent>
              {reviews.length === 0 ? (
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Belum ada ulasan</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Buat ulasan setelah menerima produk
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review: any) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">{review.rating}/5</span>
                      </div>
                      <p className="text-gray-700">{review.isi_ulasan}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warranty">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Garansi</CardTitle>
            </CardHeader>
            <CardContent>
              {guarantees.length === 0 ? (
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Belum ada klaim garansi</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {guarantees.map((guarantee: any) => (
                    <div key={guarantee.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Klaim Garansi</h3>
                          <p className="text-sm text-gray-600">
                            Kode: {guarantee.kode_garansi}
                          </p>
                          <p className="text-sm text-gray-600">
                            Tanggal: {new Date(guarantee.tanggal_claim).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profil Saya</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <User className="h-12 w-12 text-gray-400 bg-gray-100 rounded-full p-2" />
                  <div>
                    <h3 className="font-semibold">{profile?.name || user?.email}</h3>
                    <p className="text-gray-600">{profile?.email || user?.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Nomor Telepon</label>
                    <p className="text-gray-900">{profile?.phone || 'Belum diisi'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Alamat</label>
                    <p className="text-gray-900">{profile?.address || 'Belum diisi'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
