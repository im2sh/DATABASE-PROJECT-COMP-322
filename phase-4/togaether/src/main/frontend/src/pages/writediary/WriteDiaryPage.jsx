// WriteDiaryPage.jsx
import React, { useState } from "react";
import {
  Select,
  Textarea,
  VStack,
  Image,
  FormControl,
  Container,
  Box,
  Flex,
  Button,
} from "@chakra-ui/react";
import happyImage from "../../image/text=happy, size=L.png";
import excitedImage from "../../image/text=excited, size=L.png";
import loveImage from "../../image/text=love, size=L.png";
import proudImage from "../../image/text=proud, size=L.png";
import refreshImage from "../../image/text=refresh, size=L.png";
import tiredImage from "../../image/text=tired, size=L.png";
import createDiary from "../../api/createDiary";
import { BiCheck } from "react-icons/bi";
import BackButton from "../../components/BackButton";
import styled from "styled-components";
import usePostStore from "../../store/usePostStore";
import { useNavigate } from "react-router-dom";

const AppBar = ({ onCheck }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="0.625rem 1.5rem 0.625rem 1.9375rem"
      color="black"
      w="100%"
      h="3rem"
    >
      <BackButton />
      {/* 드롭다운 메뉴와 다른 컨텐츠가 이 위치에 들어갈 수 있음 */}
      <Button
        css={{
          height: "32px",
          padding: "0",
        }}
        variant="ghost"
        onClick={onCheck}
      >
        <BiCheck size="24px" />
      </Button>
    </Flex>
  );
};

const WriteDiaryContainer = styled(Container)`
  * {
    font-family: Poor Story;
  }
`;

const WriteDiaryPage = () => {
  const [diaryText, setDiaryText] = useState("");
  const [emotion, setEmotion] = useState("행복해요"); // Default emotion or could be ''
  const [pet, setPet] = useState(""); // Default pet
  const { locationData } = usePostStore();
  const navigate = useNavigate();

  // Emotion images mapping
  const emotionImages = {
    행복해요: happyImage,
    신나요: excitedImage,
    설레요: loveImage,
    뿌듯해요: proudImage,
    상쾌해요: refreshImage,
    피곤해요: tiredImage,
  };

  // Emotion dropdown options
  const emotions = [
    { value: "행복해요", label: "행복해요" },
    { value: "신나요", label: "신나요" },
    { value: "뿌듯해요", label: "뿌듯해요" },
    { value: "상쾌해요", label: "상쾌해요" },
    { value: "설레요", label: "설레요" },
    { value: "피곤해요", label: "피곤해요" },
  ];

  const pets = ["반려견1", "반려견2", "반려견3"]; // Replace with actual pet names

  const handleCheck = async () => {
    // 체크 로직, 예를 들면 폼 데이터를 처리하는 부분
    const payload = {
      place_id: locationData.place_id,
      place_name: locationData.place_name,
      address_name: locationData.address_name,
      emotion,
      pet_name: pet,
      content: diaryText,
    };

    const response = await createDiary(payload); // api call example

    console.log(response);
  };

  return (
    <WriteDiaryContainer centerContent maxW="container.md">
      <AppBar onCheck={handleCheck} />
      <VStack
        spacing={4}
        align="stretch"
        maxW={{ base: "90%", md: "500px", lg: "800px", xl: "1000px" }} // Adjusts width at various breakpoints
        w="100%" // Ensures that VStack takes up the full width of the container on smaller screens
        m="auto"
      >
        {/* Dynamic Emotion Image */}
        <Box
          boxSize={{
            base: "120px",
            sm: "150px",
            md: "200px",
            lg: "250px",
            xl: "300px",
          }} // Responsive box size
          margin="auto" // Centers the image
        >
          <Image src={emotionImages[emotion]} alt={emotion} boxSize="100%" />
        </Box>

        {/* Emotion Dropdown */}
        <FormControl className="Emotion__Dropdown">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Select
              value={emotion}
              onChange={(e) => setEmotion(e.target.value)}
              css={{
                padding: "0 0.5rem",
              }}
              w="6.5rem"
              h="2.25rem"
              backgroundColor="var(--gray_01)"
              color="var(--primary_100)"
              focusBorderColor="#FF875A"
            >
              {emotions.map((emotionOption) => (
                <option value={emotionOption.value} key={emotionOption.value}>
                  {emotionOption.label}
                </option>
              ))}
            </Select>
          </div>
        </FormControl>

        {/* Pet Dropdown */}
        <FormControl className="Pet__Dropdown">
          <Select
            value={pet}
            onChange={(e) => setPet(e.target.value)}
            placeholder="함께할 반려견을 선택해주세요"
            backgroundColor="var(--gray_01)"
            color="var(--primary_200)"
            focusBorderColor="#CE7149"
          >
            {pets.map((pet) => (
              <option value={pet} key={pet}>
                {pet}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Textarea for diary entry */}
        <FormControl>
          <Textarea
            placeholder="오늘 하루, 무슨 일이 있었나요? 자유롭게 작성해보세요."
            value={diaryText}
            onChange={(e) => setDiaryText(e.target.value)}
            size="md"
            resize="none"
            minHeight="20rem"
          />
        </FormControl>
      </VStack>
    </WriteDiaryContainer>
  );
};

export default WriteDiaryPage;
