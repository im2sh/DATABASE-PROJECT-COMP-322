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
  } from '@chakra-ui/react';

  import happyImage from '../../image/text=happy, size=L.png';
  import excitedImage from '../../image/text=excited, size=L.png';
  import loveImage from '../../image/text=love, size=L.png';
  import proudImage from '../../image/text=proud, size=L.png';
  import refreshImage from '../../image/text=refresh, size=L.png';
  import tiredImage from '../../image/text=tired, size=L.png';
  
const WriteDiaryPage = () => {
  const [diaryText, setDiaryText] = useState('');
  const [emotion, setEmotion] = useState('happy'); // Default emotion or could be ''
  const [pet, setPet] = useState(''); // Default pet

// Emotion images mapping
const emotionImages = {
    '행복해요': happyImage,
    '신나요': excitedImage,
    '설레요': loveImage,
    '뿌듯해요': proudImage,
    '상쾌해요': refreshImage,
    '피곤해요': tiredImage
  };

  // Emotion dropdown options
  const emotions = [
    { value: 'happy', label: '행복해요' },
    { value: 'excited', label: '신나요' },
    { value: 'proud', label: '뿌듯해요' },
    { value: 'refresh', label: '상쾌해요' },
    { value: 'love', label: '설레요' },
    { value: 'tired', label: '피곤해요' }
  ];

  const pets = ['반려견1', '반려견2', '반려견3']; // Replace with actual pet names

  return (
    <Container centerContent maxW="container.md">
        <VStack spacing={4} align="center" m={4}>
        {/* Emotion Image */}
        <Box boxSize="6.5625rem">
            <Image src={happyImage} alt="Happy" boxSize="100%" objectFit="cover" />
        </Box>
        
        {/* Emotion Dropdown */}
        <FormControl id="emotion">
            <Select value={emotion} onChange={(e) => setEmotion(e.target.value)}>
            {emotions.map((emotionOption) => (
            <option value={emotionOption.value} key={emotionOption.value}>{emotionOption.label}</option>
            ))}
        </Select>
        </FormControl>

        {/* Pet Dropdown */}
        <FormControl>
          <Select value={pet} onChange={(e) => setPet(e.target.value)} placeholder="함께할 반려견을 선택해주세요">
            {pets.map((pet) => (
              <option value={pet} key={pet}>{pet}</option>
            ))}
          </Select>
        </FormControl>

        {/* Textarea for diary entry */}
        <FormControl id="diary">
            <Textarea
                placeholder="오늘 하루, 무슨 일이 있었나요? 자유롭게 작성해보세요."
                size="md"
                resize="none"
                value={diaryText}
                onChange={(e) => setDiaryText(e.target.value)}
                minHeight="20rem"
                w="100%" // Set the width to 100% of the parent container
            />
        </FormControl>
        </VStack>
    </Container>
  );
};

export default WriteDiaryPage;