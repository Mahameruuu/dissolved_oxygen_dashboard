import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

function ControlChart({ data, field, upperLimit, lowerLimit }) {
  return (
    <div className="card shadow p-3 mb-4">
      <h5 className="fw-bold text-center">{field} Sensor Control Chart</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date.Time" hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={field} stroke="#0d6efd" dot={false} />
          <ReferenceLine y={upperLimit} stroke="red" strokeDasharray="3 3" label="Upper Limit" />
          <ReferenceLine y={lowerLimit} stroke="red" strokeDasharray="3 3" label="Lower Limit" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ControlChart;