import React from "react";
import SideChallengeCard from "./SideChallengeCard";
import HotPostCard from "./HotPostCard";
import SearchBar from "./SearchBar";
import { styled } from "styled-components";

import "bootstrap/dist/css/bootstrap.css";

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
        <HotPostCard />
        <HotPostCard />
        <HotPostCard />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background-color: #eee;
`;

const TitleContainer = styled.div`
  h2 {
    text-align: center;
    font-size: 2rem;
  }
`;
