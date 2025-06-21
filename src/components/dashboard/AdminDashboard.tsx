
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, ShoppingBag, Shield, MessageSquare, TrendingUp, Package } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalGuarantees: 0,
    totalContacts: 0,
    totalRevenue: 0
  });
  
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [guarantees, setGuarantees] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      // Fetch all data
      const [ordersRes, usersRes, guaranteesRes, contactsRes] = await Promise.all([
        supabase.from('order').select('*').order('tanggal_transaksi', { ascending: false }),
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('guarantee').select('*').order('tanggal_claim', { ascending: false }),
        supabase.from('contact').select('*').order('id', { ascending: false })
      ]);

      const ordersData = ordersRes.data || [];
      const usersData = usersRes.data || [];
      const guaranteesData = guaranteesRes.data || [];
      const contactsData = contactsRes.data || [];

      setOrders(ordersData);
      setUsers(usersData);
      setGuarantees(guaranteesData);
      setContacts(contactsData);

      // Calculate stats
      const totalRevenue = ordersData.reduce((sum, order) => sum + (order.total_harga || 0), 0);
      
      setStats({
        totalUsers: usersData.length,
        totalOrders: ordersData.length,
        totalGuarantees: guaranteesData.length,
        totalContacts: contactsData.length,
        totalRevenue
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('order')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      toast.success('Status pesanan berhasil diupdate');
      fetchAdminData();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Gagal mengupdate status pesanan');
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Kelola semua aspek HidroSmart</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Garansi</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalGuarantees}</p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Kontak</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalContacts}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-lg font-bold text-green-600">
                  Rp {stats.totalRevenue.toLocaleString('id-ID')}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders">Kelola Pesanan</TabsTrigger>
          <TabsTrigger value="users">Kelola Users</TabsTrigger>
          <TabsTrigger value="warranty">Kelola Garansi</TabsTrigger>
          <TabsTrigger value="contacts">Kelola Kontak</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Manajemen Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order: any) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                      <div>
                        <h3 className="font-semibold">{order.name}</h3>
                        <p className="text-sm text-gray-600">{order.email}</p>
                        <p className="text-sm text-gray-600">{order.phone}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium">HidroSmart - {order.color}</p>
                        <p className="text-sm text-gray-600">Jumlah: {order.kuantitas}</p>
                        <p className="text-sm font-semibold">
                          Rp {order.total_harga?.toLocaleString('id-ID')}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600">
                          {new Date(order.tanggal_transaksi).toLocaleDateString('id-ID')}
                        </p>
                        <p className="text-sm text-gray-600">
                          Pembayaran: {order.metode_pembayaran}
                        </p>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        {getStatusBadge(order.status)}
                        <Select
                          value={order.status}
                          onValueChange={(value) => updateOrderStatus(order.id, value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Menunggu</SelectItem>
                            <SelectItem value="processing">Diproses</SelectItem>
                            <SelectItem value="shipped">Dikirim</SelectItem>
                            <SelectItem value="delivered">Selesai</SelectItem>
                            <SelectItem value="cancelled">Dibatalkan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Manajemen Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user: any) => (
                  <div key={user.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone: {user.phone || 'N/A'}</p>
                        <p className="text-sm text-gray-600">
                          Bergabung: {new Date(user.created_at).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <div>
                        <Badge className="bg-blue-100 text-blue-800">User</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warranty">
          <Card>
            <CardHeader>
              <CardTitle>Manajemen Garansi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {guarantees.map((guarantee: any) => (
                  <div key={guarantee.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h3 className="font-semibold">{guarantee.name}</h3>
                        <p className="text-sm text-gray-600">{guarantee.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Kode: {guarantee.kode_garansi}</p>
                        <p className="text-sm text-gray-600">Domisili: {guarantee.domisili}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          {new Date(guarantee.tanggal_claim).toLocaleDateString('id-ID')}
                        </p>
                        <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Manajemen Kontak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contacts.map((contact: any) => (
                  <div key={contact.id} className="border rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{contact.name}</h3>
                          <p className="text-sm text-gray-600">{contact.email}</p>
                          <p className="text-sm text-gray-600">{contact.phone}</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">{contact.subjek}</Badge>
                      </div>
                      <p className="text-gray-700">{contact.pesan}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
