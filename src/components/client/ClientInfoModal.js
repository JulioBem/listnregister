import React from "react";
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
  grid-column: span 3;
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
  padding: 12px 24px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 9px;
  height: 203px;

  div {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    line-height: 16px;
  }
`;

const ClientInfoModal = ({ isOpen, closeModal, client }) => {
  const customStyles = {
    content: {
      width: "1068px",
      height: "fit-content",
      padding: "0px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const translationMap = {
    cnpj: "CNPJ",
    cep: "CEP",
    name: "Nome",
    phone: "Telefone",
    address: "Endereço",
    county: "Bairro",
    city: "Cidade",
    state: "Estado",
    number: "Número",
  };

  const formatStringTitle = (str) => {
    const translatedKey = translationMap[str] || str;
    return translatedKey.charAt(0).toUpperCase() + translatedKey.slice(1);
  };

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
          <h2>{client?.name}</h2>
          <IoMdClose onClick={closeModal} size={28} color="#D9D9D9" />
        </FormHeader>
        <InfoWrapper>
          {Object.entries(client).map(([key, value]) => (
            <div key={key}>
              <strong>{formatStringTitle(key)}:</strong> <span>{value}</span>
            </div>
          ))}
        </InfoWrapper>
      </FormWrapper>
    </Modal>
  );
};

export default ClientInfoModal;
