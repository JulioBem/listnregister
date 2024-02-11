// components/SearchInput.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../store/actions/clienteActions";
import { setSearchTermPedido } from "../store/actions/pedidoActions";
import { setSearchTermProduto } from "../store/actions/produtoActions";
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

const SearchInput = ({ currentPage }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => {
    if (currentPage === "Cliente") {
      return state.cliente.searchTerm;
    } else if (currentPage === "Pedido") {
      return state.pedido.searchTermPedido;
    } else if (currentPage === "Produto") {
      return state.produto.searchTermProduto;
    }
    return "";
  });
  const handleInputChange = (event) => {
    const term = event.target.value;
    if (currentPage === "Cliente") {
      dispatch(setSearchTerm(term));
    } else if (currentPage === "Pedido") {
      dispatch(setSearchTermPedido(term));
    } else if (currentPage === "Produto") {
      dispatch(setSearchTermProduto(term));
    }
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
