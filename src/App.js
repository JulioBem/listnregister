// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import ClientesPage from "./pages/ClientesPage";
import OrdersPage from "./pages/OrdersPage";
import { Provider } from "react-redux";
import store from "./store/store";
import NavBar from "./components/NavBar";

// import OutraPagina from "./pages/OutraPagina";
// import MaisUmaPagina from "./pages/MaisUmaPagina";

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Router>
        <Routes>
          {/* <Route path="/outra-pagina" element={<OutraPagina />} /> */}
          <Route path="/pedidos" element={<OrdersPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/" element={<Navigate to="/clientes" />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
