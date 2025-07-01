import React, { useState } from "react";

function TelemetryTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  if (!data || data.length === 0) {
    return <p className="text-muted text-center">⏳ Data telemetri belum tersedia.</p>;
  }

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="table-responsive">
      <h5 className="text-center">📋 Tabel Telemetri Prediksi DO</h5>

      <table className="table table-bordered table-striped table-sm">
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>Waktu</th>
            <th>DO Aktual</th>
            <th>DO Prediksi</th>
            <th>Status</th>
            <th>pH</th>
            <th>Temp (°C)</th>
            <th>Cond (µS/cm)</th>
            <th>Depth (m)</th>
            <th>DOsat (%)</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((d, i) => {
            const dateObj = new Date(d["Date.Time"]);
            const tanggal = dateObj.toLocaleDateString("id-ID");
            const waktu = dateObj.toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <tr key={i}>
                <td>{startIndex + i + 1}</td>
                <td>{tanggal}</td>
                <td>{waktu}</td>
                <td>{d?.DO?.toFixed?.(2) ?? "-"}</td>
                <td>{d?.predicted_DO?.toFixed?.(2) ?? "-"}</td>
                <td>{d?.insight ?? "-"}</td>
                <td>{d?.pH ?? "-"}</td>
                <td>{d?.Temp ?? "-"}</td>
                <td>{d?.Cond ?? "-"}</td>
                <td>{d?.Depth ?? "-"}</td>
                <td>{d?.DOsat ?? "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-2">
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          ⬅️ Sebelumnya
        </button>

        <span className="fw-semibold">
          Halaman {currentPage} dari {totalPages}
        </span>

        <button
          className="btn btn-sm btn-secondary"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Selanjutnya ➡️
        </button>
      </div>
    </div>
  );
}

export default TelemetryTable;
