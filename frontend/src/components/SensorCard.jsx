import React from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

function SensorCard({ title, value, unit, sparkData = [] }) {
  return (
    <div className="col-md-3">
      <div className="card shadow-sm p-3">
        <h6 className="text-muted mb-1">{title}</h6>
        <h4 className="fw-bold">
          {value} <small>{unit}</small>
        </h4>
        {sparkData.length > 0 ? (
          <Sparklines data={sparkData} limit={10} height={40}>
            <SparklinesLine color="blue" />
          </Sparklines>
        ) : (
          <div style={{ height: "40px", backgroundColor: "#f8f9fa" }}>
            <small className="text-muted d-block text-center mt-2">No Data</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default SensorCard;
