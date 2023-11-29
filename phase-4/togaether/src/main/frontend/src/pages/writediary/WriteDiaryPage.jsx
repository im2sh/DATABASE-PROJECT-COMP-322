// WriteDiaryPage.jsx
import React, { useState } from "react";
import {
    Select,
    Textarea,
    VStack,
    Image,
    FormControl,
    FormLabel,
    Container,
      Box
  } from '@chakra-ui/react';
import happyImage from '../../image/text=happy, size=L.png'; // Make sure the image path is correct

const WriteDiaryPage = () => {
  const [diaryText, setDiaryText] = useState('');
  const [emotion, setEmotion] = useState('happy'); // Default emotion or could be ''

  return (
    <Container centerContent>
        <VStack spacing={4} align="center" m={4}>
        {/* Emotion Image */}
        <Box boxSize="6.5625rem">
            <Image src={happyImage} alt="Happy" boxSize="100%" objectFit="cover" />
        </Box>
        
        {/* Emotion Dropdown */}
        <FormControl id="emotion">
            <FormLabel>행복해요</FormLabel>
            <Select placeholder="감정을 선택해주세요" value={emotion} onChange={(e) => setEmotion(e.target.value)}>
            <option value="happy">Happy</option>
            <option value="excited">Excited</option>
            {/* Add more options as needed */}
            </Select>
        </FormControl>

        {/* Textarea for diary entry */}
        <FormControl id="diary">
            <FormLabel>오늘 하루, 반려견과 어떤 것들을 했나요?</FormLabel>
            <Textarea
                placeholder="오늘 하루, 무슨 일이 있었나요? 자유롭게 작성해보세요."
                size="md"
                resize="none"
                value={diaryText}
                onChange={(e) => setDiaryText(e.target.value)}
                minHeight="200px"
                w="100%" // Set the width to 100% of the parent container
            />
        </FormControl>
        </VStack>
    </Container>
  );
};

export default WriteDiaryPage;