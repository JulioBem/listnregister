// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import clienteReducer from "./reducers/clienteReducer";
import pedidoReducer from "./reducers/pedidoReducer";

const store = configureStore({
  reducer: {
    cliente: clienteReducer,
    pedido: pedidoReducer,
    // Adicione outros reducers conforme necessário
  },
});

export default store;
