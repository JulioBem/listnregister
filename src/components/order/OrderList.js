import { useSelector } from "react-redux";
import styled from "styled-components";
import OrderCard from "./OrderCard";

const ListWrapper = styled.div`
  width: 1316px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

const OrderList = () => {
  const orders = useSelector((state) => state.order.orders);
  const searchTerm = useSelector((state) => state.order.searchTermOrder);

  const filteredOrders = orders.filter((order) =>
    order.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ListWrapper>
      {filteredOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </ListWrapper>
  );
};

export default OrderList;
