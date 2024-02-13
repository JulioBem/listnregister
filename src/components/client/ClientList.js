import { useSelector } from "react-redux";
import styled from "styled-components";
import ClientCard from "./ClientCard";

const ListWrapper = styled.div`
  width: 1316px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

const ClientList = ({ openModal }) => {
  const clients = useSelector((state) => state.client.clients);
  const searchTerm = useSelector((state) => state.client.searchTermClient);

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ListWrapper>
      {filteredClients.map((client) => (
        <ClientCard key={client?.cnpj} client={client} onClick={openModal} />
      ))}
    </ListWrapper>
  );
};

export default ClientList;
