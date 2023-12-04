import { Text } from "@chakra-ui/react";
import usePetDataStore from "../store/usePetDataStore";
import { useEffect } from "react";

const WithPets = ({ placeId }) => {
  const { petData, petName, setPetData } = usePetDataStore();

  const hasJongseong = (word) => {
    const lastChar = word.charCodeAt(word.length - 1);
    return (lastChar - 0xac00) % 28 > 0;
  };

  const conjunction = hasJongseong(petName) ? "과 함께" : "와 함께";

  useEffect(() => {
    setPetData(placeId);
  }, []);

  if (!petData || petData.length === 0) return null;

  return (
    <Text
      display="flex"
      justifyContent="center"
      backgroundColor="var(--gray_01)"
      color="var(--primary_200)"
    >
      {petName}
      &nbsp;
      <span
        style={{
          color: "var(--primary_100)",
        }}
      >
        {conjunction}
      </span>
    </Text>
  );
};

export default WithPets;
