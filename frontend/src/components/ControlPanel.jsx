import React from "react";

function ControlPanel({ latestData }) {
  const predictedDO = latestData?.predicted_DO ?? null;
  const doStatus =
    predictedDO !== null
      ? predictedDO < 4
        ? "danger"
        : predictedDO < 6
        ? "warning"
        : "safe"
      : null;

  const alarmMessage = {
    safe: "✅ DO optimal – tidak ada alarm",
    warning: "⚠️ DO sedang – pantau kondisi air",
    danger: "🚨 DO rendah – aktifkan aerator!",
  };

  const buttonClass = {
    safe: "btn btn-secondary",
    warning: "btn btn-warning",
    danger: "btn btn-danger",
  };

  const metrics = [
    { label: "Wireless Smart Aquatic Controller", value: "✅ Terhubung" },
    { label: "Smart Fertigation System Wired Decoder", value: "✅ Aktif" },
    {
      label: "Water pH & Temp Sensor",
      value:
        latestData?.pH && latestData?.Temp
          ? `pH: ${latestData.pH.toFixed(1)} (${latestData.pH >= 6.5 && latestData.pH <= 8.5 ? "Baik" : "Buruk"}), Temp: ${latestData.Temp.toFixed(1)}°C`
          : "-",
    },
    {
      label: "Water Conductivity",
      value: latestData?.Cond
        ? `${latestData.Cond.toFixed(1)} µS/cm (${latestData.Cond < 1000 ? "Normal" : "Tinggi"})`
        : "-",
    },
    {
      label: "Water DO Sensor",
      value: latestData?.DO
        ? `${latestData.DO.toFixed(2)} mg/L (${latestData.DO >= 6 ? "Baik" : latestData.DO >= 4 ? "Cukup" : "Rendah"})`
        : "-",
    },
    {
      label: "Water NH3 & N2 Sensor",
      value: latestData?.Ammonia
        ? `${latestData.Ammonia.toFixed(2)} mg/L (${latestData.Ammonia < 1.5 ? "Aman" : "Berbahaya"})`
        : "-",
    },
    {
      label: "Water Salinity Sensor",
      value: latestData?.Salinity
        ? `${latestData.Salinity.toFixed(1)} PSU (${latestData.Salinity >= 30 && latestData.Salinity <= 38 ? "Normal" : "Tidak Normal"})`
        : "-",
    },
    {
      label: "Water Turbidity Sensor",
      value: latestData?.WaterClarity
        ? `${latestData.WaterClarity.toFixed(0)} NTU (${latestData.WaterClarity < 300 ? "Jernih" : "Keruh"})`
        : "-",
    },
    { label: "Aerator Type", value: "Paddlewheel" },
    { label: "Electric Power Monitoring", value: "⚡ Normal (230V / 50Hz)" },
    { label: "Water Supply Monitoring", value: "💧 Normal" },
  ];


  return (
    <div className="col-12">
      <div className="row g-2">
        {/* Tombol Paddlewheel */}
        <div className="col-md-4 col-sm-6">
          <button
            className={`${buttonClass[doStatus] || "btn btn-secondary"} w-100`}
            style={{ padding: "0.5rem 0.75rem", fontSize: "0.85rem" }}
            disabled={doStatus !== "danger"}
          >
            🧭 Paddlewheel
          </button>
        </div>

        {/* Alarm Box */}
        <div className="col-md-4 col-sm-6">
          <div
            className="border rounded d-flex align-items-center justify-content-center w-100 h-100"
            style={{
              padding: "0.5rem",
              fontSize: "0.85rem",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <span
              className={
                doStatus === "danger"
                  ? "text-danger"
                  : doStatus === "warning"
                  ? "text-warning"
                  : "text-success"
              }
            >
              {alarmMessage[doStatus] || "⏳ Menunggu data..."}
            </span>
          </div>
        </div>

        {/* Tombol Water Pump */}
        <div className="col-md-4 col-sm-6">
          <button
            className={`${buttonClass[doStatus] || "btn btn-secondary"} w-100`}
            style={{ padding: "0.5rem 0.75rem", fontSize: "0.85rem" }}
            disabled={doStatus !== "danger"}
          >
            💧 Water Pump
          </button>
        </div>

        {/* Sensor Metrics */}
        {metrics.map((item, index) => (
          <div key={index} className="col-md-3 col-sm-6">
            <div
              className="border rounded p-2 bg-light text-center h-100"
              style={{
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                fontSize: "0.75rem",
                fontWeight: "500",
                lineHeight: "1.2rem",
              }}
            >
              <div className="text-muted">{item.label}</div>
              <div className="fw-bold">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ControlPanel;
