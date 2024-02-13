import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

const CreationButton = styled.button`
  width: 147px;
  height: 40px;
  background-color: #006ffd;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #0361d9;
  }
`;

const CreateBtn = ({ creationTarget, openModal }) => {
  return (
    <CreationButton onClick={openModal}>
      <FaPlus size={18} /> Novo {creationTarget}
    </CreationButton>
  );
};

export default CreateBtn;
