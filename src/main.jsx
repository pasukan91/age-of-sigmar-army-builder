import ReactDOM from "react-dom/client";

import App from "./App";
import PwaControls from "./components/PwaControls";
import { initializePwa } from "./pwa/pwaClient";

import "./styles/global.css";
import "./styles/aos-app.css";

initializePwa();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <PwaControls />
  </>
);
