// actions/pedidoActions.js
import { createAction } from "@reduxjs/toolkit";

export const cadastrarPedido = createAction("pedido/CADASTRAR_PEDIDO");
export const setSearchTermPedido = createAction(
  "pedido/SET_SEARCH_TERM_PEDIDO"
);