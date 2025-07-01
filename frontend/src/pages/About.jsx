import React from "react";

function About() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Kolom Kiri: Gambar Ilustrasi */}
        <div className="col-md-5 mb-4">
          <img
            src="/img/bg.jpg" // Pastikan file ini ada di public/img/
            alt="Ilustrasi DO"
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Kolom Kanan: Informasi */}
        <div className="col-md-7">
          <h2 className="mb-4 text-primary">ℹ️ Tentang Aplikasi</h2>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              {/* Tujuan */}
              <h5 className="card-title">🎯 Tujuan Sistem</h5>
              <p className="card-text">
                Aplikasi ini bertujuan untuk membantu petambak dalam
                <strong> memprediksi kadar Dissolved Oxygen (DO)</strong> di perairan tambak,
                agar kualitas air tetap optimal dan produktivitas tidak terganggu.
              </p>

              <hr />

              {/* Apa yang dilakukan */}
              <h5 className="card-title">🌊 Apa yang Dilakukan?</h5>
              <p className="card-text">
                Sistem ini menganalisis parameter lingkungan seperti suhu, pH, salinitas,
                dan waktu untuk memprediksi kadar DO serta memberikan peringatan jika kualitas air menurun.
              </p>

              <hr />

              {/* Manfaat */}
              <h5 className="card-title">📈 Manfaat Utama</h5>
              <ul className="mb-0">
                <li>Monitoring kualitas air secara berkala</li>
                <li>Prediksi DO real-time berbasis data lingkungan</li>
                <li>Pengambilan keputusan cepat saat kondisi kritis</li>
              </ul>
            </div>
          </div>

          <p className="text-muted mt-3">
            Didesain untuk mendukung pengelolaan tambak yang lebih cerdas dan berkelanjutan. 🌱
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
