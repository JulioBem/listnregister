import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";
import styled from "styled-components";

const FormWrapper = styled.div`
  form {
    button {
      background-color: #3498db;
      color: #fff;
      padding: 10px;
      cursor: pointer;
      border: none;
      border-radius: 4px;

      &:disabled {
        background-color: #bdc3c7;
        cursor: not-allowed;
      }
    }
  }
`;

const FormHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  padding: 16px 25px 15px;
  height: 48px;

  h2 {
    font-size: 14px;
    line-height: 16.94px;
    color: #1f2024;
  }

  &::after {
    content: "";
    position: absolute;
    top: 48px;
    left: 50%;
    width: 100%;
    height: 2px;
    background-color: #d9d9d9;
    transform: translateX(-50%);
  }

  svg {
    position: relative;
    bottom: 5px;
    cursor: pointer;
  }
`;

const InfoWrapper = styled.div`
  padding: 15px 29px;
  display: grid;
  grid-template-columns: auto 408px;
  gap: 36px;
  height: 100%;

  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-size: 12px;
    line-height: 16px;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 408px;

  .productDescription {
    overflow-wrap: anywhere;
    margin-top: 24px;
    font-size: 12px;
    line-height: 16px;
    text-align: justify;
  }

  .productValue {
    font-size: 16px;
    line-height: 22px;
  }

  h1 {
    font-weight: 900;
    font-size: 18px;
    line-height: 21.78px;
  }
`;

const ImageContainer = styled.div`
  width: 313px;
  height: 203px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfoModal = ({ isOpen, closeModal, product }) => {
  console.log("🚀 ~ ProductInfoModal ~ product:", product);
  const customStyles = {
    content: {
      minWidth: "791px",
      minHeight: "357px",
      padding: "0px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      overflowX: "hidden",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
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
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal Content"
      style={customStyles}
      shouldCloseOnOverlayClick={true}
    >
      <FormWrapper>
        <FormHeader>
          <h2>Detalhes do produto</h2>
          <IoMdClose onClick={closeModal} size={28} color="#D9D9D9" />
        </FormHeader>
        <InfoWrapper>
          <ImageContainer>
            <img src={imageUrl} alt={product?.name}></img>
          </ImageContainer>
          <ProductDetails>
            <h1>{product?.name}</h1>
            <span className="productValue">{productValue}</span>
            <span className="productDescription">{product?.description}</span>
          </ProductDetails>
        </InfoWrapper>
      </FormWrapper>
    </Modal>
  );
};

export default ProductInfoModal;
