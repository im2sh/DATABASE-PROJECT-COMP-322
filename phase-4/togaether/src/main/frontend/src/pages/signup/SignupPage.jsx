import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SignupForm from "../../components/SignupForm";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 뒤로가기
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/signup", { email, password });
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

export default SignupPage;
