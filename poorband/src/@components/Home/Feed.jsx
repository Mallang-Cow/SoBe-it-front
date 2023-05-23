import React from "react";
import ArticleCard from "../common/ArticleCard";
import { styled } from "styled-components";

export default function Feed() {
  return (
    <FeedWrapper>
      {/* ArticleCard 가져와서 무한스크롤~ */}
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </FeedWrapper>
  );
}

const FeedWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

