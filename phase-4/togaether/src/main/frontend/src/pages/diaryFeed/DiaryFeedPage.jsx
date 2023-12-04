import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import DiaryEntry from "../../components/DiaryEntry";
import BackButton from "../../components/BackButton";
import logoImage from "../../image/logo.png";
import BottomBar from "../../components/BottomBar";

const DiaryFeedPage = () => {
  const [diaryEntries, setDiaryEntries] = useState([]);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.warn("No user ID found");
        return;
      }

      try {
        const response = await axios.get(`/api/diary/user/${userId}`);
        setDiaryEntries(response.data);
      } catch (error) {
        console.error("Error fetching diary entries:", error);
      }
    };

    fetchDiaryEntries();
  }, []);

  return (
    <>
      <PageContainer>
        <BackButton />
        <Header>
          <Logo src={logoImage} alt="투개더 로고" />
        </Header>
        {diaryEntries.map((entry) => (
          <DiaryEntry key={entry.id} {...entry} />
        ))}
      </PageContainer>
      <BottomBar />
    </>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: calc(100% - 40px);
`;

const Logo = styled.img`
  position: relative;
  top: 0;
  width: 140px;
`;

export default DiaryFeedPage;
