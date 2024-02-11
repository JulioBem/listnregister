// clientereducer.js
import { createSlice } from "@reduxjs/toolkit";
import { cadastrarCliente, setSearchTerm } from "../actions/clienteActions";

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cadastrarCliente, (state, action) => {
        state.clientes.push(action.payload);
        localStorage.setItem("clientes", JSON.stringify(state.clientes));
      })
      .addCase(setSearchTerm, (state, action) => {
        state.searchTerm = action.payload;
      });
  },
});

export default clienteSlice.reducer;
