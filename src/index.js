import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./Context/ErrorBoundary";

import { ThemeProvider } from "@mui/material";
import { theme } from "./helpers/theme";
import { ModalProvider } from "./Context/ModalProvider";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <ErrorBoundary fallback={"something wrong"}>
            <PersistGate loading={"loading"} persistor={persistor}>
              <ModalProvider>
                <App />
              </ModalProvider>
            </PersistGate>
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
