import React from "react";
import SideChallengeCard from "./SideChallengeCard";
import HotPostCard from "./HotPostCard";
import SearchBar from "./SearchBar";
import { styled } from "styled-components";

export default function SideBar() {
  return (
    <>
      <Wrapper>
        <SearchBar />
        {/* 진행중인 도전과제 있을 경우 */}
        <TitleContainer>
          <h2>Challenge</h2>
        </TitleContainer>
        <SideChallengeCard />

        {/* 인기게시글 리스트 - 진행중인 도전과제 있으면 3개, 없으면 5개정도..? */}
        <TitleContainer>
          <h2>Hot Posts</h2>
        </TitleContainer>
        <HotPostCard idx="0" />
        <HotPostCard idx="1" />
        <HotPostCard idx="2" />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
  padding: 1rem 0;
`;

const TitleContainer = styled.div`
  h2 {
    ${({ theme }) => theme.fonts.bold};
    text-align: center;
    font-size: 2rem;
  }

  padding: 1rem 0;
`;
