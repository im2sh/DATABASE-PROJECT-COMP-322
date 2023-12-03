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
  Text,
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
import WithPets from "../../components/WithPets";
import usePetDataStore from "../../store/usePetDataStore";

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
  const { locationData } = usePostStore();
  const { petName } = usePetDataStore();
  const navigate = useNavigate();

  // Emotion images mapping
  const emotionImages = {
    행복해요: happyImage,
    신나요: excitedImage,
    설레요: loveImage,
    뿌듯해요: proudImage,
    상쾌해요: refreshImage,
    피곤해요: tiredImage,
    나른해요: tiredImage,
    희망적이에요: happyImage,
    안심돼요: happyImage,
    안정돼요: happyImage,
    기쁘네요: happyImage,
    우울해요: tiredImage,
    불안해요: tiredImage,
    짜증나요: tiredImage,
    무기력해요: tiredImage,
  };

  const handleCheck = async () => {
    // 체크 로직, 예를 들면 폼 데이터를 처리하는 부분
    const payload = {
      placeId: locationData.placeId,
      petName,
      emotion,
      content: diaryText,
    };

    const response = await createDiary(payload); // api call example
    console.log(response);

    navigate("/diary");
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
              {Object.keys(emotionImages).map((emotion) => (
                <option value={emotion} key={emotion}>
                  {emotion}
                </option>
              ))}
            </Select>
          </div>
        </FormControl>

        {/* Pet Dropdown */}
        <WithPets placeId={locationData.placeId} />

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
