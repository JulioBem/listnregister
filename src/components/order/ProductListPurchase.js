import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ProductCardPurchase from "./ProductCardPurchase";
import SearchInput from "../common/SearchInput";

const ListaWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 19px;
`;

const ProductListPurchase = ({ formik }) => {
  const products = useSelector((state) => state.product.products);
  const searchTerm = useSelector((state) => state.product.searchTermProduct);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SearchInput currentPage="Produto" />
      <ListaWrapper>
        {filteredProducts.map((product) => (
          <ProductCardPurchase
            key={product.name}
            product={product}
            formik={formik}
          />
        ))}
      </ListaWrapper>
    </>
  );
};

export default ProductListPurchase;
