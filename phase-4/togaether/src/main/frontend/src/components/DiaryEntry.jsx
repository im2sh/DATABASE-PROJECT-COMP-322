import React from "react";
import styled from "styled-components";
import { FaPenFancy } from "react-icons/fa"; // Icon for pets and edit
import { IoIosPaw } from "react-icons/io";
import happyImage from "../image/text=happy, size=L.png";
import excitedImage from "../image/text=excited, size=L.png";
import loveImage from "../image/text=love, size=L.png";
import proudImage from "../image/text=proud, size=L.png";
import refreshImage from "../image/text=refresh, size=L.png";
import tiredImage from "../image/text=tired, size=L.png";

const DiaryEntry = ({ petName, content, date, place, emotion }) => {
  const emotionImages = {
    행복해요: happyImage,
    신나요: excitedImage,
    설레요: loveImage,
    뿌듯해요: proudImage,
    상쾌해요: refreshImage,
    피곤해요: tiredImage,
  };

  return (
    <DiaryEntryContainer>
      <Header>
        <PetIcon>
          <IoIosPaw />
        </PetIcon>
        <PetName>{petName}와(과) 함께</PetName>
        <EditIcon>
          <FaPenFancy />
        </EditIcon>
      </Header>
      <Content>{content}</Content>
      <Footer>
        <DateAndPlace>
          <Date>{date}</Date>
          <Date>|</Date>
          <Place>{place}</Place>
        </DateAndPlace>
        <Emotion>
          <EmotionText>{emotion}</EmotionText>
          <EmotionIcon src={emotionImages[emotion]} alt={emotion} />
        </Emotion>
      </Footer>
    </DiaryEntryContainer>
  );
};

const DiaryEntryContainer = styled.article`
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const PetIcon = styled.span`
  font-size: 1.5rem;
  color: #a78e68;
`;

const PetName = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  flex-grow: 1;
  margin: 0 10px;
`;

const EditIcon = styled.span`
  font-size: 1.25rem;
  color: #333;
  cursor: pointer;
`;

const Content = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  padding: 20px;
  position: relative;
  background-color: #fcf6ee;
  font-family: Poor Story;

  &::after {
    content: "";
    display: block;
    height: 1px;
    background-color: #292524;
    width: 80%;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: #fcf6ee;
  gap: 5px;
  padding: 20px;
`;

const DateAndPlace = styled.div`
  display: flex;
  gap: 5px;
`;

const Date = styled.time`
  font-size: 0.875rem;
  color: #999;
`;

const Place = styled.span`
  font-size: 0.875rem;
  color: #999;
`;

const Emotion = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: 5px;
`;

const EmotionIcon = styled.img`
  width: 20px;
  height: 22px;
  margin-right: 8px;
`;

const EmotionText = styled.span`
  font-size: 0.875rem;
  color: #ce7149;
  font-weight: 700;
`;

export default DiaryEntry;
