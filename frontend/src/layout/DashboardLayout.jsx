import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      {/* <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} /> */}

      {/* Main Content Area */}
      <div className="flex-grow-1">
        {/* <Navbar setSidebarOpen={setIsSidebarOpen} /> */}
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
