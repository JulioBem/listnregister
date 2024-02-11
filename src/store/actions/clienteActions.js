// actions/clienteActions.js
import { createAction } from "@reduxjs/toolkit";

export const cadastrarCliente = createAction("cliente/CADASTRAR_CLIENTE");
export const setSearchTerm = createAction("cliente/SET_SEARCH_TERM");
