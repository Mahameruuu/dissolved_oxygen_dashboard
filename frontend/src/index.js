import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ResultProvider } from "./components/ResultContext";
import "./index.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ResultProvider>
      <App />
    </ResultProvider>
  </React.StrictMode>
);
