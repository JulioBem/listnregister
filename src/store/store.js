// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import clienteReducer from "./reducers/clienteReducer";
import pedidoReducer from "./reducers/pedidoReducer";
import produtoReducer from "./reducers/produtoReducer";

const store = configureStore({
  reducer: {
    cliente: clienteReducer,
    pedido: pedidoReducer,
    produto: produtoReducer,
  },
});

export default store;
