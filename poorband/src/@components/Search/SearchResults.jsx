import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import SearchUsers from "./SearchUsers";
import SearchPosts from "./SearchPosts";

export default function SearchResults(props) {
  const [isClicked, setIsClicked] = useState(true);
  const [searchCategory, setSearchCategory] = useState("users");
  const { searchWord, setCenterContent, setUserId } = props;
  const [scrollposition, setscrollposition] = useState(false);

  const handleScroll = () => {
    if (scrollY > 50) setscrollposition(true);
    else setscrollposition(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleClick = (type) => {
    setSearchCategory(type);
  };

  return (
    <>
      <HeaderContainer scrollposition={scrollposition}>
        <header>'{searchWord}' Search Results</header>
      </HeaderContainer>

      {/* 메뉴 */}
      <ButtonWrapper>
        <Button1
          data-isclicked={isClicked}
          onClick={() => {
            handleClick("users");
            setIsClicked(true);
          }}>
          사용자
        </Button1>
        <Button2
          data-isclicked={isClicked}
          onClick={() => {
            handleClick("articles");
            setIsClicked(false);
          }}>
          게시글
        </Button2>
      </ButtonWrapper>

      {/* 메뉴에 따라 컴포넌트 변경 */}
      {searchCategory === "users" && (
        <SearchUsers searchWord={searchWord} setCenterContent={setCenterContent} setUserId={setUserId} />
      )}

      {searchCategory === "articles" && <SearchPosts searchWord={searchWord} />}
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
  border-bottom: 1px solid
    ${({ theme, scrollposition }) => (scrollposition ? theme.colors.lightgrey_1 : theme.colors.white)};

  ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 2.4rem;

  span {
    font-size: 3rem;
    margin-right: 1rem;
  }
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: space-evenly;
  width: 699px;
  height: 5rem;
  margin-bottom: 0.6rem;
  /* padding-bottom: 1.5rem; */
  border-bottom: 1px solid #e6e6e6;

  button {
    border: none;
    outline: none;
  }
`;

const Button1 = styled.button`
  ${({ theme }) => theme.fonts.bold};
  width: 50%;
  font-size: 1.6rem;

  text-align: center;
  color: ${(props) => (props["data-isclicked"] ? "#000000" : "#C4C4C4")};
  padding-left: 10rem;
  padding-right: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  position: relative; // 막대가 버튼 안에 고정되게하기 위해

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.mainpurple};
    transition: width 0.3s;

    ${(props) =>
      props["data-isclicked"] &&
      css`
        width: 100%;
      `}
  }
`;

const Button2 = styled.button`
  ${({ theme }) => theme.fonts.bold};
  width: 50%;
  font-family: "Spoqa Han Sans Neo";
  font-style: normal;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.25rem;
  /* identical to box height */

  text-align: center;
  color: ${(props) => (props["data-isclicked"] ? "#C4C4C4" : "#000000")};
  padding-left: 10rem;
  padding-right: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  position: relative; // 막대가 버튼 안에 고정되게하기 위해

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.mainpurple};
    transition: width 0.3s;

    ${(props) =>
      !props["data-isclicked"] &&
      css`
        width: 100%;
      `}
  }
`;
