import { useSelector } from "react-redux";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const ListaWrapper = styled.div`
  width: 1316px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 16px;
`;

const ListaProdutos = ({ openModal }) => {
  const produtos = useSelector((state) => state.produto.produtos);
  const searchTerm = useSelector((state) => state.produto.searchTerm);

  const filteredProdutos = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ListaWrapper>
      {filteredProdutos.map((produto) => (
        <ProductCard
          key={produto.nome}
          product={produto}
          productName={produto.nome}
          productValue={produto.valor}
          onClick={openModal}
        />
      ))}
    </ListaWrapper>
  );
};

export default ListaProdutos;
