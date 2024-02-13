import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    font-size: 12px;
    line-height: 14.52px;
  }

  input,
  textarea {
    padding: 12px 16px;
    border: 1.2px solid #ddd;
    width: 100%;
    border-radius: 12px;

    &:focus {
      outline: #006ffd 1.5px solid;
    }
  }

  textarea {
    height: 94px;
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
    <InputWrapper id={id}>
      <label htmlFor={id}>{label}</label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}

      {error && <div className="error">{error}</div>}
    </InputWrapper>
  );
};

export default InputField;
