// actions/produtoActions.js
import { createAction } from "@reduxjs/toolkit";

export const cadastrarProduto = createAction("produto/CADASTRAR_PRODUTO");
export const setSearchTermProduto = createAction(
  "produto/SET_SEARCH_TERM_PRODUTO"
);
