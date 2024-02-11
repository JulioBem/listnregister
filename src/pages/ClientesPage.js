// pages/ClientesPage.js
import React, { useState } from "react";
import FormularioCadastro from "../components/FormularioCadastro";
import ListaClientes from "../components/ListaClientes";
import SearchBar from "../components/SearchBar";
import styled from "styled-components";
import NavBar from "../components/NavBar";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
`;

const ClientesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const setClientes = (updatedClientes) => {
    // Implemente conforme necessário
  };

  return (
    <PageContainer>
      <NavBar />

      <SearchBar creationTarget={"Cliente"} openModal={openModal} />
      <ListaClientes />
      <FormularioCadastro
        isOpen={isModalOpen}
        closeModal={closeModal}
        setClientes={setClientes}
      />
    </PageContainer>
  );
};

export default ClientesPage;
