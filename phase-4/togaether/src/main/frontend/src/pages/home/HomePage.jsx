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

  const handleBookmarkToggle = async (id, placeId) => {
    const userId = localStorage.getItem("userId"); // 사용자 ID

    if (!userId) {
      console.error("사용자 ID가 없습니다.");
      return;
    }

    try {
      if (bookmarks.has(id)) {
        // 북마크 삭제
        await axios.post(`/api/place/bookmark/${userId}/${placeId}`);
        setBookmarks((prevBookmarks) => {
          const updatedBookmarks = new Set(prevBookmarks);
          updatedBookmarks.delete(id);
          return updatedBookmarks;
        });
      } else {
        // 북마크 추가
        await axios.post(`/api/place/bookmark/${userId}/${placeId}`);
        setBookmarks((prevBookmarks) => {
          const updatedBookmarks = new Set(prevBookmarks);
          updatedBookmarks.add(id);
          return updatedBookmarks;
        });
      }
    } catch (error) {
      console.error("북마크 변경 중 오류가 발생했습니다:", error);
    }
  };

  // api로 place 데이터 가져온 다음 파싱해서 리스트에 넣기
  const [storeData, setStoreData] = useState({});
  const [storeDataByCategory, setStoreDataByCategory] = useState({});
  const [activeCategory, setActiveCategory] = useState("식당");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/place/all")
      .then((response) => {
        const processedData = processStoreDataByCity(response.data);
        setStoreData(processedData);

        // 분류별로 데이터 처리
        const dataByCategory = processStoreDataByCategory(response.data);
        setStoreDataByCategory(dataByCategory);
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
        placeId: item.placeId,
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

  const translateCategory = (category) => {
    const categoryMap = {
      dining: "식당",
      bar: "바",
      cafe: "카페",
    };
    return categoryMap[category.toLowerCase()] || category; // Return the Korean translation or the original category if not found
  };

  const processStoreDataByCategory = (data) => {
    const categoryData = data.reduce((acc, item) => {
      const category = item.category.toLowerCase();
      const translatedCategory = translateCategory(category);
      if (!acc[translatedCategory]) {
        acc[translatedCategory] = [];
      }
      acc[translatedCategory].push({
        id: item.id, // 또는 고유 ID 생성
        name: item.placeName,
        placeId: item.placeId,
        category: category,
        address: `${item.city} ${item.detailAddress}`,
        latitude: item.latitude,
        longitude: item.longitude,
      });

      return acc;
    }, {});
    return categoryData;
  };

  const {
    paginatedData: paginatedCategoryData,
    totalPages: totalCategoryPages,
    currentPage: currentCategoryPage,
    changePage: changeCategoryPage,
  } = usePagination(storeDataByCategory[activeCategory] || [], ITEMS_PER_PAGE);

  // bookmark
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState([]);

  const fetchBookmarkedPlaces = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/place/bookmark/${userId}`
      );
      const processedData = response.data.map((item, index) => ({
        id: `bookmark-id-${index}`, // 이렇게 ID를 생성하거나 실제 ID를 사용합니다.
        name: item.placeName,
        placeId: item.placeId,
        category: item.category.toLowerCase(),
        address: `${item.city} ${item.detailAddress}`,
        latitude: item.latitude,
        longitude: item.longitude,
      }));
      setBookmarkedPlaces(processedData);

      // 북마크된 아이템들의 ID를 bookmarks 상태에 추가합니다.
      const newBookmarks = new Set(processedData.map((item) => item.id));
      setBookmarks(newBookmarks);
    } catch (error) {
      console.error("Error fetching bookmarked places:", error);
    }
  };

  useEffect(() => {
    // 로컬 스토리지에서 userId 가져오기
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchBookmarkedPlaces(userId);
    }
  }, [activeTab]);

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
            {/* 지역별 버튼들 */}
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
                {/* 지역별 리스트 */}
                <StoreList>
                  {paginatedData.map((item, index) => (
                    <StoreItem
                      key={index}
                      id={item.id} // id 값 고유
                      placeId={item.placeId}
                      {...item}
                      onBookmarkToggle={() =>
                        handleBookmarkToggle(item.id, item.placeId)
                      }
                      isBookmarked={bookmarks.has(item.id)}
                    />
                  ))}
                </StoreList>

                {/* 페이징 컴포넌트 */}
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  changePage={changePage}
                />
              </>
            )}
          </>
        )}
        {activeTab === "분류별" && (
          <>
            {/* 분류별 버튼들 */}
            <CategoryButtons>
              {Object.keys(storeDataByCategory).map((category) => (
                <CategoryButton
                  key={category}
                  active={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </CategoryButton>
              ))}
            </CategoryButtons>

            {/* 분류별 리스트 */}
            <StoreList>
              {paginatedCategoryData.map((item, index) => (
                <StoreItem
                  key={index}
                  id={item.id}
                  placeId={item.placeId}
                  {...item}
                  onBookmarkToggle={() =>
                    handleBookmarkToggle(item.id, item.placeId)
                  }
                  isBookmarked={bookmarks.has(item.id)}
                />
              ))}
            </StoreList>

            {/* 페이징 컴포넌트 */}
            <Pagination
              totalPages={totalCategoryPages}
              currentPage={currentCategoryPage}
              changePage={changeCategoryPage}
            />
          </>
        )}
        {activeTab === "즐겨찾기" && (
          <div>
            <StoreList>
              {bookmarkedPlaces.map((place, index) => (
                <StoreItem
                  key={index}
                  id={place.id}
                  placeId={place.placeId}
                  {...place}
                  onBookmarkToggle={() =>
                    handleBookmarkToggle(place.id, place.placeId)
                  }
                  isBookmarked={bookmarks.has(place.id)}
                />
              ))}
            </StoreList>
          </div>
        )}
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

const CategoryButtons = styled.div`
  display: flex;
  width: calc(100% + 40px);
  margin: 10px -20px;
  padding: 5px 20px;
  background-color: #fcf6ee;
`;

const CategoryButton = styled.button`
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
