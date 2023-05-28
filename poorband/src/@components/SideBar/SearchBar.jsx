import React, { useState } from "react";
import { styled } from "styled-components";

export default function SearchBar(props) {
  const { setCenterContent, searchWord, setSearchWord } = props;
  const [inputText, setInputText] = useState(""); // 입력된 텍스트 상태 추가
  const [isFocused, setIsFocused] = useState(false);

  // 검색
  const handleSearch = () => {
    // 검색 로직 처리
    setSearchWord(inputText); // 검색한 단어 SearchResults.jsx로 넘겨 주기
    setInputText(""); // 입력된 텍스트 상태 업데이트
    setCenterContent("search"); // 검색 결과 페이지로 이동
  };

  // 검색 단어 감지
  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  function check() {}

  return (
    <Container>
      <Input
        type="text"
        name="search"
        placeholder="search"
        value={inputText}
        onChange={handleChange}
        onFocus={() => {
          //setIsFocused(true);
        }}
        onBlur={() => {
          //setIsFocused(false);
        }}
      />
      {/* //{isFocused && ( */}
      <Button
        onClick={() => {
          handleSearch();
        }}>
        <span class="material-symbols-rounded">search</span>
      </Button>
      {/* )} */}
    </Container>
  );
}

const Container = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 0.5rem;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.fonts.regular};
  font-size: 1.6rem;

  button:focus,
  :focus-visible {
    outline: none;
  }
`;

const Input = styled.input`
  flex: auto;
  font-size: 1.6rem;
  height: 100%;
`;
const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.mainpurple};
  width: 3.5rem;
  height: 80%;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.white};
  }
`;
