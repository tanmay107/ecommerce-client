import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import reducer, { initialState } from "./Context/reducer";
import { StateProvider } from "./Context/StateProvider";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <StateProvider initialState = {initialState} reducer = {reducer}>
      <App />
    </StateProvider>
  </StrictMode>
);
