import { createSlice } from "@reduxjs/toolkit";

const loadClientesFromStorage = () => {
  const storedClientes = localStorage.getItem("clientes");
  return storedClientes ? JSON.parse(storedClientes) : [];
};

const clienteSlice = createSlice({
  name: "cliente",
  initialState: {
    clientes: loadClientesFromStorage(),
    searchTerm: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    addCliente: (state, action) => {
      state.clientes.push(action.payload);
      localStorage.setItem("clientes", JSON.stringify(state.clientes));
    },
  },
});

export const { setSearchTerm, addCliente } = clienteSlice.actions;
export default clienteSlice.reducer;
