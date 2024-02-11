import styled from "styled-components";
import SearchInput from "./SearchInput";
import CreateBtn from "./CreateBtn";

const Container = styled.div`
  width: 1312px;
  height: 68px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  justify-content: space-between;
  padding: 14px 16px;
`;

const NavBar = ({ creationTarget, openModal }) => {
  return (
    <Container>
      <SearchInput />
      <CreateBtn creationTarget={creationTarget} openModal={openModal} />
    </Container>
  );
};

export default NavBar;
