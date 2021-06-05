import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { ConfigProvider } from "antd";
import es_ES from "antd/lib/locale/es_ES";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={es_ES}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
