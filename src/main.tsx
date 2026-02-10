import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store.ts";
import App from "./App.tsx";
import "./assets/styles/index.css";
import { ThemeProvider } from "ponyo-ui";
import "ponyo-ui/dist/ponyo-ui.css";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CookiesProvider>
          <ThemeProvider>
            <Router>
              <App />
            </Router>
          </ThemeProvider>
        </CookiesProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
