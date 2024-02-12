// store/reducers/pedidoReducer.js
import { createSlice } from "@reduxjs/toolkit";
import {
  cadastrarPedido,
  setSearchTermPedido,
  adicionarProdutoAoPedido,
} from "../actions/pedidoActions";

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
      })
      .addCase(adicionarProdutoAoPedido, (state, action) => {
        const { pedidoId, produto } = action.payload;

        const pedidoExistente = state.pedidos.find(
          (pedido) => pedido.id === pedidoId
        );

        if (pedidoExistente) {
          const produtoExistente = pedidoExistente.produtos.find(
            (p) => p.id === produto.id
          );

          if (produtoExistente) {
            produtoExistente.quantidade += produto.quantidade;
          } else {
            pedidoExistente.produtos.push(produto);
          }
          localStorage.setItem("pedidos", JSON.stringify(state.pedidos));
        }
      });
  },
});

export default pedidoSlice.reducer;
