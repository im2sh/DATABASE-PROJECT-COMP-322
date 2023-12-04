import styled from "styled-components";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 뒤로가기
  };

  return (
    <>
      <BacksButton onClick={handleBack}>
        <BackIcon size="2.5rem" />
      </BacksButton>
    </>
  );
};

const BacksButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  align-self: flex-start;
  margin-top: 10px;
  z-index: 10;
`;

const BackIcon = styled(MdKeyboardArrowLeft)`
  cursor: pointer;
`;

export default BackButton;
