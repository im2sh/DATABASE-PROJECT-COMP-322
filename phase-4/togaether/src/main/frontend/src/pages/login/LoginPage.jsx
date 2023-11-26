import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 뒤로가기
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError("No response from server");
      } else {
        setError("Error: " + err.message);
      }
    }
  };

  return (
    <PageContainer>
      <BackButton onClick={handleBack}>
        <BackIcon size="2rem" />
      </BackButton>
      <Title>Login</Title>
      <Form onSubmit={handleLogin}>
        <InputContainer>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">Your Password</label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputContainer>
        <LoginButton type="submit">로그인</LoginButton>
      </Form>
      <SignUpLink href="/signup">계정이 없으신가요? 회원가입</SignUpLink>
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
  color: #e76f51;
  margin-bottom: 40px;
  align-self: flex-start;
`;

const Form = styled.form`
  width: 100%;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  border: 2px solid #e76f51;
  border-radius: 20px;
  padding: 10px 0;
  margin-top: 8px;
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: #e76f51;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 15px;
  font-size: 18px;
  margin-bottom: 20px;
`;

const SignUpLink = styled.a`
  color: #e76f51;
  text-decoration: none;
  margin-top: 20px;
`;

export default LoginPage;
