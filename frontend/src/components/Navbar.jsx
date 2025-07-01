import React from "react";
import { FaBars } from "react-icons/fa";

function Navbar({ setSidebarOpen }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4 py-2 shadow-sm">
      <div className="container-fluid">
        {/* Tombol toggle di mobile */}
        <button
          className="btn btn-outline-primary d-md-none me-2"
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          <FaBars />
        </button>

        <span className="navbar-brand fw-bold text-primary">🌐 Dashboard Admin</span>
        <div className="ms-auto d-flex align-items-center">
          <span className="me-3">👤 Admin</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
