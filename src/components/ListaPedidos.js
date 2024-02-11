import { useSelector } from "react-redux";
import styled from "styled-components";
import OrderCard from "./OrderCard";

const ListaWrapper = styled.div`
  width: 1316px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
`;

const ListaPedidos = ({ openModal }) => {
  const pedidos = useSelector((state) => state.pedido.pedidos);
  const searchTerm = useSelector((state) => state.pedido.searchTerm);

  const filteredPedidos = pedidos.filter((pedido) =>
    pedido.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ListaWrapper>
      {filteredPedidos.map((pedido) => (
        <OrderCard
          key={pedido.id} // Use a propriedade adequada para identificar um pedido
          produtoCnpj={pedido.cnpj} // Corrigir isso de acordo com a estrutura do seu pedido
          produtoName={pedido.nome}
          order={pedido}
          onClick={openModal}
        />
      ))}
    </ListaWrapper>
  );
};

export default ListaPedidos;
