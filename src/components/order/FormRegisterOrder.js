import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import RegisterModal from "../common/RegisterModal";
import ClientSelector from "../client/ClientSelector";
import InputField from "../common/InputField";
import ProductListPurchase from "./ProductListPurchase";
import { registerOrder } from "../../store/actions/orderActions";

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
  height: fit-content;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
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

const FormRegisterOrder = ({ closeModal, isOpen }) => {
  const dispatch = useDispatch();

  const handleSave = (values) => {
    const pdtTotalQuantity = values.products.reduce(
      (total, objeto) => total + objeto.quantity,
      0
    );
    const totalValue = values.products.reduce(
      (total, objeto) => total + Number(objeto.totalValue),
      0
    );

    const newOrder = {
      id: Date.now(),
      client: values.client,
      products: values.products.map((products) => ({
        ...products,
        quantity: products.quantity || 0,
      })),
      orderDate: values.orderDate,
      pdtTotalQuantity,
      totalValue,
    };

    dispatch(registerOrder(newOrder));
  };

  const formik = useFormik({
    initialValues: {
      client: "",
      orderDate: "",
      products: [],
    },
    validationSchema: Yup.object({
      client: Yup.string().required("Campo obrigatório"),
      orderDate: Yup.date().required("Campo obrigatório"),
      products: Yup.array()
        .required("Campo obrigatório")
        .min(1, "Adicione pelo menos um produto"),
    }),
    onSubmit: (values) => {
      handleSave(values);
      formik.resetForm();
      closeModal();
    },
  });

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
              value={formik.values.client}
              onChange={formik.handleChange}
              label="Cliente:"
              id="client"
            />
            <InputField
              label="Data do Pedido:"
              id="orderDate"
              name="orderDate"
              type="date"
              value={formik.values.orderDate}
              onChange={formik.handleChange}
              error={formik.touched.orderDate && formik.errors.orderDate}
            />
            <ProductListPurchase
              value={formik.values.products}
              onChange={formik.handleChange}
              formik={formik}
            />
          </InputWrapper>
          <SubmitBtnWrapper>
            <button
              type="submit"
              disabled={Object.values(formik.values).some(
                (value) =>
                  value === "" ||
                  (typeof value === "object" && value.length <= 0)
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

export default FormRegisterOrder;
