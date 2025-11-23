# ITFix — Aplikasi Laporan Fasilitas Kampus
### Deskripsi Singkat

CampusFix adalah aplikasi web full-stack untuk melaporkan fasilitas rusak di lingkungan kampus. Pengguna dapat mengirim laporan lengkap dengan foto, lokasi, dan deskripsi; tim maintenance dapat melihat, memperbarui status, dan menutup laporan.

# Masalah yang Diselesaikan (Problem Statement)

Di banyak kampus, laporan fasilitas rusak (lampu mati, AC rusak, toilet bocor, kursi rusak) sering tidak terdokumentasi dengan rapi sehingga perbaikan lambat, hilang, atau tidak terprioritaskan. Tidak ada cara mudah untuk melacak status perbaikan dari pelapor.

# Solusi yang Dibuat (Solution Overview)

CampusFix menyediakan alur digital untuk:

- Pelaporan cepat oleh mahasiswa/staff (foto + lokasi + deskripsi).

- Pencatatan otomatis ke database (MongoDB) dengan bukti foto yang tersimpan di Cloudinary.

- Dashboard untuk melihat semua laporan, detail, dan status.

- Mekanisme role-based: user biasa mengirim laporan; staff maintenance dapat mengubah status (pending → in_progress → fixed) dan menutup laporan.

- Autentikasi aman menggunakan JWT dan password hashed.

Hasil: proses pelaporan terdokumentasi, perbaikan lebih terkoordinasi, dan ada rekam jejak perbaikan.

# Tech Stack & Fitur Utama

### Backend

- Node.js, Express.js

- MongoDB (Atlas atau lokal)

- Authentication: JWT

- Password hashing: bcryptjs

- File upload: multer + Cloudinary

- Environment: dotenv

### Frontend

- React (Vite)

- React Router (routing)

- Axios (HTTP client)

- Responsive CSS sederhana (styles.css; bisa diganti Tailwind)

# Fitur Utama

- Register & Login (JWT) — token disimpan di localStorage

- CRUD untuk entitas Report (Create, Read, Update, Delete)

- Upload foto laporan (multipart/form-data) → diunggah ke Cloudinary → URL disimpan di MongoDB

- Halaman: Login/Register, Dashboard (list), Create/Edit/Detail Report

- Role-based access (user vs staff) — hanya staff dapat mengubah status

# Cara Menjalankan Project (Setup Instructions)
### 1. Prasyarat

- Node.js 18+ & npm

- MongoDB (Atlas disarankan) atau MongoDB lokal

- Akun Cloudinary (jika ingin upload gambar ke cloud)

### 2. Clone / Extract
```bash
git clone <repo-url>

cd ITFix     
```

### 3. Backend — Konfigurasi & Jalankan

Masuk ke folder backend:
```bash
cd backend
npm install
```

Buat file .env (sama lokasi dengan server.js) dan isi:
```bash
PORT=5000
MONGO_URI=<YOUR_MONGODB_URI>
JWT_SECRET=<YOUR_JWT_SECRET>

# Cloudinary (opsional tapi direkomendasikan)
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
```

Jalankan server:
```bash
# development
npm run dev    # jika ada script dev (nodemon)
# atau
node server.js
```

Server backend biasanya berjalan di: http://localhost:5000
Base API: http://localhost:5000/api

### 4. Frontend — Konfigurasi & Jalankan

Buka terminal baru, masuk folder frontend:
```bash
cd ../frontend
npm install
```

Buat .env di folder frontend:
```
VITE_API_URL=http://localhost:5000/api
```

Jalankan dev server:
```bash
npm run dev
```

Frontend default Vite akan buka: http://localhost:5173 (atau alamat yang ditampilkan di terminal).

# Cara Menguji Fitur Utama (Quick Tests)

- Register: buka /register, daftar user baru.

- Login: buka /login, masukkan kredensial. Setelah login, token disimpan di localStorage (kunci: token).

- Buat Report: buka Create Report, isi judul/deskripsi/lokasi, pilih foto → submit.

- Lihat Dashboard: buka Dashboard, seharusnya muncul daftar laporan dengan thumbnail.

- Detail & Update: buka detail report; jika kamu staff, ubah status jadi in_progress/fixed.

- Untuk menjadikan user sebagai staff: jalankan node backend/scripts/promoteToStaff.js user@example.com setelah mengisi MONGO_URI di .env (skrip tersedia).

# Endpoints Penting (Ringkasan)

- POST /api/auth/register — register { name/email/password }

- POST /api/auth/login — login { email/password } → returns { token }

- GET /api/reports — list reports (auth)

- POST /api/reports — create report (auth, multipart/form-data: fields + photo/image)

- GET /api/reports/:id — detail (auth)

- PATCH /api/reports/:id — update (auth; status change requires staff)

- DELETE /api/reports/:id — delete (owner or staff)
