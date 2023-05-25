import React from "react";
import SideChallengeCard from "./SideChallengeCard";
import HotPostCard from "./HotPostCard";
import SearchBar from "./SearchBar";
import { styled } from "styled-components";

export default function SideBar() {
  return (
    <>
      <Wrapper>
        <SearchBarWrapper>
          <SearchBar />
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
            <HotPostCard idx="0" />
          </HotPostCardWrapper>
          <HotPostCardWrapper>
            <HotPostCard idx="1" />
          </HotPostCardWrapper>
          <HotPostCardWrapper>
            <HotPostCard idx="2" />
          </HotPostCardWrapper>
        </HotPostWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
  padding: 1rem 0;

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
  background-color: ${({ theme }) => theme.colors.lightgrey_1};
  margin: 1rem 2rem;

  border-radius: 1px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12), 0 2px 3px 0 rgba(0, 0, 0, 0.22);
`;

const ChallengeWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.lightgrey_1};
  margin: 1rem 2rem;

  border-radius: 1px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12), 0 2px 3px 0 rgba(0, 0, 0, 0.22);
`;

const HotPostWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.lightgrey_1};
  margin: 1rem 2rem;

  border-radius: 1px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12), 0 2px 3px 0 rgba(0, 0, 0, 0.22);
`;

const HotPostCardWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  margin: 1rem 2rem;

  border-radius: 1px;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.22);
`;
