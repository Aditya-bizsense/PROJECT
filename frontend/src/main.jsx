import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Correct import for React 18
import { Provider } from "react-redux";
import store from "./components/redux/store.js";
import App from "./App.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ React 18 syntax
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
