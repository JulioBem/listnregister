import styled from "styled-components";
import { RiImageAddLine } from "react-icons/ri";
import { useState } from "react";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .dashedContainer {
    border: 5px dashed #c5c6cc;
    height: 129px;
    margin-top: 11px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    .typeWarning {
      font-size: 12px;
      color: #949597;
      line-height: 13px;
      margin-top: 11px;
    }

    .fileName {
      font-size: 13px;
      color: #949597;
      line-height: 13px;
      margin-top: 11px;
    }
  }

  label {
    font-weight: bold;
    font-size: 12px;
    line-height: 14.52px;
  }

  input {
    display: none;
  }

  .custom-file-input {
    padding: 12px 16px;
    background-color: #006ffd;
    color: #fff;
    width: 183px;
    height: 29px;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    line-height: 13px;
    font-weight: 400;
    gap: 7px;

    &:focus {
      outline: #006ffd 1.5px solid;
    }
  }

  .error {
    color: red;
    margin-top: 5px;
  }
`;

const InputFile = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  accept
}) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileName(selectedFile ? selectedFile.name : "");
    onChange(event);
  };

  return (
    <InputWrapper id={id}>
      <label htmlFor={`${id}-input`}>{label}</label>
      <div className="dashedContainer">
        <input
          id={`${id}-input`}
          name={name}
          type={type}
          value={value}
          onChange={handleFileChange}
          onBlur={onBlur}
          accept={accept}
        />
        <label htmlFor={`${id}-input`} className="custom-file-input">
          <RiImageAddLine size={27} />
          Faça o upload da foto
        </label>
        <span className="typeWarning">JPG e PNG, somente</span>
        {fileName && (
          <div className="fileName">Arquivo selecionado: "{fileName}"</div>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </InputWrapper>
  );
};

export default InputFile;
