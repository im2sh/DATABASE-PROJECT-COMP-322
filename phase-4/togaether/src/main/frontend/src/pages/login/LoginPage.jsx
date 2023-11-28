import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 뒤로가기
  };

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
    // api 연결이 아직 안 되었기 때문에 일단 이렇게 home 넘어가도록
    navigate("/home");

    try {
      const response = await axios.post("/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setLoading(false);
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
      <BackButton onClick={handleBack}>
        <BackIcon size="2rem" />
      </BackButton>
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

const BackButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  align-self: flex-start;
  margin-bottom: 20px;
`;

const BackIcon = styled(MdKeyboardArrowLeft)`
  cursor: pointer;
`;

const Title = styled.h1`
  color: #ff875a;
  margin-bottom: 40px;
  align-self: flex-start;
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
