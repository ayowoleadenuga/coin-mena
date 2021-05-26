import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { fetchProducts } from "./features/products/productSlice";
import store from "./store";
import './App.css'

store.dispatch(fetchProducts());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
