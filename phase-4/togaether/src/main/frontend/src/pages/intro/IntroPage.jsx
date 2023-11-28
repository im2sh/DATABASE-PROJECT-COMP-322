import styled, { keyframes } from "styled-components";
import logo from "../../image/logo.png";

const random = (min, max) => Math.random() * (max - min) + min;

const IntroPage = () => {
  const circles = Array.from({ length: 15 }, (_, index) => (
    <Circle key={index} />
  ));

  return (
    <>
      {circles}
      <PageContainer>
        <Logo src={logo}></Logo>
        <Slogan>네 발과 두 발이 만들어가는 이야기의 지도</Slogan>
        <StartButton>시작하기</StartButton>
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(
    135deg,
    rgba(238, 142, 98, 1) 0%,
    rgba(255, 231, 208, 1) 100%
  );
  text-align: center;
  overflow: hidden;
`;

const Logo = styled.img`
  width: 250px;
  z-index: 1;
`;

const Slogan = styled.p`
  font-family: "Pretendard-Bold", sans-serif;
  font-size: 24px;
  color: #333;
  max-width: 600px;
  line-height: 1.6;
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const Circle = styled.div`
  position: absolute;
  width: ${() => `${random(10, 100)}px`};
  height: ${() => `${random(10, 100)}px`};
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: ${float} ${() => `${random(3, 8)}s`} ease-in-out infinite;
  top: ${() => `${random(0, 100)}vh`};
  left: ${() => `${random(0, 100)}vw`};
`;

const StartButton = styled.button``;

export default IntroPage;
