import React from "react";
import styled from "styled-components";
import DiaryEntry from "../../components/DiaryEntry";

const diaryEntries = [
  {
    id: 1,
    petName: "바니콩",
    content:
      "오늘의 저녁은 홈메이드 간식 파티. 반려동물과 함께 요리하고 함께 맛있는 음식을 먹었어. 사랑 가득한 시간이었어. 오늘의 저녁은 홈메이드 간식 파티. 반려동물과 함께 요리하고 함께 맛있는 음식을 먹었어. 사랑 가득한 시간이었어.",
    date: "2023.10.29",
    place: "대구광역시 동구 신천동 1838-14",
    emotion: "행복해요",
  },
  {
    id: 2,
    petName: "바니",
    content:
      "오늘 바니랑 대구의 아름다운 두류공원에서 하루 종일 뛰어놀았어. 날씨도 좋고 바니도 즐거워 보여서 나도 행복했지. 둘이서 먹은 소프트 아이스크림도 정말 맛있었어!",
    date: "2023.10.29",
    place: "대구광역시 달서구 두류공원로 200",
    emotion: "행복해요",
  },
  {
    id: 3,
    petName: "초코",
    content:
      "부산 해운대 해변에서 초코랑 산책했어. 파도 소리 들으며 모래사장을 걷는데, 초코도 나도 그 순간만큼은 모든 걱정을 잊었어. 초코가 바닷물에 발을 담그고 신나해하는 모습이 눈에 선해!",
    date: "2023.10.28",
    place: "부산 해운대구 해운대해변로 264",
    emotion: "신나요",
  },
  {
    id: 4,
    petName: "뭉치",
    content:
      "오늘은 뭉치랑 경주의 안압지를 걸었어. 역사 속 고요한 분위기 속에서 뭉치는 마치 고운 공주님이 된 것 같아. 가을 바람이 불 때마다 낙엽이 우리 주위를 맴돌았어.",
    date: "2023.10.27",
    place: "경북 경주시 인왕동 첨성대길 90",
    emotion: "뿌듯해요",
  },
  {
    id: 5,
    petName: "별이",
    content:
      "별이랑 경북의 문경새재에서 가을 트레킹 했어. 오르막길이 힘들긴 했지만, 정상에 올라 우리만의 피크닉을 즐겼어. 별이도 자연 속에서 마음껏 뛰어놀아서 좋아했어.",
    date: "2023.10.26",
    place: "경북 문경시 문경새재로 455",
    emotion: "상쾌해요",
  },
  {
    id: 6,
    petName: "달이",
    content:
      "달이랑 대구의 팔공산 케이블카 타고 올라갔어. 달이는 높이 올라가면서 밖을 구경하는 게 신기한가봐. 케이블카에서 내려서 함께 바라본 대구 시내 전경에 나도 마음이 차분해졌어.",
    date: "2023.10.25",
    place: "대구광역시 동구 팔공산로 1099",
    emotion: "피곤해요",
  },
];

const DiaryFeedPage = () => {
  return (
    <PageContainer>
      {diaryEntries.map((entry, index) => (
        <DiaryEntry key={index} {...entry} />
      ))}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

export default DiaryFeedPage;
