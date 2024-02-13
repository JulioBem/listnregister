import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./reducers/clientReducer";
import orderReducer from "./reducers/orderReducer";
import productReducer from "./reducers/productReducer";

const store = configureStore({
  reducer: {
    client: clientReducer,
    order: orderReducer,
    product: productReducer,
  },
});

export default store;
