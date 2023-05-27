import React, { useState } from "react";
import styled from "styled-components";
import { css } from 'styled-components';
import SearchUsers from "./SearchUsers";
import SearchPosts from "./SearchPosts";

export default function SearchResults(props) {
  const [isClicked, setIsClicked] = useState(true);
  const [searchCategory, setSearchCategory] = useState("users");
  const { searchWord } = props;

  const handleClick = (type) => {
    setSearchCategory(type);
  };

  return (
    <>
      <HeaderContainer>
        <header>'{ searchWord }' Search Results</header>
      </HeaderContainer>

      {/* 메뉴 */}
      <ButtonWrapper>
        <Button1 data-isclicked={ isClicked } onClick={() => { handleClick("users"); setIsClicked(true); }}>사용자</Button1>
        <Button2 data-isclicked={ isClicked } onClick={() => { handleClick("articles"); setIsClicked(false); }}>게시글</Button2>
      </ButtonWrapper>

      {/* 메뉴에 따라 컴포넌트 변경 */}
      { searchCategory === "users" && (
        <SearchUsers searchWord={ searchWord } />
      )}

      { searchCategory === "articles" && (
        <SearchPosts />
      )}
    </>
  );
}

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  padding: 4rem 3rem 2rem;
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1};

  ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 2.4rem;

  span {
    font-size: 3rem;
    margin-right: 1rem;
  }
`;

const ButtonWrapper=styled.section`
  display: flex;
  justify-content: space-evenly;
  width:699px;
  height: 5rem;
  margin-bottom: 0.6rem;
  /* padding-bottom: 1.5rem; */
  border-bottom: 1px solid #E6E6E6;
  
  button {
    border: none;
    outline: none;
  }
`;

const Button1=styled.button`  
  ${({ theme }) => theme.fonts.bold};

  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 1.7rem;
  line-height: 1.25rem;
  /* identical to box height */

  text-align: center;
  color: ${props => props['data-isclicked'] ? '#000000' : '#C4C4C4'};
  padding-left: 10rem;
  padding-right: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  
  height:100%;
  
  position: relative; // 막대가 버튼 안에 고정되게 하기 위해

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.darkpurple_2};
    transition: width 0.3s;

    ${props => props['data-isclicked'] && css`
      width: 100%;
    `}
  }
`;

const Button2=styled.button`
  ${({ theme }) => theme.fonts.bold};

  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 1.7rem;
  line-height: 1.25rem;
  /* identical to box height */

  text-align: center;
  color: ${props => props['data-isclicked'] ? '#C4C4C4' : '#000000'};
  padding-left: 10rem;
  padding-right: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  
  height:100%;

  position: relative; // 막대가 버튼 안에 고정되게 하기 위해

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.darkpurple_2};
    transition: width 0.3s;

    ${props => !props['data-isclicked'] && css`
    width: 100%;
    `}
  }
`;
