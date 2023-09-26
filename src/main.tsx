import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppStoreProvider from "./redux/services/provider.tsx";
import NavBar from "./components/Navbar.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/services/store.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <NavBar />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
