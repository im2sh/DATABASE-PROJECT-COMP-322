import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ChangePasswordForm from "../../components/ChangePasswordForm";

const ChangePasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 뒤로가기
  };

  const handleConfirm = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/changePassword", { email });
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
    <>
      <PageContainer>
        <BackButton onClick={handleBack}>
          <BackIcon size="2rem" />
        </BackButton>
        <Title>Change Password</Title>
        <ChangePasswordForm
          onConfirm={handleConfirm}
          email={email}
          setEmail={setEmail}
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

export default ChangePasswordPage;
