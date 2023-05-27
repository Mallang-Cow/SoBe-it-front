import React, { useState } from "react";
import { styled } from "styled-components";

export default function SearchBar(props) {
  const { setCenterContent, searchWord, setSearchWord } = props;
//  const { setCenterContent, articleSeq, setArticleSeq, setUserId, clickActive, nowUser } = props;

  const handleSearch = () => {
    // 검색 로직 처리
    console.log("Search text:", searchWord);
    // 검색 결과를 처리하거나 다른 동작을 수행할 수 있음
    setCenterContent("search");
  };

  const handleChange = (event, setter) => {
    setter(event.target.value);
  }

  return (
    <>
      <Container>
        <article>
          <form onSubmit={(event) => {
            event.preventDefault();
            handleSearch(); // 검색 버튼 클릭 시 검색 처리
          }}>
            <input id="text" type="text" name="search" placeholder="search"
                  value={ searchWord } onChange={ (e) => handleChange(e, setSearchWord) } />
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
