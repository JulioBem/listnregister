import React, { useState } from "react";
import FormularioCadastroProduto from "../components/FormularioCadastroProduto";
import ListaProdutos from "../components/ListaProdutos";
import SearchBar from "../components/SearchBar";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import ProductInfoModal from "../components/ProductInfoModal";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
`;

const ProductsPage = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isProductInfoModalOpen, setIsProductInfoModalOpen] = useState(false);
  const [currentProductView, setCurrentProductView] = useState({});

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const openProductInfoModal = (produto) => {
    setCurrentProductView(produto);
    setIsProductInfoModalOpen(true);
  };

  const closeProductInfoModal = () => {
    setIsProductInfoModalOpen(false);
  };

  return (
    <PageContainer>
      <NavBar />

      <SearchBar creationTarget={"Produto"} openModal={openRegisterModal} />
      <ListaProdutos
        openModal={openProductInfoModal}
        closeModal={closeProductInfoModal}
        isOpen={isProductInfoModalOpen}
      />
      <FormularioCadastroProduto
        isOpen={isRegisterModalOpen}
        closeModal={closeRegisterModal}
      />
      <ProductInfoModal
        isOpen={isProductInfoModalOpen}
        closeModal={closeProductInfoModal}
        product={currentProductView}
      />
    </PageContainer>
  );
};

export default ProductsPage;
