import React, { useState } from "react";
import { getArticleDetailData } from "../../../api/getArticleDetailData";
import { ARTICLE_DETAIL } from "../../../core/articleData";
import { CATEGORY } from "../../../core/expenditureCategory";
import { styled } from "styled-components";

export default function ArticleCard(props) {
  const nowTime = new Date();
  const [articleType, setArticleType] = useState(ARTICLE_DETAIL.articleType);
  const [status, setStatus] = useState(ARTICLE_DETAIL.status);
  const [isMine, setIsMine] = useState(ARTICLE_DETAIL.isMine);
  const [category, setCategory] = useState(ARTICLE_DETAIL.expenditureCategory);
  const [img, setImg] = useState(ARTICLE_DETAIL.imageUrl);
  const [isLiked, setIsLiked] = useState(ARTICLE_DETAIL.liked);
  const [isVoted, setIsVoted] = useState(ARTICLE_DETAIL.voted);
  return (
    <Wrapper>
      <HeaderContainer>{articleType === 1 ? <header>지출 내역</header> : <header>결재 내역</header>}</HeaderContainer>

      <ProfileContainer>
        <img src={ARTICLE_DETAIL.user.profileImageUrl} alt="프로필사진" />
        <span>{ARTICLE_DETAIL.nickName}</span>
        <span>{ARTICLE_DETAIL.user.userTier}</span>
        <span>{ARTICLE_DETAIL.user.userId}</span>
        <span>{ARTICLE_DETAIL.writtenDate}</span>
        {/* 현재 시간과 비교해서 보여주기 */}
        {status === 1 && <span>전체 공개</span>}
        {status === 2 && <span>맞팔 공개</span>}
        {status === 3 && <span>비공개</span>}
        {isMine && <span>더보기 아이콘</span>}
        {/* 더보기 아이콘 넣기 */}
      </ProfileContainer>

      <TitleContainer>{articleType === 1 ? <span>지출 내역</span> : <span>결재 내역</span>}</TitleContainer>

      {/* 지출 내역 - 날짜, 분류 */}
      {articleType === 1 && (
          <DateContiner>
            <span>날짜</span>
            <span>{ARTICLE_DETAIL.consumptionDate}</span>
          </DateContiner>
        ) && (
          <CategoryContainer>
            <span>분류</span>
            <span>{CATEGORY[category]}</span>
          </CategoryContainer>
        )}

      <ContextContainer>
        <span>내용</span>
        <p>{ARTICLE_DETAIL.articleText}</p>
      </ContextContainer>
      {img && (
        <ImageContainer>
          <img src={img} alt="이미지"></img>
        </ImageContainer>
      )}
      <PriceContainer>
        <span>금액</span>
        <span>{ARTICLE_DETAIL.amount}원</span>
      </PriceContainer>

      {articleType === 2 && (
        <VContatiner>
          {isVoted ? (
            <VoteContainer>
              <Button>허가</Button>
              <Button>불허</Button>
            </VoteContainer>
          ) : (
            <VoteResultContainer>
              <span>허가 {ARTICLE_DETAIL.agree}</span>
              <span>불허 {ARTICLE_DETAIL.disagree}</span>
              <span>{ARTICLE_DETAIL.agreeRate}</span>
              <span>{ARTICLE_DETAIL.disagreeRate}</span>
              {/* 그래프 */}
              <span></span>
            </VoteResultContainer>
          )}
        </VContatiner>
      )}

      <FooterContainer>
        {isLiked ? <span>찬하트</span> : <span>빈하트</span>}
        {/* 하트 아이콘 추가 */}
        <span>{ARTICLE_DETAIL.likeCnt}</span>
        <span>댓글</span>
        {/* 댓글아이콘 추가 */}
        <span>{ARTICLE_DETAIL.commentCnt}</span>
      </FooterContainer>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background-color: white;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  background-color: red;
  display: flex;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  background-color: blue;
  display: flex;
  justify-content: center;
`;

const DateContiner = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ContextContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const VContatiner = styled.div``;
const VoteContainer = styled.div``;
const VoteResultContainer = styled.div``;

const Button = styled.button``;
const FooterContainer = styled.div``;
