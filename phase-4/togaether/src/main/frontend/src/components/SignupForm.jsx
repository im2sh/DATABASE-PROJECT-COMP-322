// SignupForm.jsx
import React from "react";
import styled from "styled-components";
import {
  MdOutlineAlternateEmail,
  MdPersonOutline,
  MdPhone,
} from "react-icons/md";
import { FiLock } from "react-icons/fi";

const SignupForm = ({
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
  phoneNumber,
  setPhoneNumber,
  handleSignUp,
  loading,
}) => (
  <Form onSubmit={handleSignUp}>
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
      <label htmlFor="name">Name</label>
      <InputWithIcon>
        <MdPersonOutline className="icon" size="1.35em" />
        <input
          type="text"
          id="name"
          placeholder="Gildong Hong"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </InputWithIcon>
    </InputContainer>
    <InputContainer>
      <label htmlFor="phone-number">Phone Number</label>
      <InputWithIcon>
        <MdPhone className="icon" size="1.5em" />
        <input
          type="text"
          id="phone-number"
          placeholder="012-345-6789"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </InputWithIcon>
    </InputContainer>
    <LoginButton type="submit">
      {loading ? "Loading..." : "회원가입"}
    </LoginButton>
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

export default SignupForm;
