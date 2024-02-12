import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cadastrarProduto } from "../store/actions/produtoActions";
import styled from "styled-components";
import RegisterModal from "./RegisterModal";
import InputField from "./InputField";
import { IoMdClose } from "react-icons/io";
import InputFile from "./InputFile";
import { PatternFormat, NumericFormat } from "react-number-format";

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

  #descricao,
  #imagemFile {
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

const FormularioCadastroProduto = ({ closeModal, isOpen }) => {
  const dispatch = useDispatch();

  const generateRandomId = () => {
    const min = 1;
    const max = 1000;
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomId;
  };

  const formik = useFormik({
    initialValues: {
      nome: "",
      valor: "",
      descricao: "",
      imagemFile: "https://placehold.co/250x250",
      id: generateRandomId(),
    },
    validationSchema: Yup.object({
      nome: Yup.string().required("Campo obrigatório"),
      valor: Yup.number().required("Campo obrigatório"),
      descricao: Yup.string().required("Campo obrigatório"),
    }),
    onSubmit: (values) => {
      dispatch(cadastrarProduto(values));
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
              id="nome"
              name="nome"
              type="text"
              value={formik.values.nome}
              onChange={formik.handleChange}
              error={formik.touched.nome && formik.errors.nome}
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
              id="valor"
              name="valor"
              value={formik.values.valor}
              onValueChange={(values) => {
                formik.setFieldValue("valor", values.value);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.valor && formik.errors.valor}
            />
            <InputField
              label="Descrição"
              id="descricao"
              name="descricao"
              type="textarea"
              value={formik.values.descricao}
              onChange={formik.handleChange}
              error={formik.touched.descricao && formik.errors.descricao}
            />
            <InputFile
              label="Imagem do Produto:"
              id="imagemFile"
              name="imagemFile"
              type="file"
              accept="image/jpeg, image/png"
              onChange={(event) =>
                formik.setFieldValue("imagemFile", event.currentTarget.files[0])
              }
              error={formik.touched.imagemFile && formik.errors.imagemFile}
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

export default FormularioCadastroProduto;
