import React, { useState, useContext } from "react";
import axios from "axios";
import { ResultContext } from "./ResultContext";

function PredictForm() {
  const [form, setForm] = useState({
    depth: 1.0,
    temp: 29.0,
    dosat: 112.0,
    ph: 7.6,
    cond: 402,
    salinity: 35.0,
    month: 6,
    hour: 14,
    day: 26,
  });

  const { setResult, setInputData, history, setHistory, result } = useContext(ResultContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/predict", form);
      const prediction = res.data;

      setResult(prediction);
      setInputData(form);

      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newEntry = {
        time: timestamp,
        temp: form.temp,
        ph: form.ph,
        salinity: form.salinity,
        predictedDO: prediction.predictedDO,
      };

      setHistory([...history, newEntry]);
    } catch (err) {
      console.error(err);
      setResult({ error: "Gagal memprediksi DO." });
    }
  };

  // Fungsi untuk memberi warna sesuai kualitas air
  const getQualityClass = (doValue) => {
    if (doValue >= 7) return "alert alert-success"; // Baik (hijau)
    if (doValue >= 5) return "alert alert-warning"; // Sedang (kuning)
    return "alert alert-danger";                    // Buruk (merah)
  };

  return (
    <div className="container p-4 bg-white rounded shadow mt-4">
      <h4 className="mb-4">🧪 Form Prediksi DO</h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Kolom kiri */}
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Kedalaman (m)</label>
              <input type="number" name="depth" value={form.depth} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">DO Saturasi (%)</label>
              <input type="number" name="dosat" value={form.dosat} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Kondusivitas (µS/cm)</label>
              <input type="number" name="cond" value={form.cond} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Bulan</label>
              <input type="number" name="month" value={form.month} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Tanggal</label>
              <input type="number" name="day" value={form.day} onChange={handleChange} className="form-control" />
            </div>
          </div>

          {/* Kolom kanan */}
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Suhu (°C)</label>
              <input type="number" name="temp" value={form.temp} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">pH</label>
              <input type="number" name="ph" value={form.ph} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Salinitas (ppt)</label>
              <input type="number" name="salinity" value={form.salinity} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Jam</label>
              <input type="number" name="hour" value={form.hour} onChange={handleChange} className="form-control" />
            </div>
          </div>
        </div>

        {/* Tombol Prediksi */}
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary px-5">
            🔮 Prediksi DO
          </button>
        </div>
      </form>

      {/* Jika terjadi error */}
      {result?.error && (
        <div className="mt-4 alert alert-danger">
          ⚠️ {result.error}
        </div>
      )}
    </div>
  );
}

export default PredictForm;
