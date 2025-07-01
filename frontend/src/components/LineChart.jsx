import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { telemetryData } from "../data/dummyData";

const WaterChart = () => {
  return (
    <div className="card p-3 shadow-sm">
      <h6 className="fw-bold text-primary">📉 Grafik Kualitas Air</h6>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={telemetryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" hide />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="do" stroke="#8884d8" name="DO (mg/L)" />
          <Line type="monotone" dataKey="temp" stroke="#82ca9d" name="Temp (°C)" />
          <Line type="monotone" dataKey="ph" stroke="#ffc658" name="pH" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WaterChart;
