import React from "react";
import ReactDOM from "react-dom";

// Local Imports
import registerServiceWorker from "./registerServiceWorker";

// Components
import { AuthProvider } from "./AuthContext";
import App from "./App";

// Styles
import "./index.css";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
registerServiceWorker();
