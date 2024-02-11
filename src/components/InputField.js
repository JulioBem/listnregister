import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    font-size: 12px;
    line-height: 14.52px;
  }

  input {
    padding: 12px 16px;
    border: 1.2px solid #ddd;
    width: 100%;
    height: 48px;
    border-radius: 12px;

    &:focus {
      outline: #006ffd 1.5px solid;
    }
  }

  .error {
    color: red;
    margin-top: 5px;
  }
`;

const InputField = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <InputWrapper>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className="error">{error}</div>}
    </InputWrapper>
  );
};

export default InputField;
