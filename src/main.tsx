import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-datepicker/dist/react-datepicker.css";
import "src/app/index.css";
import AppRouter from "src/app/routes.tsx";
import { store } from "./app/store/store";
import { Provider } from "react-redux";

const container = document.querySelector("#root") as HTMLElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StrictMode>
);
