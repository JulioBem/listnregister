// components/ListaPedidos.js
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import OrderCard from "./OrderCard";

const ListaWrapper = styled.div`
  width: 1316px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
`;

const ListaPedidos = () => {
  const orders = useSelector((state) => state.pedido.pedidos);
  const searchTerm = useSelector((state) => state.pedido.searchTerm);

  const filteredOrders = orders.filter((order) =>
    order.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ListaWrapper>
      {filteredOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </ListaWrapper>
  );
};

export default ListaPedidos;
