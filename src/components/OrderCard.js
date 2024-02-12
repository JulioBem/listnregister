import styled from "styled-components";

const OrderCardContainer = styled.div`
  width: 314px;
  height: 99px;

  background: #ffffff;
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;

  cursor: pointer;
`;

const OrderCardAvatar = styled.div`
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #f37272;
  border-radius: 100%;

  color: #fff;
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
`;

const OrderCardInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "name price"
    "qtd price";
  gap: 0;
  /* width: min-content; */

  p {
    white-space: nowrap;
  }
`;

const OrderCardName = styled.p`
  color: #000;
  font-size: 12px;
  font-weight: 700;
  text-transform: capitalize;
  grid-area: name;
`;

const OrderCardQtd = styled.p`
  color: #000;
  font-size: 12px;
  grid-area: qtd;
`;

const OrderCardPrice = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  color: #000;
  font-size: 14px;
  font-weight: 800;
  grid-area: price;
`;

const getInitialLetters = (str) => {
  let initialLetters = "";
  const words = str.split(" ");

  if (words.length > 0) {
    const firstLetter = words[0].charAt(0);
    if (words.length > 1) {
      const lastWordIndex = words.length - 1;
      const lastLetter = words[lastWordIndex].charAt(0);
      initialLetters = firstLetter.concat(lastLetter);
    } else initialLetters = firstLetter;

    return initialLetters;
  } else {
    console.error("The string does not contain words.");
    return null;
  }
};

const OrderCard = ({ order }) => {
  const { nome } = JSON.parse(order.cliente);

  return (
    <OrderCardContainer>
      <OrderCardAvatar>{getInitialLetters(nome)}</OrderCardAvatar>
      <OrderCardInfoContainer>
        <OrderCardName>{nome}</OrderCardName>
        <OrderCardQtd>
          Qtd. de Produtos: {order.qtdDeProdutosTotal}
        </OrderCardQtd>
        <OrderCardPrice>R$ {order.valorTotal}</OrderCardPrice>
      </OrderCardInfoContainer>
    </OrderCardContainer>
  );
};

export default OrderCard;
