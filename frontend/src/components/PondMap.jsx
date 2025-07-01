// File: components/PondMap.js
import React, { useEffect } from "react";

function PondMap({ anomalyStatus = {}, onSelectKolam }) {
  useEffect(() => {
    Object.entries(anomalyStatus).forEach(([kolamId, status]) => {
      const el = document.getElementById(kolamId);
      if (el) {
        el.classList.remove("anomaly", "inactive");
        if (status === "anomaly") {
          el.classList.add("anomaly");
        } else if (status === "inactive") {
          el.classList.add("inactive");
        }
      }
    });
  }, [anomalyStatus]);

  const handleClick = (e) => {
    const id = e.target.id;
    if (id?.startsWith("kolam-")) {
      onSelectKolam?.(id);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflowX: "auto" }}>
      <svg
        viewBox="0 0 3320 2480"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleClick}
        style={{ width: "100%", height: "auto", cursor: "pointer" }}
      >
        <style>
          {`
            @keyframes colorChange {
              0%{fill:#e0c4bf}
              50%{fill:#e6816f}
              100%{fill: #e0c4bf}
            }
            .tanah { fill: #7B6862 }
            .kolam { fill: #CCE7D4; transition: .2s; stroke: #BDBFC1; stroke-width: 0px; }
            .kolam:hover { fill: #b9ecc8; stroke-width: 12px; }
            .kolam.anomaly { fill: #e0c4bf; animation: colorChange 1s infinite; }
            .kolam.anomaly:hover { fill: #e6816f; animation: none; }
            .kolam.inactive { fill: #E6E7E8 !important; }
            .kolam.inactive:hover { fill: #E6E7E8 !important; stroke-width: 0px; }
          `}
        </style>

        {/* Area tanah */}
        <path
          className="tanah"
          d="M 2847.93 1569.33 l -33.32 72.51 ... (panjang, tetap saja di-copy semua)"
        />

        {/* Kolam - ini contoh 3 saja, copy semua jika perlu */}
        <rect id="kolam-01" className="kolam anomaly" transform="matrix(...)" width="217.4" height="250.34" />
        <rect id="kolam-02" className="kolam" transform="matrix(...)" width="217.4" height="250.34" />
        <rect id="kolam-03" className="kolam" transform="matrix(...)" width="217.4" height="250.34" />

        {/* Logo atau elemen lain boleh ditambahkan */}
      </svg>
    </div>
  );
}

export default PondMap;
