import React, { useState } from "react";
import SearchBar from "../components/common/SearchBar";
import FormRegisterClient from "../components/client/FormRegisterClient";
import ClientInfoModal from "../components/client/ClientInfoModal";
import styled from "styled-components";
import NavBar from "../components/common/NavBar";
import ClientList from "../components/client/ClientList";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
`;

const ClientsPage = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isClientInfoModalOpen, setIsClientInfoModalOpen] = useState(false);
  const [currentClientView, setCurrentClientView] = useState({});

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const openClientInfoModal = (client) => {
    setCurrentClientView(client);
    setIsClientInfoModalOpen(true);
  };

  const closeClientInfoModal = () => {
    setIsClientInfoModalOpen(false);
  };

  return (
    <PageContainer>
      <NavBar />

      <SearchBar creationTarget={"Cliente"} openModal={openRegisterModal} />
      <ClientList
        openModal={openClientInfoModal}
        closeModal={closeClientInfoModal}
        isOpen={isClientInfoModalOpen}
      />
      <FormRegisterClient
        isOpen={isRegisterModalOpen}
        closeModal={closeRegisterModal}
      />
      <ClientInfoModal
        isOpen={isClientInfoModalOpen}
        closeModal={closeClientInfoModal}
        client={currentClientView}
      />
    </PageContainer>
  );
};

export default ClientsPage;
