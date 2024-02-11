import { useSelector } from "react-redux";
import styled from "styled-components";
import ClientCard from "./ClientCard";

const ListaWrapper = styled.div`
  width: 1316px;
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const ListaClientes = () => {
  const clientes = useSelector((state) => state.cliente.clientes);
  const searchTerm = useSelector((state) => state.cliente.searchTerm);

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // console.log("🚀 ~ ListaClientes ~ modalIsOpen:", modalIsOpen);

  return (
    <ListaWrapper>
      {filteredClientes.map((cliente) => (
        <ClientCard
          key={cliente.cnpj}
          clientCnpj={cliente.cnpj}
          clientName={cliente.nome}
        />
      ))}
    </ListaWrapper>
  );
};

export default ListaClientes;
