import React, { useState } from "react";
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

const ProductCard = ({ product, formik }) => {
  const [amount, setAmount] = useState(0);

  const handleProductAmountChange = (action) => {
    const updatedProducts = formik.values.products.map((p) => {
      if (p.id === product.id) {
        const newQtd = action === "increase" ? p.quantity + 1 : p.quantity - 1;

        if (newQtd <= 0) {
          setAmount(0);
          return {
            ...p,
            quantity: 0,
            totalValue: 0,
          };
        }

        const newTotalValue = newQtd * product.value;
        setAmount(newQtd);

        return {
          ...p,
          quantity: newQtd,
          totalValue: newTotalValue,
        };
      }
      return p;
    });

    const updatedProductsFiltered = updatedProducts.filter(
      (p) => p !== null && p.quantity > 0
    );

    if (
      !updatedProducts.some((p) => p.id === product.id) &&
      action === "increase"
    ) {
      setAmount(1);
      updatedProductsFiltered.push({
        id: product.id,
        quantity: 1,
        totalValue: product.value,
      });
    }

    formik.setFieldValue("products", updatedProductsFiltered);
  };

  const imageUrl =
    product?.imageFile instanceof Blob
      ? URL.createObjectURL(product.imageFile)
      : "https://placehold.co/250x250";

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const productValue = formatter.format(product?.value) || "R$ 00,00";

  return (
    <ProductCardContainer>
      <ProductCardImage>
        <img src={imageUrl} alt={product?.name || "Produto"} />
      </ProductCardImage>
      <ProductCardInfoContainer>
        <ProductCardName>{product?.name || "Name do Produto"}</ProductCardName>
        <ProductCardId>ID: {product?.id ?? "-"}</ProductCardId>
        <ProductActionsContainer>
          <ProductActions>
            <button
              type="button"
              className="productActionsBtn"
              onClick={() => handleProductAmountChange("increase")}
            >
              +
            </button>
            {amount}
            <button
              type="button"
              className="productActionsBtn"
              onClick={() => handleProductAmountChange("decrease")}
            >
              -
            </button>
          </ProductActions>
          <ProductCardValue>{productValue}</ProductCardValue>
        </ProductActionsContainer>
      </ProductCardInfoContainer>
    </ProductCardContainer>
  );
};

export default ProductCard;
