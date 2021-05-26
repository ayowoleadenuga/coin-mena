import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productSlice";

export default configureStore({
  reducer: {
    products: productsReducer
  },
});
