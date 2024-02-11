// components/SearchInput.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../store/actions/clienteActions";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 364px;
  height: 40px;
  border: 1px solid #5d6570;
  border-radius: 8px;
  overflow: hidden;
  padding: 13px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  outline: none;
`;

const SearchInput = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.cliente.searchTerm);

  const handleInputChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <InputContainer>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Pesquisar"
      />
      <FaSearch />
    </InputContainer>
  );
};

export default SearchInput;
