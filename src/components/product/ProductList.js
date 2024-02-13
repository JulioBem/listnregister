import { useSelector } from "react-redux";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const ListWrapper = styled.div`
  width: 1316px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
`;

const ProductList = ({ openModal }) => {
  const products = useSelector((state) => state.product.products);
  const searchTerm = useSelector((state) => state.product.searchTermProduct);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ListWrapper>
      {filteredProducts.map((product) => (
        <ProductCard key={product.name} product={product} onClick={openModal} />
      ))}
    </ListWrapper>
  );
};

export default ProductList;
