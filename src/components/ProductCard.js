import styled from "styled-components";

const ProductCardContainer = styled.div`
  width: 250px;
  height: 233px;

  background: #ffffff;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;

  cursor: pointer;
`;

const ProductCardImage = styled.div`
  width: 250px;
  height: 162px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductCardInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 16px 12px 12px;
  gap: 0;
`;

const ProductCardName = styled.p`
  color: #1f2024;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  text-transform: capitalize;
`;

const ProductCardValue = styled.p`
  color: #1f2024;
  font-size: 14px;
  line-height: 16.94px;
  font-weight: 800;
`;

const ProductCard = ({ product, productName, productValue, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const imageUrl =
    product?.imagemFile instanceof Blob
      ? URL.createObjectURL(product.imagemFile)
      : "https://placehold.co/250x250";

  return (
    <ProductCardContainer onClick={handleClick}>
      <ProductCardImage>
        <img src={imageUrl} alt={productName} />
      </ProductCardImage>
      <ProductCardInfoContainer>
        <ProductCardName>{productName}</ProductCardName>
        <ProductCardValue>R$ {productValue}</ProductCardValue>
      </ProductCardInfoContainer>
    </ProductCardContainer>
  );
};

export default ProductCard;
