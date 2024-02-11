import React, { useState } from "react";
import FormularioCadastroPedido from "../components/FormularioCadastroPedido";
import ListaPedidos from "../components/ListaPedidos";
import SearchBar from "../components/SearchBar";
import styled from "styled-components";
import NavBar from "../components/NavBar";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
`;

const ProductsPage = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <PageContainer>
      <NavBar />

      <SearchBar creationTarget={"Pedido"} openModal={openRegisterModal} />
      <ListaPedidos />
      <FormularioCadastroPedido
        isOpen={isRegisterModalOpen}
        closeModal={closeRegisterModal}
      />
    </PageContainer>
  );
};

export default ProductsPage;
