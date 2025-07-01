import React, { useContext } from "react";
import { ResultContext } from "./ResultContext";

function ResultCard() {
  const { result } = useContext(ResultContext);

  if (!result) return null;

  const getCardClass = (doValue) => {
    if (doValue >= 7) return "bg-success text-white";
    if (doValue >= 5) return "bg-warning text-dark";
    return "bg-danger text-white";
  };

  return (
    <div className="mt-4">
      {result.error ? (
        <div className="alert alert-danger">
          ⚠️ {result.error}
        </div>
      ) : (
        <div className={`card ${getCardClass(result.predicted_DO)}`}>
          <div className="card-body">
            <h5 className="card-title">
              🔮 Hasil DO: {result.predicted_DO.toFixed(2)} mg/L
            </h5>
            <p className="card-text">{result.insight}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultCard;
