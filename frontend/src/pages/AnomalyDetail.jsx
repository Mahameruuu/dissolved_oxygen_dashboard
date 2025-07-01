import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ControlChart from "../components/ControlChart"; // pastikan path benar

function AnomalyDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.data || !state?.anomaly) {
    return (
      <div className="container mt-5">
        <h4 className="text-center">🚫 Data tidak tersedia</h4>
        <div className="text-center mt-3">
          <button onClick={() => navigate("/")} className="btn btn-primary">
            🔙 Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { data, anomaly } = state;

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">📈 Detail Anomali Kolam</h3>

      <div className="card p-4 mb-4 shadow-sm">
        <h5>📌 Informasi Sensor</h5>
        <ul>
          <li>🌡️ Suhu: {data.Temp} °C</li>
          <li>🧪 pH: {data.pH}</li>
          <li>💧 DO: {data.DO}</li>
          <li>📊 Prediksi DO: {data.predicted_DO?.toFixed(2)} mg/L</li>
          <li>🔍 Insight: {data.insight}</li>
          <li>
            🚨 Status Anomali:{" "}
            <strong className={anomaly.is_anomaly ? "text-danger" : "text-success"}>
              {anomaly.is_anomaly ? "Terdeteksi" : "Normal"}
            </strong>
          </li>
        </ul>
      </div>

      {/* Control chart */}
      <div className="mb-5">
        <h5 className="mb-3">📊 Grafik Kontrol DO</h5>
        <ControlChart
          data={state.bulkData?.slice(-200)}
          field="DO"
          upperLimit={7}
          lowerLimit={4}
        />
      </div>

      <div className="text-center">
        <button onClick={() => navigate("/")} className="btn btn-secondary">
          ⬅️ Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}

export default AnomalyDetail;
