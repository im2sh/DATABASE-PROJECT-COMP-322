import styled from "styled-components";
import categoryBar from "../image/category_bar.png";
import categoryCafe from "../image/category_cafe.png";
import categoryDining from "../image/category_dining.png";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import axios from "axios";
import { uesNavigate, useNavigate } from "react-router-dom";

const getCategoryIcon = (category) => {
  const icons = {
    restaurant: categoryDining,
    cafe: categoryCafe,
    bar: categoryBar,
  };
  return icons[category] || categoryDining;
};

const StoreItem = ({
  id,
  category,
  placeId,
  name,
  address,
  onBookmarkToggle,
  isBookmarked,
}) => {
  // console.log(`아이템 ID: ${id}, 북마크 상태: ${isBookmarked}`);
  const navigate = useNavigate();

  const viewDiaries = () => {
    navigate(`/diary/${placeId}`);
  };

  return (
    <Item>
      <CategoryIconWrapper>
        <CategoryIcon src={getCategoryIcon(category)} />
      </CategoryIconWrapper>
      <StoreDetails>
        <StoreNameAndReservation>
          <StoreName>{name}</StoreName>
          <ReservationButton>예약</ReservationButton>
        </StoreNameAndReservation>
        <Address>{address}</Address>
        <Actions>
          <BookmarkButton onClick={() => onBookmarkToggle(id)}>
            {isBookmarked ? (
              <FaBookmark size={15} />
            ) : (
              <FaRegBookmark size={15} />
            )}
          </BookmarkButton>
          <ViewDiaryLink onClick={viewDiaries}>작성한 일기보기</ViewDiaryLink>
        </Actions>
      </StoreDetails>
    </Item>
  );
};

const Item = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px 0;
`;

const CategoryIconWrapper = styled.div`
  align-self: left;
`;

const CategoryIcon = styled.img`
  margin: 5px 10px 0 0;
  width: 30px;
`;

const StoreDetails = styled.div`
  flex-grow: 1;
`;

const StoreNameAndReservation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StoreName = styled.h2`
  font-size: 1.25rem;
  color: #ce7149;
  font-family: "Pretendard-SemiBold";
  max-width: 300px;
`;

const ReservationButton = styled.button`
  padding: 5px 10px;
  background-color: #ff6b6b;
  border: none;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  width: 60px;
`;

const Address = styled.p`
  color: #777;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const BookmarkButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
`;

const ViewDiaryLink = styled.button`
  color: #ff6b6b;
  cursor: pointer;
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
`;

export default StoreItem;
