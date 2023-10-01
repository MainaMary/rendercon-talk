import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppStoreProvider from "./redux/services/provider.tsx";
import NavBar from "./components/Navbar.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppStoreProvider>
        <NavBar />
        <App />
      </AppStoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
