import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "@/app/store";
import "@/app/styles/index.scss";

import { App } from "./app/app";

createRoot(document.getElementById("root")! as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
