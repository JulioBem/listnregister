import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

const RegisterModal = ({ isOpen, closeModal, children }) => {
  const customStyles = {
    content: {
      width: "1068px",
      height: "401px",
      padding: "0px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      top: "50%", // Centraliza verticalmente
      left: "50%", // Centraliza horizontalmente
      transform: "translate(-50%, -50%)", // Ajusta a posição
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal Content"
      style={customStyles}
    >
      {children}
    </Modal>
  );
};

export default RegisterModal;
