// store/reducers/produtoReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { cadastrarProduto, setSearchTermProduto } from "../actions/produtoActions";

const loadProdutosFromStorage = () => {
  const storedProdutos = localStorage.getItem("produtos");
  return storedProdutos ? JSON.parse(storedProdutos) : [];
};

const produtoSlice = createSlice({
  name: "produto",
  initialState: {
    produtos: loadProdutosFromStorage(),
    searchTerm: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cadastrarProduto, (state, action) => {
        state.produtos.push(action.payload);
        localStorage.setItem("produtos", JSON.stringify(state.produtos));
      })
      .addCase(setSearchTermProduto, (state, action) => {
        state.searchTerm = action.payload;
      });
  },
});

export default produtoSlice.reducer;
