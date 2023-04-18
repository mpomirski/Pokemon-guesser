import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import PokeGuesser from "./components/PokeGuesser";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <PokeGuesser />
  </React.StrictMode>
);

// reportWebVitals(console.log);
