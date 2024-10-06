import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/app/styles/index.scss";

import { App } from "./app/app";

createRoot(document.getElementById("root")! as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
