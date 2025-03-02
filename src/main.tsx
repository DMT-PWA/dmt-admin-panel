import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "src/app/index.css";
import AppRouter from "src/app/routes.tsx";

const container = document.querySelector("#root") as HTMLElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
