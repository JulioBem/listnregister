import styled from "styled-components";

const ProductCardContainer = styled.div`
  width: 317px;
  height: 64px;

  background: #ffffff;
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;

  cursor: pointer;
`;

const ProductCardAvatar = styled.div`
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #72adf3;
  border-radius: 100%;

  color: #fff;
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
`;

const ProductCardInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const ProductCardName = styled.p`
  color: #000;
  font-size: 12px;
  font-weight: 700;
  text-transform: capitalize;
`;

const ProductCardCnpj = styled.p`
  color: #000;
  font-size: 12px;
`;

const getInitialLetters = (str) => {
  let initialLetters = "";
  const words = str.split(" ");

  if (words.length > 0) {
    const firstLetter = words[0].charAt(0);
    if (words.length > 1) {
      const lastWordIndex = words.length - 1;
      const lastLetter = words[lastWordIndex].charAt(0);
      initialLetters = firstLetter.concat(lastLetter);
    } else initialLetters = firstLetter;

    return initialLetters;
  } else {
    console.error("The string does not contain words.");
    return null;
  }
};

const ProductCard = ({ product, productName, productCnpj, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };
  return (
    <ProductCardContainer onClick={handleClick}>
      <ProductCardAvatar>{getInitialLetters(productName)}</ProductCardAvatar>
      <ProductCardInfoContainer>
        <ProductCardName>{productName}</ProductCardName>
        <ProductCardCnpj>{productCnpj}</ProductCardCnpj>
      </ProductCardInfoContainer>
    </ProductCardContainer>
  );
};

export default ProductCard;
