import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate import
import logo from "../../image/logo.png";

const randomSize = () => `${Math.floor(Math.random() * (100 - 10 + 1)) + 10}px`;

const IntroPage = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 얻음
  const circles = Array.from({ length: 15 }, (_, index) => (
    <Circle key={index} size={randomSize()} />
  ));

  const handleStartClick = () => {
    navigate("/login"); // '/login' 경로로 이동
  };

  return (
    <>
      <PageContainer>
        {circles}
        <Logo src={logo} alt="로고" />
        <Slogan>네 발과 두 발이 만들어가는 이야기</Slogan>
        <StartButton onClick={handleStartClick}>시작하기</StartButton>
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  position: relative;
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
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
`;

const Slogan = styled.p`
  font-family: "Pretendard-Bold", sans-serif;
  font-size: 24px;
  color: #333;
  max-width: 600px;
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const Circle = styled.div`
  position: absolute;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: ${float} ${() => `${Math.floor(Math.random() * 6) + 3}s`}
    ease-in-out infinite;
  top: ${() => `${Math.floor(Math.random() * 100)}vh`};
  left: ${() => `${Math.floor(Math.random() * 100)}vw`};
`;

const StartButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: #ee8e62;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

export default IntroPage;
