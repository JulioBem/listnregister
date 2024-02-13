import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../components/common/NavBar";
import SearchBar from "../components/common/SearchBar";
import OrderList from "../components/order/OrderList";
import FormRegisterOrder from "../components/order/FormRegisterOrder";

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
      <OrderList />
      <FormRegisterOrder
        isOpen={isRegisterModalOpen}
        closeModal={closeRegisterModal}
      />
    </PageContainer>
  );
};

export default ProductsPage;
