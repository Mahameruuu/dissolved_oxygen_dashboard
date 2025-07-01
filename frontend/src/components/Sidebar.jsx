import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: "🏠" },
    { path: "/predict", label: "Input Prediksi", icon: "🧪" },
    { path: "/about", label: "Tentang", icon: "ℹ️" },
  ];

  return (
    <>
      <div
        className={`bg-light border-end vh-100 p-3 d-flex flex-column position-fixed top-0 start-0 ${
          isOpen ? "d-block" : "d-none"
        } d-md-flex`}
        style={{ width: "250px", zIndex: 1050 }}
      >
        {/* Tombol close khusus mobile */}
        <div className="d-md-none text-end mb-2">
          <button className="btn-close" onClick={() => setIsOpen(false)} />
        </div>

        <h4 className="fw-bold text-primary mb-4">🌊 DO Dashboard</h4>
        <ul className="nav nav-pills flex-column">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item mb-2">
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center ${
                  location.pathname === item.path ? "active" : "text-dark"
                }`}
                onClick={() => setIsOpen(false)} // close after click (mobile)
              >
                <span className="me-2">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-3 small text-muted">
          <hr />
          <p className="mb-0">© 2025 X-Camp Team</p>
        </div>
      </div>

      {/* Spacer di desktop supaya konten tidak tertutup */}
      <div className="d-none d-md-block" style={{ width: "250px" }}></div>
    </>
  );
}

export default Sidebar;
