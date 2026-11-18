import ReactDOM from "react-dom/client";

import App from "./App";
import AppErrorBoundary from "./components/AppErrorBoundary";
import { initializePwa } from "./pwa/pwaClient";

import "./styles/global.css";
import "./styles/aos-app.css";
import "./styles/ux.css";
import "./styles/official-app.css";

initializePwa();

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>
);
