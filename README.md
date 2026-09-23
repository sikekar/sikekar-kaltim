# SIKEKAR Kaltim — Website Gratis Starter
Portal government-modern terinspirasi pola layanan publik Gatrik, tetapi dengan identitas, struktur, dan kode sendiri.

## Isi
- Website publik responsive
- Dashboard contoh
- Modul layanan K2
- Pelaku Usaha, Pemerintahan, GIS, Dokumen, Pengaduan
- PWA/offline cache dasar
- Skema database Supabase untuk tahap backend
- Siap deploy gratis ke GitHub Pages atau Cloudflare Pages

## Jalur paling mudah
1. Buat akun GitHub.
2. Buat repository public bernama `sikekar-kaltim`.
3. Upload seluruh isi folder ini.
4. Settings > Pages > Deploy from branch > main/root.
5. Buka URL GitHub Pages.

## Backend
Buat project Supabase Free, buka SQL Editor, jalankan `supabase/schema.sql`.
Kemudian hubungkan frontend ke Supabase JS dan buat RLS sebelum produksi.

## Penting
Data contoh pada dashboard hanyalah placeholder. Jangan masukkan data pribadi/rahasia atau data pemeriksaan nyata sebelum autentikasi, RLS, audit log, backup, dan kebijakan keamanan selesai.
