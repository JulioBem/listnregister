import React from "react";
import Modal from "react-modal";

const RegisterModal = ({ isOpen, closeModal, children }) => {
  const customStyles = {
    content: {
      width: "1068px",
      minHeight: "fit-content",
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal Content"
      style={customStyles}
      shouldCloseOnOverlayClick={true}
    >
      {children}
    </Modal>
  );
};

export default RegisterModal;
