import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Package, 
  Star, 
  Shield, 
  Edit, 
  Save, 
  X,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface Order {
  id: number;
  name: string;
  email: string;
  phone: string;
  alamat: string;
  color: string;
  kuantitas: number;
  subtotal_harga: number;
  total_harga: number;
  ongkir: string;
  metode_pembayaran: string;
  bukti_transfer: string;
  status: string;
  tanggal_transaksi: string;
}

interface Review {
  id: number;
  id_order: number;
  rating: number;
  isi_ulasan: string;
}

interface GuaranteeClaim {
  id: number;
  phone: string;
  domisili: string;
  kode_garansi: string;
  tanggal_claim: string;
}

const UserDashboard = () => {
  const { user, profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: profile?.name || '',
    phone: profile?.phone || '',
    address: profile?.address || ''
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [guaranteeClaims, setGuaranteeClaims] = useState<GuaranteeClaim[]>([]);
  const [loading, setLoading] = useState(true);

  // Review form state
  const [reviewForm, setReviewForm] = useState({
    orderId: 0,
    rating: 5,
    comment: ''
  });

  // Guarantee claim form state
  const [guaranteeForm, setGuaranteeForm] = useState({
    orderId: 0,
    warrantyCode: ''
  });

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('order')
        .select('*')
        .eq('user_id', user.id)
        .order('tanggal_transaksi', { ascending: false });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
      } else {
        setOrders(ordersData || []);
      }

      // Fetch reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('ulasan')
        .select('*')
        .eq('user_id', user.id);

      if (reviewsError) {
        console.error('Error fetching reviews:', reviewsError);
      } else {
        setReviews(reviewsData || []);
      }

      // Fetch guarantee claims
      const { data: guaranteeData, error: guaranteeError } = await supabase
        .from('guarantee')
        .select('*')
        .eq('user_id', user.id);

      if (guaranteeError) {
        console.error('Error fetching guarantee claims:', guaranteeError);
      } else {
        setGuaranteeClaims(guaranteeData || []);
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Gagal memuat data pengguna');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: editedProfile.name,
          phone: editedProfile.phone,
          address: editedProfile.address,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profil berhasil diperbarui');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Gagal memperbarui profil');
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || reviewForm.orderId === 0) return;

    try {
      const { error } = await supabase
        .from('ulasan')
        .insert({
          user_id: user.id,
          id_order: reviewForm.orderId,
          rating: reviewForm.rating,
          isi_ulasan: reviewForm.comment,
          id_pengguna: 0 // Legacy field
        });

      if (error) throw error;

      toast.success('Ulasan berhasil dikirim');
      setReviewForm({ orderId: 0, rating: 5, comment: '' });
      fetchUserData(); // Refresh data
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Gagal mengirim ulasan');
    }
  };

  const handleGuaranteeClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || guaranteeForm.orderId === 0) return;

    try {
      const { error } = await supabase
        .from('guarantee')
        .insert({
          user_id: user.id,
          name: profile?.name || user.email?.split('@')[0] || 'Unknown',
          email: user.email,
          phone: profile?.phone || '',
          domisili: profile?.address || '',
          kode_garansi: guaranteeForm.warrantyCode,
          tanggal_claim: new Date().toISOString(),
          id_pengguna: 0 // Legacy field
        });

      if (error) throw error;

      toast.success('Klaim garansi berhasil diajukan');
      setGuaranteeForm({ orderId: 0, warrantyCode: '' });
      fetchUserData(); // Refresh data
    } catch (error) {
      console.error('Error submitting guarantee claim:', error);
      toast.error('Gagal mengajukan klaim garansi');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { color: 'bg-yellow-100 text-yellow-800', text: 'Menunggu' },
      'confirmed': { color: 'bg-blue-100 text-blue-800', text: 'Dikonfirmasi' },
      'shipped': { color: 'bg-purple-100 text-purple-800', text: 'Dikirim' },
      'delivered': { color: 'bg-green-100 text-green-800', text: 'Diterima Customer' },
      'cancelled': { color: 'bg-red-100 text-red-800', text: 'Dibatalkan' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  // Get completed orders (status: delivered)
  const completedOrders = orders.filter(order => order.status === 'delivered');
  
  // Check if user can write reviews (has completed orders and hasn't reviewed them yet)
  const canWriteReviews = completedOrders.length > 0;
  const availableOrdersForReview = completedOrders.filter(order => 
    !reviews.some(review => review.id_order === order.id)
  );

  // Check if user can claim guarantee (has completed orders)
  const canClaimGuarantee = completedOrders.length > 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Pengguna</h1>
          <p className="text-gray-600">Selamat datang, {profile?.name || user?.email}</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profil</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Pesanan</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Ulasan</span>
            </TabsTrigger>
            <TabsTrigger value="guarantee" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Garansi</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Informasi Profil</CardTitle>
                <Button
                  variant={isEditing ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (isEditing) {
                      setIsEditing(false);
                      setEditedProfile({
                        name: profile?.name || '',
                        phone: profile?.phone || '',
                        address: profile?.address || ''
                      });
                    } else {
                      setIsEditing(true);
                    }
                  }}
                >
                  {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  <span className="ml-2">{isEditing ? 'Batal' : 'Edit'}</span>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-gray-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    type="text"
                    value={isEditing ? editedProfile.name : (profile?.name || '')}
                    onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-100" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={isEditing ? editedProfile.phone : (profile?.phone || '')}
                    onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-100" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Textarea
                    id="address"
                    value={isEditing ? editedProfile.address : (profile?.address || '')}
                    onChange={(e) => setEditedProfile({...editedProfile, address: e.target.value})}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-100" : ""}
                    rows={3}
                  />
                </div>

                {isEditing && (
                  <Button onClick={handleProfileUpdate} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Simpan Perubahan
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Pesanan</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Belum ada pesanan</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">HidroSmart Tumbler - {order.color}</h3>
                            <p className="text-sm text-gray-600">
                              {order.kuantitas} unit × Rp {order.subtotal_harga.toLocaleString('id-ID')}
                            </p>
                            <p className="text-sm text-gray-600">
                              Total: Rp {order.total_harga.toLocaleString('id-ID')}
                            </p>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(order.status)}
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(order.tanggal_transaksi).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-6">
              {/* Review Form - Only show if user has completed orders */}
              {canWriteReviews && availableOrdersForReview.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>Tulis Ulasan</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label>Pilih Pesanan untuk Diulas</Label>
                        <select
                          className="w-full p-2 border rounded-md"
                          value={reviewForm.orderId}
                          onChange={(e) => setReviewForm({...reviewForm, orderId: parseInt(e.target.value)})}
                          required
                        >
                          <option value={0}>Pilih pesanan...</option>
                          {availableOrdersForReview.map((order) => (
                            <option key={order.id} value={order.id}>
                              HidroSmart Tumbler - {order.color} (Order #{order.id})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label>Rating</Label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewForm({...reviewForm, rating: star})}
                              className={`p-1 ${star <= reviewForm.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                            >
                              <Star className="h-6 w-6 fill-current" />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="comment">Komentar</Label>
                        <Textarea
                          id="comment"
                          value={reviewForm.comment}
                          onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                          placeholder="Tulis ulasan Anda tentang produk ini..."
                          rows={4}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Kirim Ulasan
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Show message if user can't write reviews */}
              {!canWriteReviews && (
                <Card>
                  <CardContent className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Ulasan akan tersedia setelah Anda menyelesaikan pesanan dan produk diterima.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Existing Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Ulasan Saya</CardTitle>
                </CardHeader>
                <CardContent>
                  {reviews.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Belum ada ulasan</p>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="border rounded-lg p-4">
                          <div className="flex items-center space-x-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.isi_ulasan}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="guarantee">
            <div className="space-y-6">
              {/* Guarantee Claim Form - Only show if user has completed orders */}
              {canClaimGuarantee && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Ajukan Klaim Garansi</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleGuaranteeClaimSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label>Pilih Pesanan untuk Klaim Garansi</Label>
                        <select
                          className="w-full p-2 border rounded-md"
                          value={guaranteeForm.orderId}
                          onChange={(e) => setGuaranteeForm({...guaranteeForm, orderId: parseInt(e.target.value)})}
                          required
                        >
                          <option value={0}>Pilih pesanan...</option>
                          {completedOrders.map((order) => (
                            <option key={order.id} value={order.id}>
                              HidroSmart Tumbler - {order.color} (Order #{order.id})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="warrantyCode">Kode Garansi</Label>
                        <Input
                          id="warrantyCode"
                          type="text"
                          value={guaranteeForm.warrantyCode}
                          onChange={(e) => setGuaranteeForm({...guaranteeForm, warrantyCode: e.target.value})}
                          placeholder="Masukkan kode garansi dari buku panduan"
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Ajukan Klaim Garansi
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Show message if user can't claim guarantee */}
              {!canClaimGuarantee && (
                <Card>
                  <CardContent className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Klaim garansi akan tersedia setelah Anda menyelesaikan pesanan dan produk diterima.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Existing Guarantee Claims */}
              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Klaim Garansi</CardTitle>
                </CardHeader>
                <CardContent>
                  {guaranteeClaims.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Belum ada klaim garansi</p>
                  ) : (
                    <div className="space-y-4">
                      {guaranteeClaims.map((claim) => (
                        <div key={claim.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">Kode Garansi: {claim.kode_garansi}</p>
                              <p className="text-sm text-gray-600">Domisili: {claim.domisili}</p>
                              <p className="text-sm text-gray-600">Telepon: {claim.phone}</p>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-blue-100 text-blue-800">Diproses</Badge>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(claim.tanggal_claim).toLocaleDateString('id-ID')}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
