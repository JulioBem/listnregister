import { createSlice } from "@reduxjs/toolkit";
import { registerClient, setSearchTermClient } from "../actions/clientActions";

const loadClientsFromStorage = () => {
  const storedClients = localStorage.getItem("clients");
  return storedClients ? JSON.parse(storedClients) : [];
};

const clientSlice = createSlice({
  name: "client",
  initialState: {
    clients: loadClientsFromStorage(),
    searchTermClient: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerClient, (state, action) => {
        state.clients.push(action.payload);
        localStorage.setItem("clients", JSON.stringify(state.clients));
      })
      .addCase(setSearchTermClient, (state, action) => {
        state.searchTermClient = action.payload;
      });
  },
});

export default clientSlice.reducer;
