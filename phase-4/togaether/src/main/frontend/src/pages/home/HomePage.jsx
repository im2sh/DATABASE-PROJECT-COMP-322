import styled from "styled-components";
import BackButton from "../../components/BackButton";

const Home = () => {
  return (
    <>
      <PageContainer>
        <BackButton />
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export default Home;
