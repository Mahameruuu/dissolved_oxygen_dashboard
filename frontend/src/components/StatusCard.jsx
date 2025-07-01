import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const StatusCard = ({ title, value, unit, bg = "light", color = "dark" }) => {
  return (
    <div className={`card text-${color} bg-${bg} mb-3 shadow-sm`} style={{ minWidth: "140px" }}>
      <div className="card-body">
        <h6 className="card-title text-uppercase small fw-bold mb-1">{title}</h6>
        <h4 className="card-text">
          {value} <small>{unit}</small>
        </h4>
      </div>
    </div>
  );
};

export default StatusCard;
