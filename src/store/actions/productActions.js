import { createAction } from "@reduxjs/toolkit";

export const registerProduct = createAction("product/REGISTER_PRODUCT");
export const setSearchTermProduct = createAction(
  "product/SET_SEARCH_TERM_PRODUCT"
);
