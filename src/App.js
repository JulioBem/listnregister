// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import ClientesPage from "./pages/ClientesPage";
import { Provider } from "react-redux";
import store from "./store/store";

// import OutraPagina from "./pages/OutraPagina";
// import MaisUmaPagina from "./pages/MaisUmaPagina";

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Router>
        <Routes>
          {/* <Route path="/outra-pagina" element={<OutraPagina />} />
          <Route path="/mais-uma-pagina" element={<MaisUmaPagina />} /> */}
          <Route path="/" element={<ClientesPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
