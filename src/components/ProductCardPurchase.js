import { useState } from "react";
import { useDispatch } from "react-redux";
import { adicionarProdutoAoPedido } from "../store/actions/pedidoActions";
import styled from "styled-components";

const ProductCardContainer = styled.div`
  width: 327px;
  height: 100px;

  background: #ffffff;
  border: 1px solid #d4d6dd;
  border-radius: 16px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ProductCardImage = styled.div`
  width: 90px;
  height: 100px;
  overflow: hidden;
  border-radius: 16px;

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
  line-height: 14.52px;
  font-weight: 700;
  text-transform: capitalize;
`;

const ProductCardId = styled.p`
  color: #1f2024;
  font-size: 12px;
  line-height: 14.52px;
`;

const ProductActionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProductCardValue = styled.p`
  color: #1f2024;
  font-size: 14px;
  line-height: 16.94px;
  font-weight: 800;
  margin-top: 9px;
`;

const ProductActions = styled.div`
  width: 100%;
  max-width: 75px;
  max-height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 9px;

  & > button.productActionsBtn {
    border-radius: 100%;
    width: 24px;
    height: 24px;
    background-color: #eaf2ff;
    color: #006ffd;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ProductCard = ({ product, productName, productValue, formik }) => {
  const [amount, setAmount] = useState(0);

  const handleProductAmountChange = (action) => {
    if (action === "increase") {
      setAmount((prevState) => prevState + 1);
    } else {
      if (amount > 0) setAmount((prevState) => prevState - 1);
    }

    const updatedProducts = formik.values.produtos.map((p) => {
      if (p.id === product.id) {
        const newQtd = p.quantidade + (action === "increase" ? 1 : -1);
        return {
          ...p,
          quantidade: newQtd,
          valorTotal: newQtd * product.valor,
        };
      }
      return p;
    });

    if (
      !updatedProducts.some((p) => p.id === product.id && p.quantidade !== 0)
    ) {
      updatedProducts.push({
        id: product.id,
        quantidade: 1,
        valorTotal: product.valor,
      });
    }
    console.log(
      "🚀 ~ handleProductAmountChange ~ updatedProducts:",
      updatedProducts
    );
    formik.setFieldValue("produtos", updatedProducts);
  };

  const imageUrl =
    product?.imagemFile instanceof Blob
      ? URL.createObjectURL(product.imagemFile)
      : "https://placehold.co/250x250";

  return (
    <ProductCardContainer>
      <ProductCardImage>
        <img src={imageUrl} alt={productName} />
      </ProductCardImage>
      <ProductCardInfoContainer>
        <ProductCardName>{productName}</ProductCardName>
        <ProductCardId>ID: {product?.id ?? "-"}</ProductCardId>
        <ProductActionsContainer>
          <ProductActions>
            <button
              type="button"
              className="productActionsBtn"
              onClick={() => {
                handleProductAmountChange("increase");
              }}
            >
              +
            </button>
            {amount}
            <button
              type="button"
              className="productActionsBtn"
              onClick={() => {
                handleProductAmountChange("decrease");
              }}
            >
              -
            </button>
          </ProductActions>
          <ProductCardValue>R$ {productValue}</ProductCardValue>
        </ProductActionsContainer>
      </ProductCardInfoContainer>
    </ProductCardContainer>
  );
};

export default ProductCard;
