import styled from "styled-components";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";

const LoginForm = ({
  onLogin,
  email,
  setEmail,
  password,
  setPassword,
  loading,
}) => (
  <Form onSubmit={onLogin}>
    <InputContainer>
      <label htmlFor="email">Email</label>
      <InputWithIcon>
        <MdOutlineAlternateEmail className="icon" size="1.5em" />
        <input
          type="email"
          id="email"
          placeholder="abc@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </InputWithIcon>
    </InputContainer>
    <InputContainer>
      <label htmlFor="password">Your Password</label>
      <InputWithIcon>
        <FiLock className="icon" size="1.5em" />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </InputWithIcon>
    </InputContainer>
    <LoginButton type="submit">{loading ? "Loading..." : "로그인"}</LoginButton>
  </Form>
);

const Form = styled.form`
  width: 100%;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: #ff875a;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  cursor: pointer;
`;

const InputWithIcon = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #ff875a;
  border-radius: 20px;
  padding: 10px;
  margin-top: 8px;

  input {
    border: none;
    outline: none;
    width: 100%;
    padding: 10px;
  }

  .icon {
    margin: 0 10px;
    color: #ff875a;
  }
`;

export default LoginForm;
