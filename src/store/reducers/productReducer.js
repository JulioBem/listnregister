import { createSlice } from "@reduxjs/toolkit";
import {
  registerProduct,
  setSearchTermProduct,
} from "../actions/productActions";

const loadProductsFromStorage = () => {
  const storedProducts = localStorage.getItem("products");
  return storedProducts ? JSON.parse(storedProducts) : [];
};

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: loadProductsFromStorage(),
    searchTermProduct: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerProduct, (state, action) => {
        state.products.push(action.payload);
        localStorage.setItem("products", JSON.stringify(state.products));
      })
      .addCase(setSearchTermProduct, (state, action) => {
        state.searchTermProduct = action.payload;
      });
  },
});

export default productSlice.reducer;
