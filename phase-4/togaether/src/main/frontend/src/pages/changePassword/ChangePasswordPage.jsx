import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import ChangePasswordForm from "../../components/ChangePasswordForm";
import BackButton from "../../components/BackButton";

const ChangePasswordPage = () => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    // Add validation for new passwords match
    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`/api/user/modifyPw`, {
        email,
        currentPassword,
        newPassword,
      });
      setLoading(false);
      // Handle successful password change
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
    <>
      <PageContainer>
        <BackButton />
        <Title>Change Password</Title>
        <ChangePasswordForm
          onConfirm={handleConfirm}
          email={email}
          setEmail={setEmail}
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmNewPassword={confirmNewPassword}
          setConfirmNewPassword={setConfirmNewPassword}
          loading={loading}
        />
        {error && <p>{error}</p>}
      </PageContainer>
    </>
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

export default ChangePasswordPage;
