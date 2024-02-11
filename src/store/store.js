// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import clienteReducer from "./reducers/clienteReducer";

const store = configureStore({
  reducer: {
    cliente: clienteReducer,
    // Adicione outros reducers conforme necessário
  },
});

export default store;
