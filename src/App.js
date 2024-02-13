import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import ClientsPage from "./pages/ClientsPage";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import { Provider } from "react-redux";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/pedidos" element={<OrdersPage />} />
          <Route path="/clientes" element={<ClientsPage />} />
          <Route path="/" element={<Navigate to="/clientes" />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
