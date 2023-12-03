import React from "react";
import useKeywordSearchStore from "../store/useKeywordSearchStore";
import usePostStore from "../store/usePostStore";
import SearchIconGray from "../icons/SearchIconGray";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LocationSearchListDiv = styled.div`
  overflow-y: scroll;

  display: flex;
  flex-direction: column;

  max-height: 16.2175rem;

  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const LocationSearchButtonWrapDiv = styled.div`
  position: relative;

  width: 100%;
  height: 2.8125rem;

  display: flex;
  align-items: center;

  .SearchIconGray {
    position: absolute;
    left: 0.625rem;
  }
`;

export const LocationSearchButton = styled.button`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: inherit;

  padding: 0.44rem 2.19rem 0.25rem 2.75rem;

  background-color: var(--gray_01);

  .PlaceName {
    color: #6c6c6c;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1rem;
    letter-spacing: -0.0187rem;
  }

  color: #6c6c6c;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
  letter-spacing: -0.0156rem;
`;
const LocationSearchList = () => {
  // 받아온 장소 리스트 데이터를 그려내는 컴포넌트
  // 아래 줄에서 데이터 꺼내옴
  // const { keywordSearchData } = useKeywordSearchStore();
  return (
    <LocationSearchListDiv>
      {/* {keywordSearchData?.documents.map((item, index) => {
        return <Item key={index} item={item} />;
      })} */}
      <Item
        item={{
          place_id: "0",
          place_name: "장소명장소명",
          address_name: "주소명주소명",
        }}
      />
    </LocationSearchListDiv>
  );
};

const Item = ({ item }) => {
  const { setLocationData } = usePostStore();
  const navigate = useNavigate();

  const onClick = () => {
    setLocationData({
      place_name: item.place_name,
      address_name: item.address_name,
    });

    navigate("/writeDiary");
  };

  return (
    <LocationSearchButtonWrapDiv>
      <SearchIconGray />
      <LocationSearchButton onClick={onClick}>
        <span className="PlaceName">{item.place_name}</span>
        {item.address_name}
      </LocationSearchButton>
    </LocationSearchButtonWrapDiv>
  );
};

export default LocationSearchList;
