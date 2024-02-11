// store/reducers/pedidoReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { cadastrarPedido, setSearchTermPedido } from "../actions/pedidoActions";

const loadPedidosFromStorage = () => {
  const storedPedidos = localStorage.getItem("pedidos");
  return storedPedidos ? JSON.parse(storedPedidos) : [];
};

const pedidoSlice = createSlice({
  name: "pedido",
  initialState: {
    pedidos: loadPedidosFromStorage(),
    searchTerm: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cadastrarPedido, (state, action) => {
        state.pedidos.push(action.payload);
        localStorage.setItem("pedidos", JSON.stringify(state.pedidos));
      })
      .addCase(setSearchTermPedido, (state, action) => {
        state.searchTerm = action.payload;
      });
  },
});

export default pedidoSlice.reducer;
