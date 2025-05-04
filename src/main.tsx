import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx"; // Import ErrorBoundary
import "./styles/main.css";
import "react-awesome-button/dist/styles.css"; // Import AwesomeButton styles

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* Removed the empty string literal */}
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
