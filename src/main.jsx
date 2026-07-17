import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ArmyProvider } from "./context/ArmyContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ArmyProvider>
    <App />
  </ArmyProvider>
);