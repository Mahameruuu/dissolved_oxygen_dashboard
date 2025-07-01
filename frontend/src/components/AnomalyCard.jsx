import React from "react";

function AnomalyCard({ isAnomaly }) {
  const color = isAnomaly ? "danger" : "primary";
  const message = isAnomaly ? "🚨 Anomaly Detected" : "✅ Normal Condition";

  return (
    <div className={`card border-${color} text-${color} text-center mb-3 shadow`}>
      <div className={`card-body`}>
        <h5 className="card-title fw-bold">{message}</h5>
        <p className="card-text">Pond Condition based on PCA Detection</p>
      </div>
    </div>
  );
}

export default AnomalyCard;
