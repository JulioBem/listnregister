import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { cadastrarCliente } from "../store/actions/clienteActions";
import styled from "styled-components";
import RegisterModal from "./RegisterModal";
import InputField from "./InputField";
import { IoMdClose } from "react-icons/io";

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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  height: 291px;

  &::after {
    content: "";
    position: absolute;
    top: 336px;
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

const FormularioCadastro = ({ closeModal, isOpen }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      nome: "",
      cnpj: "",
      telefone: "",
      cep: "",
      endereco: "",
      bairro: "",
      cidade: "",
      estado: "",
      numero: "",
    },
    validationSchema: Yup.object({
      nome: Yup.string().required("Campo obrigatório"),
      cnpj: Yup.string().required("Campo obrigatório"),
      telefone: Yup.string().required("Campo obrigatório"),
      numero: Yup.string().required("Campo obrigatório"),
      cep: Yup.string()
        .required("Campo obrigatório")
        .matches(/^\d{8}$/, "CEP deve ter 8 dígitos"),
    }),
    onSubmit: (values) => {
      dispatch(cadastrarCliente(values));
      formik.resetForm();
      closeModal();
    },
  });

  const buscarCep = async (cep) => {
    console.log("🚀 ~ buscarCep ~ cep:", cep);
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro && formik.values.cep.length === 8) {
        formik.setFieldError("cep", "O CEP é inválido");
      } else {
        formik.setFieldValue("cep", cep);
        const { logradouro, bairro, localidade, uf } = response.data;
        formik.setValues({
          ...formik.values,
          endereco: logradouro,
          bairro,
          cidade: localidade,
          estado: uf,
        });
      }
    } catch (error) {
      formik.setFieldError("cep", "Erro ao buscar CEP");
      console.error("Erro ao buscar CEP:", error);
    }
  };

  return (
    <RegisterModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Cadastrar Cliente"
    >
      <FormWrapper>
        <form onSubmit={formik.handleSubmit}>
          <FormHeader>
            <h2>Cadastrar Cliente</h2>
            <IoMdClose onClick={closeModal} size={28} color="#D9D9D9" />
          </FormHeader>
          <InputWrapper>
            <InputField
              label="Nome:"
              id="nome"
              name="nome"
              type="text"
              value={formik.values.nome}
              onChange={formik.handleChange}
              error={formik.touched.nome && formik.errors.nome}
            />
            <InputField
              label="CNPJ:"
              id="cnpj"
              name="cnpj"
              type="text"
              value={formik.values.cnpj}
              onChange={formik.handleChange}
              error={formik.touched.cnpj && formik.errors.cnpj}
            />
            <InputField
              label="Telefone:"
              id="telefone"
              name="telefone"
              type="text"
              value={formik.values.telefone}
              onChange={formik.handleChange}
              error={formik.touched.telefone && formik.errors.telefone}
            />
            <InputField
              label="CEP:"
              id="cep"
              name="cep"
              type="text"
              value={formik.values.cep}
              onChange={formik.handleChange}
              onBlur={() => {
                buscarCep(formik.values.cep);
              }}
              error={formik.touched.cep && formik.errors.cep}
            />
            <InputField
              label="Estado:"
              id="estado"
              name="estado"
              type="text"
              value={formik.values.estado}
              readOnly
            />
            <InputField
              label="Cidade:"
              id="cidade"
              name="cidade"
              type="text"
              value={formik.values.cidade}
              readOnly
            />
            <InputField
              label="Bairro:"
              id="bairro"
              name="bairro"
              type="text"
              value={formik.values.bairro}
              readOnly
            />
            <InputField
              label="Endereço:"
              id="endereco"
              name="endereco"
              type="text"
              value={formik.values.endereco}
              readOnly
            />
            <InputField
              label="Número:"
              id="numero"
              name="numero"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.numero}
            />
          </InputWrapper>
          <SubmitBtnWrapper>
            <button
              type="submit"
              disabled={Object.values(formik.values).some(
                (value) => value === ""
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

export default FormularioCadastro;
