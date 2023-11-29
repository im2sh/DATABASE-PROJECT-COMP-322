// WriteDiaryPage.jsx
import React, { useState } from "react";
import { Select, Textarea, VStack, Image, Box, FormControl } from '@chakra-ui/react';
import happyImage from '../../image/text=happy, size=L.png'; // Make sure the image path is correct

const WriteDiaryPage = () => {
  const [diaryText, setDiaryText] = useState('');
  const [emotion, setEmotion] = useState('happy'); // Default emotion or could be ''

  return (
    <VStack spacing={8} align="center" m={4}>
      {/* Emotion Image */}
      <Box boxSize="sm">
        <Image src={happyImage} alt={emotion} />
      </Box>
      
      {/* Emotion Dropdown */}
      <FormControl>
        <Select placeholder="Select emotion" value={emotion} onChange={(e) => setEmotion(e.target.value)}>
          <option value="happy">Happy</option>
          <option value="excited">Excited</option>
          {/* Add more options as needed */}
        </Select>
      </FormControl>

      {/* Textarea for diary entry */}
      <Textarea
        placeholder="오늘 하루, 무슨 일이 있었나요? 자유롭게 작성해보세요."
        size="md"
        resize="none"
        value={diaryText}
        onChange={(e) => setDiaryText(e.target.value)}
        minHeight="200px"
        w="100%" // Set the width to 100% of the parent container
      />
    </VStack>
  );
};

export default WriteDiaryPage;