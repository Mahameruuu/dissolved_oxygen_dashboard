# 💧 Sistem Monitoring dan Prediksi Dissolved Oxygen (DO) Kolam Tambak

Proyek ini merupakan aplikasi berbasis web yang digunakan untuk memonitor kualitas air secara real-time dan mendeteksi anomali nilai DO (Dissolved Oxygen) pada kolam tambak. Aplikasi ini juga memberikan prediksi nilai DO menggunakan model Machine Learning.

## 📁 Struktur Repositori

```text
dissolved_oxygen_dashboard/
├── backend/
│ ├── app.py
│ ├── model/
│ │ ├── do_model.pkl (tidak diunggah ke GitHub)
│ ├── utils/
│ └── ...
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ └── pages/
│ └── ...
└── README.md
```
---

## 🧠 Project Overview

### 💡 Latar Belakang

Nilai Dissolved Oxygen (DO) merupakan indikator penting dalam kualitas air tambak. Kadar DO yang rendah bisa menyebabkan stres atau kematian pada ikan dan udang. Maka dari itu, diperlukan sistem yang mampu:
- Memantau nilai DO secara **real-time**
- Memberikan **prediksi DO** beberapa waktu ke depan
- Mendeteksi **anomali** dari nilai-nilai sensor seperti DO, suhu, pH, salinitas, dan lainnya

### 🎯 Tujuan

- Menyediakan antarmuka yang informatif untuk petani tambak.
- Mengintegrasikan model Machine Learning ke dalam dashboard.
- Menggunakan visualisasi seperti **control chart** untuk membantu mendeteksi anomali.

---

## 📦 Model Machine Learning

### 🎓 Deskripsi Model

Model yang digunakan adalah **regresi** untuk memprediksi nilai DO. Model dilatih menggunakan data sensor dari tambak, meliputi:
- Suhu (Temperature)
- pH
- DO sebelumnya
- Kondisi lain seperti kedalaman, salinitas, dll

> Model disimpan di folder `backend/model/` namun **tidak diunggah ke GitHub** karena ukuran melebihi 100MB.

### 🔗 Link Model (Google Drive)

[📁 Download Model DO](https://drive.google.com/drive/folders/12oVVSQCa9g3nS01bdBQ7Fs8HGs6zxg10?usp=sharing)

---

## 💻 Cara Menjalankan Proyek

### 1. Clone Repository

```
git clone https://github.com/Mahameruuu/dissolved_oxygen_dashboard.git
cd dissolved_oxygen_dashboard
```

### 2. Jalankan Backend (Flask)

```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

# Jalankan Flask
```
python app.py
```

### 3. Jalankan Frontend (React)
cd ../frontend
```
npm install
npm run dev
Pastikan backend berjalan di http://localhost:5000 dan frontend di http://localhost:3000.
```

📊 Fitur Dashboard
Fitur	Keterangan
- 🔍 Prediksi DO	Menampilkan prediksi DO berdasarkan data sensor
- 🚨 Deteksi Anomali	Menggunakan control chart untuk deteksi outlier dari DO/pH/suhu/dll
- 💡 Insight	Menampilkan saran berdasarkan prediksi dan kondisi saat ini
- 📉 Grafik Real-time	Visualisasi waktu nyata dari nilai sensor
- 📋 Tabel Telemetri	Menampilkan seluruh data sensor dalam bentuk tabel

👨‍💻 Kontributor

Nama: Maha Meru
Role: Fullstack Developer & Machine Learning Engineer
GitHub: @Mahameruuu
