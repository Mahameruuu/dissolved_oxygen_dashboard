import React, { useContext } from "react";
import { ResultContext } from "./ResultContext";

function InfoPanel() {
  const { pondInfo } = useContext(ResultContext);

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5 className="fw-bold">BARAMULTI</h5>
        <p className="mb-1"><strong>Pond Name:</strong> {pondInfo.name}</p>
        <p className="mb-1"><strong>Shrimp Species:</strong> {pondInfo.species} 🦐</p>
        <p className="mb-1"><strong>Stocking Age:</strong> {pondInfo.age} days</p>
        <p className="mb-1"><strong>Population:</strong> {pondInfo.population.toLocaleString()} shrimp</p>
        <p className="mb-1">
          <strong>Connection:</strong>{" "}
          <span className={`badge ${pondInfo.connection ? "bg-success" : "bg-danger"}`}>
            {pondInfo.connection ? "Online" : "Offline"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default InfoPanel;
