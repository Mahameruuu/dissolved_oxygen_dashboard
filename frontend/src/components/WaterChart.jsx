import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function WaterChart({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-muted text-center">⏳ Grafik belum tersedia.</p>;
  }

  const chartData = data.slice(-100).map((d) => {
    const waktu = new Date(d["Date.Time"]).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return {
      waktu,
      Temperature: d?.Temp ?? null,
      pH: d?.pH ?? null,
      DO: d?.predicted_DO ?? null,
    };
  });

  return (
    <div>
      <h5 className="text-center">📊 Grafik Kualitas Air</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="waktu" />
          <YAxis
            label={{
              value: "Nilai Parameter",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Temperature"
            stroke="#e74c3c"
            name="Temperature (°C)"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="pH"
            stroke="#f1c40f"
            name="pH"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="DO"
            stroke="#2980b9"
            name="DO (mg/L)"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WaterChart;
