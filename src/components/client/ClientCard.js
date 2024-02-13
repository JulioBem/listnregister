import styled from "styled-components";

const Container = styled.div`
  width: 317px;
  height: 64px;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
  cursor: pointer;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #72adf3;
  border-radius: 100%;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const Name = styled.p`
  color: #000;
  font-size: 12px;
  font-weight: 700;
  text-transform: capitalize;
`;

const Cnpj = styled.p`
  color: #000;
  font-size: 12px;
`;

const getInitialLetters = (str) => {
  const words = str.split(" ");

  if (words.length > 0) {
    const [firstWord, lastWord] = [words[0], words[words.length - 1]];
    const initials = lastWord
      ? `${firstWord.charAt(0)}${lastWord.charAt(0)}`
      : firstWord.charAt(0);
    return initials;
  } else {
    console.error("The string does not contain words.");
    return null;
  }
};

const ClientCard = ({ client, onClick }) => {
  const handleClick = () => onClick && onClick(client);

  return (
    <Container onClick={handleClick}>
      <Avatar>{getInitialLetters(client?.name)}</Avatar>
      <InfoContainer>
        <Name>{client?.name}</Name>
        <Cnpj>{client?.cnpj}</Cnpj>
      </InfoContainer>
    </Container>
  );
};

export default ClientCard;
