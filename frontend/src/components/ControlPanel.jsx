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
    { label: "Wireless Smart Aquatic Controller", value: "Connected" },
    { label: "Smart Fertigation System Wired Decoder", value: "Active" },
    { label: "Water pH & Temp Sensor", value: "pH: 6.8, Temp: 27°C" },
    { label: "Water EC Sensor", value: "1.2 mS/cm" },
    { label: "Water TDS Sensor", value: "520 ppm" },
    { label: "Water COD Sensor", value: "35 mg/L" },
    { label: "Water DO Sensor", value: `${latestData?.DO?.toFixed(2) || "-"} mg/L` },
    { label: "Water NH3 & N2 Sensor", value: "1.8 mg/L" },
    { label: "Water Salinity Sensor", value: "35 PSU" },
    { label: "Water Turbidity Sensor", value: "208 NTU" },
    { label: "Aerator Type", value: "Paddlewheel" },
    { label: "Electric Power Monitoring", value: "230V / 50Hz" },
    { label: "Water Supply Monitoring", value: "Normal" },
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
