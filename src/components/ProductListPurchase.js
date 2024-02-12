import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ProductCardPurchase from "./ProductCardPurchase";
import SearchInput from "./SearchInput";

const ListaWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 19px;
`;

const ProductListPurchase = ({ formik }) => {
  const produtos = useSelector((state) => state.produto.produtos);
  const searchTerm = useSelector((state) => state.produto.searchTerm);

  const filteredProdutos = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      {" "}
      <SearchInput currentPage="Produto" />
      <ListaWrapper>
        {filteredProdutos.map((produto) => (
          <ProductCardPurchase
            key={produto.nome}
            product={produto}
            productName={produto.nome}
            productValue={produto.valor}
            formik={formik}
          />
        ))}
      </ListaWrapper>
    </>
  );
};

export default ProductListPurchase;
