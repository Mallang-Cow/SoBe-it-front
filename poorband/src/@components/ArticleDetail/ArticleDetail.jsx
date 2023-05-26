import React, { useState } from "react";
import ArticleCard from "../common/ArticleCard";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import { getArticleDetailData } from "../../../api/getArticleDetailData";
import { useQuery } from "react-query";
import { styled } from "styled-components";

export default function ArticleDetail(props) {
  const { articleSeq, setCenterContent, setArticleSeq, setUserId } = props;
  // const { data } = useQuery(["articleData"], getArticleDetailData, {});
  const [articleType, setArticleType] = useState(1);
  const [clickActive, setClickActive] = useState(false);

  return (
    <>
      <HeaderContainer>
        <span className="material-symbols-rounded">arrow_back</span>
        {articleType === 1 ? <header>지출 내역</header> : <header>결재 내역</header>}
      </HeaderContainer>
      <ContentWrapper>
        <ArticleWrapper>
          <ArticleCard
            articleSeq={Number(articleSeq)}
            setArticleType={setArticleType}
            clickActive={clickActive}
            setCenterContent={setCenterContent}
            setArticleSeq={setArticleSeq}
            setUserId={setUserId}
          />
        </ArticleWrapper>

        <CommentForm />

        <CommentCard />
        <CommentCard />
        <ReCommentWrapper>
          <Temp></Temp>
          <CommentCard />
        </ReCommentWrapper>
      </ContentWrapper>
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

const ArticleWrapper = styled.div`
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1}; */
  margin-bottom: 2.5rem;
`;

const ContentWrapper = styled.div``;

const ReCommentWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Temp = styled.div`
  width: 10rem;
`;
