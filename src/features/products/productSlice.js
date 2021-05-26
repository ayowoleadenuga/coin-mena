import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import data from "../../productData.json";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const products = data.slice();
  return products;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    productUpdated(state, action) {
      const { id, product_name, weight, availability, isEditable, url, price_tier, price_range } = action.payload;
      const existingProduct = state.entities.find((product) => product._id === id);
      if (existingProduct) {
        existingProduct.product_name = product_name;
        existingProduct.weight = weight;
        existingProduct.availability = availability;
        existingProduct.isEditable = isEditable;
        existingProduct.price_range = price_range;
        existingProduct.price_tier = price_tier;
        existingProduct.url = url;
        existingProduct._id = id;
      }
    }

  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { productUpdated } = productSlice.actions;

export default productSlice.reducer;
