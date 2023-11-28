import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";

const ChangePasswordForm = ({ onConfirm, email, setEmail, loading }) => {
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const handleConfirmClick = (event) => {
    event.preventDefault();
    if (!showPasswordInput) {
      setShowPasswordInput(true);
    } else {
      onConfirm(password);
    }
  };

  return (
    <Form onSubmit={handleConfirmClick}>
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
      {showPasswordInput && (
        <InputContainer>
          <label htmlFor="password">Enter new Password</label>
          <InputWithIcon>
            <FiLock className="icon" size="1.5em" />
            <input
              type="password"
              id="password"
              placeholder="Input your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputWithIcon>
        </InputContainer>
      )}
      <ConfirmButton type="submit">
        {loading
          ? "Loading..."
          : showPasswordInput
          ? "변경 완료"
          : "이 이메일로 비밀번호 변경하기"}
      </ConfirmButton>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const ConfirmButton = styled.button`
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

export default ChangePasswordForm;
