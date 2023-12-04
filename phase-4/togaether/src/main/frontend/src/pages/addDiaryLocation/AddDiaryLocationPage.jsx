import React from "react";
import LocationInput from "../../components/LocationInput";
import LocationSearchList from "../../components/LocationSearchList";
import styled from "styled-components";

const DiaryLocationPageDiv = styled.div`
  padding: 0 1.5625rem;
`;

const AddDiaryLocationPage = () => {
  return (
    <DiaryLocationPageDiv>
      <LocationInput />
      <LocationSearchList />
    </DiaryLocationPageDiv>
  );
};

export default AddDiaryLocationPage;
