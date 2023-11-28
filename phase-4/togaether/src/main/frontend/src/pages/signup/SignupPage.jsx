import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SignupForm from "../../components/SignupForm";
import BackButton from "../../components/BackButton";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  const handleGoToLogin = () => {
    navigate("/login");
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/signup", {
        email,
        name,
        password,
      });
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError("회원가입에 실패했습니다. (" + err + ")");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  useEffect(() => {
    let timer;
    if (showError) {
      timer = setTimeout(() => setShowError(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [showError]);

  return (
    <PageContainer>
      <BackButton />
      <Title>Register</Title>
      <SignupForm
        email={email}
        setEmail={setEmail}
        name={name}
        setName={setName}
        password={password}
        setPassword={setPassword}
        handleSignUp={handleSignUp}
        loading={loading}
      />
      <LoginWrapper>
        이미 계정이 있으신가요?
        <LoginLink onClick={handleGoToLogin}> 로그인</LoginLink>
      </LoginWrapper>
      {error && <ErrorMessage show={showError}>{error}</ErrorMessage>}{" "}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: #ff875a;
  margin-bottom: 40px;
  align-self: flex-start;
`;

const LoginWrapper = styled.div`
  display: flex;
  color: #73160a;
  gap: 10px;
`;

const LoginLink = styled.a`
  color: #73160a;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: #58151c;
  background-color: #f8d7da;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #f1aeb5;
  box-sizing: border-box;
  width: max-content;
  position: fixed;
  bottom: 20px;
  right: 20px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  transform: translateX(${(props) => (props.show ? 0 : 100)}%);
  transition: all 0.5s ease-in-out;
  text-align: left;
  z-index: 10;
`;

export default SignupPage;
