import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { registerClient } from "../../store/actions/clientActions";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { PatternFormat } from "react-number-format";
import RegisterModal from "../common/RegisterModal";
import InputField from "../common/InputField";

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
  justify-content: flex-end;
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

const FormRegisterClient = ({ closeModal, isOpen }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      cnpj: "",
      phone: "",
      cep: "",
      address: "",
      county: "",
      city: "",
      state: "",
      number: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Campo obrigatório"),
      cnpj: Yup.string()
        .required("Campo obrigatório")
        .matches(
          /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
          "CNPJ deve ter o formato 'xx.xxx.xxx/xxxx-xx'"
        ),
      phone: Yup.string()
        .required("Campo obrigatório")
        .matches(
          /^\(\d{2}\) \d{5}-\d{4}$/,
          "Telefone deve ter o formato '(xx) xxxxx-xxxx'"
        ),
      number: Yup.string().required("Campo obrigatório"),
      cep: Yup.string()
        .required("Campo obrigatório")
        .matches(/^\d{5}-\d{3}$/, "CEP deve ter o formato '12345-678'"),
    }),
    onSubmit: (values) => {
      dispatch(registerClient(values));
      formik.resetForm();
      closeModal();
    },
  });

  const buscarCep = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro && formik.values.cep.length === 8) {
        formik.setFieldError("cep", "O CEP é inválido");
      } else {
        formik.setFieldValue("cep", cep);
        const { logradouro, bairro, localidade, uf } = response.data;
        formik.setValues({
          ...formik.values,
          address: logradouro,
          county: bairro,
          city: localidade,
          state: uf,
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
      contentLabel="Cadastrar Client"
    >
      <FormWrapper>
        <form onSubmit={formik.handleSubmit}>
          <FormHeader>
            <h2>Cadastrar Client</h2>
            <IoMdClose onClick={closeModal} size={28} color="#D9D9D9" />
          </FormHeader>
          <InputWrapper>
            <InputField
              label="Nome:"
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
            />
            <PatternFormat
              format="##.###.###/####-##"
              mask="_"
              customInput={InputField}
              label="CNPJ:"
              id="cnpj"
              name="cnpj"
              type="text"
              value={formik.values.cnpj}
              onChange={formik.handleChange}
              error={formik.touched.cnpj && formik.errors.cnpj}
            />
            <PatternFormat
              format="(##) #####-####"
              mask="_"
              customInput={InputField}
              label="Telefone:"
              id="phone"
              name="phone"
              type="text"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && formik.errors.phone}
            />
            <PatternFormat
              format="#####-###"
              mask="_"
              customInput={InputField}
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
              id="state"
              name="state"
              type="text"
              value={formik.values.state}
              readOnly
            />
            <InputField
              label="Cidade:"
              id="city"
              name="city"
              type="text"
              value={formik.values.city}
              readOnly
            />
            <InputField
              label="Bairro:"
              id="county"
              name="county"
              type="text"
              value={formik.values.county}
              onChange={formik.handleChange}
              error={formik.touched.county && formik.errors.county}
            />
            <InputField
              label="Endereço:"
              id="address"
              name="address"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && formik.errors.address}
            />
            <InputField
              label="Número:"
              id="number"
              name="number"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.number}
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

export default FormRegisterClient;
