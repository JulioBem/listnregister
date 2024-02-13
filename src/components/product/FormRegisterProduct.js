import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerProduct } from "../../store/actions/productActions";
import styled from "styled-components";
import RegisterModal from "../common/RegisterModal";
import InputField from "../common/InputField";
import { IoMdClose } from "react-icons/io";
import InputFile from "../common/InputFile";
import { NumericFormat } from "react-number-format";

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
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  height: 459px;

  &::after {
    content: "";
    position: absolute;
    top: 504px;
    left: 50%;
    width: 100%;
    height: 2px;
    background-color: #d9d9d9;
    transform: translateX(-50%);
  }

  #description,
  #imageFile {
    grid-column: span 2;
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

const FormRegisterProduct = ({ closeModal, isOpen }) => {
  const dispatch = useDispatch();

  const generateRandomId = () => {
    const min = 1;
    const max = 1000;
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomId;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      value: "",
      description: "",
      imageFile: "https://placehold.co/250x250",
      id: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Campo obrigatório"),
      value: Yup.number().required("Campo obrigatório"),
      description: Yup.string().required("Campo obrigatório"),
    }),
    onSubmit: async (values) => {
      const newId = generateRandomId();
      const updatedValuesWithId = { ...values, id: newId };
      dispatch(registerProduct(updatedValuesWithId));
      formik.resetForm();
      closeModal();
    },
  });

  return (
    <RegisterModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Cadastrar Produto"
    >
      <FormWrapper>
        <form onSubmit={formik.handleSubmit}>
          <FormHeader>
            <h2>Cadastrar Produto</h2>
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
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              allowNegative={false}
              decimalScale={2}
              inputMode="decimal"
              data-cy="price"
              customInput={InputField}
              label="Valor:"
              id="value"
              name="value"
              value={formik.values.value}
              onValueChange={(values) => {
                formik.setFieldValue("value", values.value);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.value && formik.errors.value}
            />
            <InputField
              label="Descrição"
              id="description"
              name="description"
              type="textarea"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && formik.errors.description}
            />
            <InputFile
              label="Imagem do Produto:"
              id="imageFile"
              name="imageFile"
              type="file"
              accept="image/jpeg, image/png"
              onChange={(event) =>
                formik.setFieldValue("imageFile", event.currentTarget.files[0])
              }
              error={formik.touched.imageFile && formik.errors.imageFile}
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

export default FormRegisterProduct;
