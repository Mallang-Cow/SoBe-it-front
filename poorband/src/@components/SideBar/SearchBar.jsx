import React, { useState } from "react";
import { styled } from "styled-components";

export default function SearchBar(props) {
  const { setCenterContent, searchWord, setSearchWord } = props;
  const [inputText, setInputText] = useState(""); // 입력된 텍스트 상태 추가

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
  }

  return (
    <>
      <Container>
        <article>
          <form onSubmit={(event) => {
            event.preventDefault();
            handleSearch(); // 검색 버튼 클릭 또는 엔터 시 검색 처리
          }}>
            <input id="text" type="text" name="search" placeholder="search"
                   value={ inputText } onChange={ handleChange } />                   
            <input id="submit" type="submit" value="검색"></input>
          </form>
        </article>
      </Container>
    </>
  );
}

const Container = styled.li`
  padding: 1.8rem;

  input {
    height: 3rem;
    border: 1px #cccccc solid;
  }

  #text {
    width: 15rem;
    margin-right: 1rem;
  }

  #submit {
  }

  input:focus {
    border-color: #0982f0;
    outline: none;
  }
`;
