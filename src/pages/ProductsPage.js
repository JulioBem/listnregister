import React, { useState } from "react";
import SearchBar from "../components/common/SearchBar";
import styled from "styled-components";
import NavBar from "../components/common/NavBar";
import ProductInfoModal from "../components/product/ProductInfoModal";
import ProductList from "../components/product/ProductList";
import FormRegisterProduct from "../components/product/FormRegisterProduct";

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

  const openProductInfoModal = (product) => {
    setCurrentProductView(product);
    setIsProductInfoModalOpen(true);
  };

  const closeProductInfoModal = () => {
    setIsProductInfoModalOpen(false);
  };

  return (
    <PageContainer>
      <NavBar />

      <SearchBar creationTarget={"Produto"} openModal={openRegisterModal} />
      <ProductList
        openModal={openProductInfoModal}
        closeModal={closeProductInfoModal}
        isOpen={isProductInfoModalOpen}
      />
      <FormRegisterProduct
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
