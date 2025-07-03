import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoPanel from "../components/InfoPanel";
import ControlPanel from "../components/ControlPanel";
import SensorCard from "../components/SensorCard";
import WaterChart from "../components/WaterChart";
import TelemetryTable from "../components/TelemetryTable";
import ControlChart from "../components/ControlChart";

function Dashboard() {
  const [bulkDataList, setBulkDataList] = useState([]);
  const [latestData, setLatestData] = useState(null);
  const [anomalyStatus, setAnomalyStatus] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("iot-anomaly");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/predict-bulk")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          const withDummy = data.map((item) => ({
            ...item,
            Salinity: item.Salinity ?? 33 + Math.random() * 4,
            Ammonia: item.Ammonia ?? 2 + Math.random(),
            WaterClarity: item.WaterClarity ?? 180 + Math.random() * 40,
          }));
          setBulkDataList(withDummy);
          setLatestData(withDummy[withDummy.length - 1]);
        }
      })
      .catch((err) => {
        console.error("Gagal fetch data:", err);
        setError("Gagal mengambil data dari server");
      });
  }, []);

  useEffect(() => {
    if (latestData?.Temp && latestData?.pH && latestData?.DO) {
      fetch("http://localhost:5000/detect-anomaly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          temp: latestData.Temp,
          pH: latestData.pH,
          DO: latestData.DO,
        }),
      })
        .then((res) => res.json())
        .then((data) => setAnomalyStatus(data))
        .catch((err) => {
          console.error("Gagal deteksi anomali:", err);
          setAnomalyStatus(null);
        });
    }
  }, [latestData]);

  const getSpark = (key) =>
    bulkDataList.slice(-10).map((d) => d[key]).filter((v) => typeof v === "number");

  return (
    <div className="container-fluid ps-md-5">
      <div className="row mb-3">
        <div className="col-12 text-center">
          <h3 className="fw-bold">🌊 Real-Time Water Quality Dashboard (Kolam 1)</h3>
        </div>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* Info Panel + Prediksi DO */}
      <div className="row mb-4">
        <div className="col-md-4">
          <InfoPanel />
          {typeof latestData?.predicted_DO === "number" && (
            <div className="alert alert-info mt-3">
              <strong>Prediksi DO:</strong> {latestData.predicted_DO.toFixed(2)} mg/L
              <br />
              <span>{latestData.insight}</span>
            </div>
          )}
        </div>

        {/* Sensor & Status Cards */}
        <div className="col-md-8">
          <div className="row g-3">
            <SensorCard
              title="Water Conductivity"
              value={latestData?.Cond?.toFixed(2) || "-"}
              unit="µS/cm"
              sparkData={getSpark("Cond")}
            />
            <SensorCard
              title="DO Saturation"
              value={latestData?.DOsat?.toFixed(2) || "-"}
              unit="%"
              sparkData={getSpark("DOsat")}
            />
            <SensorCard
              title="Temperature"
              value={latestData?.Temp?.toFixed(2) || "-"}
              unit="°C"
              sparkData={getSpark("Temp")}
            />
            <SensorCard
              title="pH"
              value={latestData?.pH?.toFixed(2) || "-"}
              sparkData={getSpark("pH")}
            />
            <SensorCard
              title="Depth"
              value={latestData?.Depth?.toFixed(2) || "-"}
              unit="m"
              sparkData={getSpark("Depth")}
            />
            <SensorCard
              title="Salinity"
              value={latestData?.Salinity?.toFixed(2) || "-"}
              unit="PSU"
              sparkData={getSpark("Salinity")}
            />
            <SensorCard
              title="Ammonia"
              value={latestData?.Ammonia?.toFixed(2) || "-"}
              unit="mg/L"
              sparkData={getSpark("Ammonia")}
            />
            <SensorCard
              title="Water Clarity"
              value={latestData?.WaterClarity?.toFixed(2) || "-"}
              unit="NTU"
              sparkData={getSpark("WaterClarity")}
            />
          </div>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="btn-group w-100 mb-4" role="group">
        <button
          className={`btn ${activeTab === "iot-anomaly" ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => setActiveTab("iot-anomaly")}
        >
          IoT – Anomaly Sensor
        </button>
        <button
          className={`btn ${activeTab === "do-saturation" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setActiveTab("do-saturation")}
        >
          AI – DO Saturation Predict
        </button>
        <button className="btn btn-outline-secondary" disabled>
          AI – Salinity Predict
        </button>
        <button className="btn btn-outline-secondary" disabled>
          AI – Ammonia Predict
        </button>
        <button className="btn btn-outline-secondary" disabled>
          AI – Water Clarity Predict
        </button>
        <button className="btn btn-outline-secondary" disabled>
          AI – PH Predict
        </button>
      </div>

      {/* IoT – Failure Sensor Tab */}
      {activeTab === "iot-anomaly" && (
      <>
        <div className="row mb-4">
          <div className="col-12">
            <h5 className="fw-bold">📊 Failure DO Saturation</h5>
            <ControlChart data={bulkDataList} field="DOsat" upperLimit={110} lowerLimit={80} />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12">
            <h5 className="fw-bold">🌊 Failure Salinity</h5>
            <ControlChart data={bulkDataList} field="Salinity" upperLimit={38} lowerLimit={30} />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12">
            <h5 className="fw-bold">🧪 Failure Ammonia</h5>
            <ControlChart data={bulkDataList} field="Ammonia" upperLimit={5} lowerLimit={0} />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12">
            <h5 className="fw-bold">💧 Failure Water Clarity</h5>
            <ControlChart data={bulkDataList} field="WaterClarity" upperLimit={400} lowerLimit={100} />
          </div>
        </div>
      </>
    )}


      {/* AI – DO Saturation Predict Tab */}
      {activeTab === "do-saturation" && (
        <>
          <div className="row mb-4">
            <ControlPanel latestData={latestData} />
          </div>
          <div className="row mb-4">
            <div className="col-12">
              <h5 className="fw-bold">📈 Grafik Kualitas Air</h5>
              <WaterChart data={bulkDataList} />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12">
              <TelemetryTable data={bulkDataList} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
