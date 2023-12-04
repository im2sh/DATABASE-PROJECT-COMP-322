import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DiaryEntry from "../../components/DiaryEntry";
import BackButton from "../../components/BackButton";
import logoImage from "../../image/logo.png";
import BottomBar from "../../components/BottomBar";
import axios from "axios";

const DiaryFeedPage = () => {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const { placeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.warn("No user ID found");
        return;
      }

      let url = `/api/diary/user/${userId}`;
      if (placeId) {
        // placeId를 받으면, 장소에 맞는 일기로 URL 변경
        url = `/api/diary/place/${placeId}`;
      }

      try {
        const response = await axios.get(url);
        setDiaryEntries(response.data);
      } catch (error) {
        console.error("Error fetching diary entries:", error);
      }
    };

    fetchDiaryEntries();
  }, [placeId]);

  const hasEntries = diaryEntries.length > 0;

  return (
    <>
      <PageContainer>
        <BackButton />
        <WriteDiaryButton onClick={() => navigate("/writeDiary")}>
          일기 작성하기
        </WriteDiaryButton>{" "}
        {/* Add this line */}
        <Header>
          <Logo src={logoImage} alt="투개더 로고" />
        </Header>
        {hasEntries ? (
          diaryEntries.map((entry) => <DiaryEntry key={entry.id} {...entry} />)
        ) : (
          <NoEntriesMessage>불러올 일기가 없습니다.</NoEntriesMessage>
        )}
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

const WriteDiaryButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  margin-top: 10px;
  cursor: pointer;
  align-self: center; // Center the button
`;

const NoEntriesMessage = styled.p`
  text-align: center;
  color: #666;
  margin-top: 20px; // Adjust the margin as needed
`;

export default DiaryFeedPage;
