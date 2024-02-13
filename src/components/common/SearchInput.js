import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

import { setSearchTermClient } from "../../store/actions/clientActions";
import { setSearchTermOrder } from "../../store/actions/orderActions";
import { setSearchTermProduct } from "../../store/actions/productActions";

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
    switch (currentPage) {
      case "Cliente":
        return state.client.searchTermClient;
      case "Pedido":
        return state.order.searchTermOrder;
      case "Produto":
        return state.product.searchTermProduct;
      default:
        return "";
    }
  });

  const handleInputChange = (event) => {
    const term = event.target.value;
    switch (currentPage) {
      case "Cliente":
        dispatch(setSearchTermClient(term));
        break;
      case "Pedido":
        dispatch(setSearchTermOrder(term));
        break;
      case "Produto":
        dispatch(setSearchTermProduct(term));
        break;
      default:
        break;
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
