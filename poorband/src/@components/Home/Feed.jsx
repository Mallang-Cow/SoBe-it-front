import React, { useState } from "react";
import ArticleCard from "../common/ArticleCard";
import { styled } from "styled-components";
import { useInView } from "react-intersection-observer";

export default function Feed(props) {
  const { setCenterContent, setArticleSeq, setUserSeq } = props;
  const [articleType, setArticleType] = useState();

  return (
    <FeedWrapper>
      {/* ArticleCard 가져와서 무한스크롤~ */}
      <ArticleWrapper>
        <ArticleCard
          articleSeq={141}
          setCenterContent={setCenterContent}
          setArticleSeq={setArticleSeq}
          setUserSeq={setUserSeq}
          setArticleType={setArticleType}
          clickActive={true}
        />
      </ArticleWrapper>

      {/* <ArticleCard /> */}
      {/* <ArticleCard /> */}
    </FeedWrapper>
  );
}

const FeedWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.5rem;
`;

const ArticleWrapper = styled.div`
  margin: 2.5rem 0;
`;
