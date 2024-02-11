export const cadastrarCliente = (cliente) => {
  return {
    type: "CADASTRAR_CLIENTE",
    payload: cliente,
  };
};

export const setSearchTerm = (term) => ({
  type: "SET_SEARCH_TERM",
  payload: term,
});
