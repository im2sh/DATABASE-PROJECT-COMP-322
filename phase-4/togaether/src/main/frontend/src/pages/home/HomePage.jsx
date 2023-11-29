import styled from "styled-components";
import BackButton from "../../components/BackButton";
import { useState } from "react";
import logoImage from "../../image/logo.png";
import StoreItem from "../../components/StoreItem";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("지역별");
  const [activeLocation, setActiveLocation] = useState("");
  const tabTitles = ["지역별", "분류별", "종류별"];
  const activeIndex = tabTitles.indexOf(activeTab);

  return (
    <PageContainer>
      <BackButton />
      <Header>
        <Logo src={logoImage} alt="투개더 로고" />
      </Header>
      <TabContainer>
        {tabTitles.map((tab) => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        ))}
        <ActiveTabIndicator activeIndex={activeIndex} />
      </TabContainer>
      <ContentContainer>
        {activeTab === "지역별" && (
          <LocationButtons>
            <LocationButton
              active={activeLocation === "대구"}
              onClick={() => setActiveLocation("대구")}
            >
              대구
            </LocationButton>
            <LocationButton
              active={activeLocation === "부산"}
              onClick={() => setActiveLocation("부산")}
            >
              부산
            </LocationButton>
            <LocationButton
              active={activeLocation === "경북"}
              onClick={() => setActiveLocation("경북")}
            >
              경북
            </LocationButton>
          </LocationButtons>
        )}
        {activeTab === "분류별" && <div>분류별 컨텐츠...</div>}
        {activeTab === "평점별" && <div>평점별 컨텐츠...</div>}
      </ContentContainer>
      <StoreList>
        <StoreItem
          category="cafe"
          name="신당동 마카롱 카페"
          address="대구광역시 달서구 신당동 1838-14"
        />
        <StoreItem
          category="restaurant"
          name="장충동 맛있는 족발"
          address="대구광역시 남구 대명동 1155-8"
        />
        <StoreItem
          category="bar"
          name="쌈뽕포차 성당점"
          address="대구광역시 달서구 성당동 263-2 1층"
        />
      </StoreList>
    </PageContainer>
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

const LocationButtons = styled.div`
  display: flex;
  width: calc(100% + 40px);
  margin: 10px -20px;
  padding: 5px 20px;
  background-color: #fcf6ee;
`;

const LocationButton = styled.button`
  color: #73160a;
  font-size: 1rem;
  border: 1px solid #ddd;
  padding: 7px 25px;
  border-radius: 20px;
  margin: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: transparent;
  border-color: #ff875a;

  ${({ active }) =>
    active &&
    `
      background-color: #F7D49F;
    `}
`;

const StoreList = styled.div`
  width: 100%;
`;

const TabContainer = styled.div`
  position: relative;
  display: flex;
  border-bottom: 2px solid #fcf6ee;
`;

const Tab = styled.div`
  flex: 1;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "700" : "400")};
  color: ${({ active }) => (active ? "#ff6b6b" : "#333")};
  transition: color 0.3s ease;

  &:not(:last-child) {
    margin-right: 2px;
  }
`;

const ActiveTabIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: ${({ activeIndex }) => (activeIndex * 100) / 3}%;
  width: calc(100% / 3);
  border-bottom: 3px solid #ff875a;
  transition: left 0.3s ease;
`;

const ContentContainer = styled.div``;

export default HomePage;
