// components/sharedComponents/ClientSelector.js
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    font-size: 12px;
    line-height: 14.52px;
  }

  select {
    padding: 12px 16px;
    border: 1.2px solid #ddd;
    width: 100%;
    height: 48px;
    border-radius: 12px;

    &:focus {
      outline: #006ffd 1.5px solid;
    }
  }

  textarea {
    padding: 12px 16px;
    border: 1.2px solid #ddd;
    width: 100%;
    height: 94px;
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

const ClientSelector = ({ value, onChange, label, id }) => {
  const clients = useSelector((state) => state.cliente.clientes);

  return (
    <InputWrapper id={id}>
      <select name={id} value={value} onChange={onChange}>
        <option value="">Selecione um cliente</option>
        {clients.map((client) => (
          <option key={client.cnpj} value={JSON.stringify(client)}>
            {client.nome}
          </option>
        ))}
      </select>
    </InputWrapper>
  );
};

export default ClientSelector;
