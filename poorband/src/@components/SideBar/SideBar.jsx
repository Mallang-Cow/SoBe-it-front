import React, { useState } from "react";
import SideChallengeCard from "./SideChallengeCard";
import HotPostCard from "./HotPostCard";
import SearchBar from "./SearchBar";
import { styled } from "styled-components";

export default function SideBar(props) {
  const { setCenterContent, articleSeq, setArticleSeq, setUserId, clickactive, nowUser, searchWord, setSearchWord } =
    props;
  const [thisArticleSeq, setThisArticleSeq] = useState(0);
  const [thisUserId, setThisUserId] = useState("");

  return (
    <>
      <Wrapper>
        <SearchBarWrapper>
          <SearchBar
            setCenterContent={setCenterContent}
            // setUserId={ setUserId }
            // setArticleSeq={ setArticleSeq }
            searchWord={searchWord}
            setSearchWord={setSearchWord}
          />
          {/* 진행중인 도전과제 있을 경우 */}
        </SearchBarWrapper>
        <ChallengeWrapper>
          <TitleContainer>
            <h2>Challenge</h2>
          </TitleContainer>
          <SideChallengeCard />
        </ChallengeWrapper>
        {/* 인기게시글 리스트 - 진행중인 도전과제 있으면 3개, 없으면 5개정도..? */}
        <HotPostWrapper>
          <TitleContainer>
            <h2>Hot Posts</h2>
          </TitleContainer>
          <HotPostCardWrapper>
            <HotPostCard
              idx="0"
              setArticleSeq={setArticleSeq}
              setCenterContent={setCenterContent}
              setUserId={setUserId}
              clickactive={clickactive}
            />
          </HotPostCardWrapper>
          <HotPostCardWrapper>
            <HotPostCard
              idx="1"
              setArticleSeq={setArticleSeq}
              setCenterContent={setCenterContent}
              setUserId={setUserId}
              clickactive={clickactive}
            />
          </HotPostCardWrapper>
          <HotPostCardWrapper>
            <HotPostCard
              idx="2"
              setArticleSeq={setArticleSeq}
              setCenterContent={setCenterContent}
              setUserId={setUserId}
              clickactive={clickactive}
            />
          </HotPostCardWrapper>
        </HotPostWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100%;
  margin-left: 1rem;
  margin-top: 4rem;
  background-color: ${({ theme }) => theme.fonts.white};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TitleContainer = styled.div`
  h2 {
    ${({ theme }) => theme.fonts.bold};

    text-align: center;
    font-size: 2rem;
  }

  padding: 1rem 0;
`;

const SearchBarWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.darkpurple};
  margin-bottom: 1rem;
  height: 4.5rem;
`;

const ChallengeWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.darkpurple};
  margin-bottom: 1rem;
`;

const HotPostWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.darkpurple};
  margin-bottom: 1rem;
  padding: 0 1rem;
`;

const HotPostCardWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 1rem;
  border-radius: 1px;
`;
