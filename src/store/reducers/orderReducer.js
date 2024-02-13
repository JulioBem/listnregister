import { createSlice } from "@reduxjs/toolkit";
import { registerOrder, setSearchTermOrder } from "../actions/orderActions";

const loadOrdersFromStorage = () => {
  const storedOrders = localStorage.getItem("orders");
  return storedOrders ? JSON.parse(storedOrders) : [];
};

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: loadOrdersFromStorage(),
    searchTermOrder: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerOrder, (state, action) => {
        state.orders.push(action.payload);
        localStorage.setItem("orders", JSON.stringify(state.orders));
      })
      .addCase(setSearchTermOrder, (state, action) => {
        state.searchTermOrder = action.payload;
      });
  },
});

export default orderSlice.reducer;
