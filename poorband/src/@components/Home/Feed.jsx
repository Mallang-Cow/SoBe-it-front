import React from "react";
import ArticleCard from "../common/ArticleCard";
import { styled } from "styled-components";

export default function Feed(props) {
  const { setCenterContent, setArticleSeq } = props;

  function goToArticleDetail(articleSeq) {
    setArticleSeq(articleSeq);
    setCenterContent("detail");
  }
  return (
    <FeedWrapper>
      {/* ArticleCard 가져와서 무한스크롤~ */}
      <ArticleWrapper
        onClick={() => {
          goToArticleDetail(142);
        }}>
        <ArticleCard articleSeq={142} />
      </ArticleWrapper>
      <ArticleWrapper
        onClick={() => {
          goToArticleDetail(145);
        }}>
        <ArticleCard articleSeq={145} />
      </ArticleWrapper>
      <ArticleWrapper
        onClick={() => {
          goToArticleDetail(145);
        }}>
        <ArticleCard articleSeq={145} />
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
  cursor: pointer;
  margin: 2.5rem 0;
`;
