import React from "react";
import ArticleCard from "../common/ArticleCard";
import { styled } from "styled-components";
import { useInView } from 'react-intersection-observer';

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
          goToArticleDetail(3);
        }}>
        <ArticleCard articleSeq={3} />
      </ArticleWrapper>
      <ArticleWrapper
        onClick={() => {
          goToArticleDetail(13);
        }}>
        <ArticleCard articleSeq={13} />
      </ArticleWrapper>
      <ArticleWrapper
        onClick={() => {
          goToArticleDetail(21);
        }}>
        <ArticleCard articleSeq={21} />
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
