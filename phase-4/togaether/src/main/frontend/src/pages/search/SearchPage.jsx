import BackButton from "../../components/BackButton";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const performSearch = async () => {
      if (searchTerm) {
        try {
          const response = await axios.get(`/api/place/search/${searchTerm}`);
          setSearchResults(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };

    const delayDebounce = setTimeout(() => {
      performSearch();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <PageContainer>
      <BackButton />
      <Title>
        <b>어디를</b> 다녀오셨나요? 🐶
      </Title>
      <SearchBar>
        <FaSearch />
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="장소를 입력해주세요"
        />
        {searchTerm && <FaTimes onClick={clearSearch} />}{" "}
      </SearchBar>
      <SearchResultsContainer>
        {searchResults.map((result, index) => (
          <ResultWrapper key={index}>
            <SearchIconWrapper>
              <FaSearch size={20} />
            </SearchIconWrapper>
            <SearchResultItem>
              <PlaceName>{result.placeName}</PlaceName>
              <PlaceAddress>
                {result.city} {result.detailAddress}
              </PlaceAddress>
            </SearchResultItem>
          </ResultWrapper>
        ))}
      </SearchResultsContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 20px;
  margin-top: 20%;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  padding: 10px 15px;
  border-radius: 20px;
  margin-bottom: 20px;

  svg {
    margin-right: 10px;
    color: #a0a0a0;
  }
`;

const SearchResultsContainer = styled.div`
  background-color: #fcf6ee;
`;

const ResultWrapper = styled.div`
  display: flex;
`;

const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
`;

const SearchResultItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #000;
  }
`;

const PlaceName = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const PlaceAddress = styled.span`
  font-size: 0.875rem;
  color: #333;
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  flex-grow: 1;
  color: #333;

  &::placeholder {
    color: #a0a0a0;
  }

  &:focus {
    outline: none;
  }
`;

export default SearchPage;
