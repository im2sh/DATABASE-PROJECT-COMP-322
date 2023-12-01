import styled from "styled-components";
import BackButton from "../../components/BackButton";
import { useState, useEffect } from "react";
import axios from "axios";
import logoImage from "../../image/logo.png";
import StoreItem from "../../components/StoreItem";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/usePagination";

const ITEMS_PER_PAGE = 5;

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("지역별");
  const [activeLocation, setActiveLocation] = useState("");
  const tabTitles = ["지역별", "분류별", "즐겨찾기"];
  const activeIndex = tabTitles.indexOf(activeTab);
  const [bookmarks, setBookmarks] = useState(new Set());

  const handleBookmarkToggle = (id) => {
    setBookmarks((prevBookmarks) => {
      const updatedBookmarks = new Set(prevBookmarks);
      console.log("현재 북마크 상태:", Array.from(updatedBookmarks));
      console.log("토글되는 아이템 ID:", id);

      if (updatedBookmarks.has(id)) {
        updatedBookmarks.delete(id);
      } else {
        updatedBookmarks.add(id);
      }

      console.log("업데이트 후 북마크 상태:", Array.from(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  // api로 place 데이터 가져온 다음 파싱해서 리스트에 넣기
  const [storeData, setStoreData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/place/all")
      .then((response) => {
        const processedData = processStoreDataByCity(response.data);
        setStoreData(processedData);
      })
      .catch((error) => {
        console.error("Error fetching store data:", error);
      });
  }, []);

  useEffect(() => {
    if (Object.keys(storeData).length > 0 && !activeLocation) {
      setActiveLocation(Object.keys(storeData)[0]);
    }
  }, [storeData, activeLocation]);

  const processStoreDataByCity = (data) => {
    const storeDataByCity = {};

    data.forEach((item, index) => {
      const cityName = item.city.split(" ")[0].replace("광역시", "");
      if (!storeDataByCity[cityName]) {
        storeDataByCity[cityName] = [];
      }
      const itemId = `generated-id-${index}`; // ID 생성
      storeDataByCity[cityName].push({
        id: itemId,
        name: item.placeName,
        category: item.category.toLowerCase(),
        address: `${item.city} ${item.detailAddress}`,
        latitude: item.latitude,
        longitude: item.longitude,
      });
    });

    return storeDataByCity;
  };

  // pagination
  const { paginatedData, totalPages, currentPage, changePage } = usePagination(
    storeData[activeLocation] || [],
    ITEMS_PER_PAGE
  );

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
          <>
            <LocationButtons>
              {Object.keys(storeData).map((location) => (
                <LocationButton
                  key={location}
                  active={activeLocation === location}
                  onClick={() => setActiveLocation(location)}
                >
                  {location}
                </LocationButton>
              ))}
            </LocationButtons>
            {activeLocation && (
              <>
                <StoreList>
                  {paginatedData.map((item, index) => (
                    <StoreItem
                      key={index}
                      id={item.id} // id 값 고유
                      {...item}
                      onBookmarkToggle={handleBookmarkToggle}
                      isBookmarked={bookmarks.has(item.id)}
                    />
                  ))}
                </StoreList>
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  changePage={changePage}
                />
              </>
            )}
          </>
        )}
        {activeTab === "분류별" && <div>분류별 컨텐츠...</div>}
        {activeTab === "즐겨찾기" && <div>즐겨찾기별 컨텐츠...</div>}
      </ContentContainer>
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
