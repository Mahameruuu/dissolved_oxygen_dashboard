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
  ReferenceLine,
} from "recharts";

function WaterChart({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-muted text-center">⏳ Grafik belum tersedia.</p>;
  }

  const upperLimit = 8;
  const lowerLimit = 4;

  // Format data dengan label lengkap (tanggal + waktu)
  const chartData = data.slice(-100).map((d) => {
    const dateObj = new Date(d["Date.Time"]);
    const label = dateObj.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return {
      label,
      DO_Actual: d?.DO ?? null,
    };
  });

  return (
    <div>
      <h5 className="text-center">
        📊 Grafik DO Aktual (mg/L)
        <br />
        <small className="text-muted">
          {chartData[0]?.label} s/d {chartData[chartData.length - 1]?.label}
        </small>
      </h5>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="label" tick={{ fontSize: 10 }} interval={9} />
          <YAxis
            label={{
              value: "DO (mg/L)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip
            formatter={(value) => [`${value?.toFixed?.(2)} mg/L`, "DO Aktual"]}
            labelFormatter={(label) => `Waktu: ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="DO_Actual"
            stroke="#2ecc71"
            name="DO Aktual (mg/L)"
            dot={false}
          />
          <ReferenceLine y={upperLimit} label="Upper Limit" stroke="red" strokeDasharray="3 3" />
          <ReferenceLine y={lowerLimit} label="Lower Limit" stroke="red" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WaterChart;
