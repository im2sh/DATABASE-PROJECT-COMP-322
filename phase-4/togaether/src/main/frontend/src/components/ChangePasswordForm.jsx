import React from "react";
import styled from "styled-components";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";

const ChangePasswordForm = ({
  onConfirm,
  email,
  setEmail,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmNewPassword,
  setConfirmNewPassword,
  loading,
}) => {
  return (
    <Form onSubmit={onConfirm}>
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
        <label htmlFor="currentPassword">Current Password</label>
        <InputWithIcon>
          <FiLock className="icon" size="1.5em" />
          <input
            type="password"
            id="currentPassword"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </InputWithIcon>
      </InputContainer>
      <InputContainer>
        <label htmlFor="newPassword">New Password</label>
        <InputWithIcon>
          <FiLock className="icon" size="1.5em" />
          <input
            type="password"
            id="newPassword"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </InputWithIcon>
      </InputContainer>
      <InputContainer>
        <label htmlFor="confirmNewPassword">Confirm New Password</label>
        <InputWithIcon>
          <FiLock className="icon" size="1.5em" />
          <input
            type="password"
            id="confirmNewPassword"
            placeholder="Confirm new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </InputWithIcon>
      </InputContainer>
      <ConfirmButton type="submit">
        {loading ? "Loading..." : "비밀번호 변경하기"}
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
