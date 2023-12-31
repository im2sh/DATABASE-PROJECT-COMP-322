import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import BackButton from "../../components/BackButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoToSignup = () => {
    navigate("/signup");
  };

  const handleGoToChangePassword = () => {
    navigate("/changePassword");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        {
          email,
          password,
        }
      );
      setLoading(false);
      localStorage.setItem("userId", response.data.UserId);
      localStorage.setItem("userName", response.data.userName);
      navigate("/home");
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data.message ||
          err.message ||
          "An unexpected error occurred"
      );
    }
  };

  return (
    <PageContainer>
      <BackButton />
      <Title>Login</Title>
      <LoginForm
        onLogin={handleLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
      />
      <LinkWrapper>
        <SignUpWrapper>
          계정이 없으신가요?
          <SignUpLink onClick={handleGoToSignup}> 회원가입</SignUpLink>
        </SignUpWrapper>
        <b>|</b>
        <ChangePasswordWrapper>
          <ChangePasswordLink onClick={handleGoToChangePassword}>
            비밀번호 변경
          </ChangePasswordLink>
        </ChangePasswordWrapper>
      </LinkWrapper>
      {error && <p>{error}</p>}
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

const Title = styled.p`
  color: #ff875a;
  margin: 20px 0;
  align-self: flex-start;
  font-size: 32px;
  font-weight: 700;
`;

const SignUpWrapper = styled.div`
  display: flex;
  color: #73160a;
  gap: 10px;
`;

const SignUpLink = styled.a`
  color: #73160a;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`;

const ChangePasswordWrapper = styled.div`
  display: flex;
  color: #73160a;
  gap: 10px;
`;

const ChangePasswordLink = styled.a`
  color: #73160a;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 10px;
  color: #73160a;
`;

export default LoginPage;
