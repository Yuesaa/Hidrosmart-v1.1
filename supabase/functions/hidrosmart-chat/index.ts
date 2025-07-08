
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const hidrosmartKnowledge = `
Kamu adalah asisten virtual HidroSmart yang membantu menjawab pertanyaan tentang produk HidroSmart Tumbler. Berikut informasi produk:

PRODUK HIDROSMART TUMBLER:
- Tumbler pintar yang dilengkapi teknologi hidrogenasi air
- Menghasilkan air beroksigen tinggi dan hidrogen molekuler
- Kapasitas: 500ml
- Harga: Rp 299.000
- Tersedia dalam warna: Hitam, Putih, Biru, Merah
- Garansi: 1 tahun
- Bahan: Stainless steel food grade 304
- Baterai: Lithium rechargeable, tahan hingga 20 kali penggunaan

MANFAAT:
- Meningkatkan hidrasi tubuh
- Antioksidan alami
- Meningkatkan energi
- Detoksifikasi
- Memperbaiki metabolisme
- Menjaga kesehatan kulit

CARA PENGGUNAAN:
1. Isi tumbler dengan air bersih
2. Tekan tombol power
3. Tunggu 3 menit untuk proses hidrogenasi
4. Air siap diminum

PERAWATAN:
- Cuci dengan air hangat setelah penggunaan
- Jangan gunakan sabun keras
- Charge baterai saat indikator merah menyala
- Simpan di tempat kering

GARANSI & LAYANAN:
- Garansi 1 tahun untuk kerusakan manufaktur
- Layanan purna jual 24/7
- Tersedia spare part dan aksesoris

Jawab pertanyaan dengan ramah, informatif, dan dalam bahasa Indonesia. Jika ditanya tentang hal di luar produk HidroSmart, arahkan kembali ke topik produk dengan sopan.
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    console.log('Received message:', message);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: hidrosmartKnowledge },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to get response from OpenAI');
    }

    const reply = data.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in hidrosmart-chat function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
