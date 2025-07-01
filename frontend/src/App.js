import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from "./pages/Dashboard";
import Predict from "./pages/Predict";
import About from "./pages/About";
import AnomalyDetail from "./pages/AnomalyDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/predict"
          element={
            <DashboardLayout>
              <Predict />
            </DashboardLayout>
          }
        />
        <Route
          path="/about"
          element={
            <DashboardLayout>
              <About />
            </DashboardLayout>
          }
        />
        <Route
          path="/anomaly-detail"
          element={
            <DashboardLayout>
              <AnomalyDetail />
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
