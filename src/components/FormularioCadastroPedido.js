// Importe as bibliotecas e componentes necessários
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoMdClose } from "react-icons/io";
import { cadastrarPedido } from "../store/actions/pedidoActions";
import styled from "styled-components";
import RegisterModal from "./RegisterModal";
import ClientSelector from "./ClienteSelector";
import InputField from "./InputField";
import ProductListPurchase from "./ProductListPurchase";

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

const InputWrapper = styled.div`
  padding: 18px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 421px;

  &::after {
    content: "";
    position: absolute;
    top: 466px;
    left: 50%;
    width: 100%;
    height: 2px;
    background-color: #d9d9d9;
    transform: translateX(-50%);
  }
`;

const SubmitBtnWrapper = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  padding: 14px 13px;

  button {
    width: 101px;
    height: 30px;
    border-radius: 4px;
    color: #fff;
    font-weight: 500;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: #0361d9;
    }
  }
`;

const FormularioCadastroPedido = ({ closeModal, isOpen }) => {
  const dispatch = useDispatch();

  const handleSave = (values) => {
    const qtdDeProdutosTotal = values.produtos.reduce(
      (total, objeto) => total + objeto.quantidade,
      0
    );
    const valorTotal = values.produtos.reduce(
      (total, objeto) => total + Number(objeto.valorTotal),
      0
    );

    const newOrder = {
      id: Date.now(),
      cliente: values.cliente,
      produtos: values.produtos.map((produto) => ({
        ...produto,
        quantidade: produto.quantidade || 0,
      })),
      dataPedido: values.dataPedido,
      qtdDeProdutosTotal,
      valorTotal,
    };

    dispatch(cadastrarPedido(newOrder));
    closeModal();
  };

  const formik = useFormik({
    initialValues: {
      cliente: "",
      dataPedido: "",
      produtos: [], // Inicializa como uma matriz vazia
    },
    validationSchema: Yup.object({
      cliente: Yup.string().required("Campo obrigatório"),
      dataPedido: Yup.date().required("Campo obrigatório"),
      produtos: Yup.array()
        .required("Campo obrigatório")
        .min(1, "Adicione pelo menos um produto"), // Adapte as validações conforme necessário
    }),
    onSubmit: (values) => {
      handleSave(values);
      formik.resetForm();
      closeModal();
    },
  });
  console.log("🚀 ~ FormularioCadastroPedido ~ formik:", formik.values);

  return (
    <RegisterModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Cadastrar Pedido"
    >
      <FormWrapper>
        <form onSubmit={formik.handleSubmit}>
          <FormHeader>
            <h2>Cadastrar Pedido</h2>
            <IoMdClose onClick={closeModal} size={28} color="#D9D9D9" />
          </FormHeader>
          <InputWrapper>
            <ClientSelector
              value={formik.values.cliente}
              onChange={formik.handleChange}
              label="Cliente:"
              id="cliente"
            />
            <InputField
              label="Data do Pedido:"
              id="dataPedido"
              name="dataPedido"
              type="date"
              value={formik.values.dataPedido}
              onChange={formik.handleChange}
              error={formik.touched.dataPedido && formik.errors.dataPedido}
            />
            <ProductListPurchase
              value={formik.values.produtos}
              onChange={formik.handleChange}
              formik={formik}
            />
          </InputWrapper>
          <SubmitBtnWrapper>
            <button
              type="submit"
              disabled={Object.values(formik.values).some(
                (value) => value === "" || value === null
              )}
            >
              Salvar
            </button>
          </SubmitBtnWrapper>
        </form>
      </FormWrapper>
    </RegisterModal>
  );
};

export default FormularioCadastroPedido;
