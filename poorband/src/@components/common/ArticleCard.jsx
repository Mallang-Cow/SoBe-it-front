import React, { useState } from "react";
import { getArticleDetailData } from "../../../api/getArticleDetailData";
import { ARTICLE_DETAIL } from "../../../core/articleData";
import { CATEGORY } from "../../../core/expenditureCategory";
import { styled } from "styled-components";
import { TIER } from "../../../core/tierImage";
import { theme } from "../../style/theme";

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
      <ProfileContainer>
        <img id="profile-img" src={ARTICLE_DETAIL.user.profileImageUrl} alt="프로필사진" />
        <div id="name-container">
          <span className="bold">{ARTICLE_DETAIL.user.nickname}</span>
          <img id="tier-img" src={TIER[ARTICLE_DETAIL.user.userTier]} alt="티어" />
          <span className="bold">@{ARTICLE_DETAIL.user.userId}</span>
          <span className="grey">• {ARTICLE_DETAIL.writtenDate}</span>
        </div>

        {/* 현재 시간과 비교해서 보여주기 */}
        {status === 1 && <span className="grey">전체 공개</span>}
        {status === 2 && <span className="grey">맞팔 공개</span>}
        {status === 3 && <span className="grey">비공개</span>}
        {isMine && <span className="material-symbols-outlined">more_vert</span>}
        {/* 더보기 아이콘 넣기 */}
      </ProfileContainer>

      <hr />

      <TitleContainer>{articleType === 1 ? <span>지출 내역</span> : <span>결재 내역</span>}</TitleContainer>

      <hr />
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
      <hr className="dot" />
      <PriceContainer>
        <span>금액</span>
        <span>{ARTICLE_DETAIL.amount}원</span>
      </PriceContainer>

      {articleType === 2 && (
        <VContatiner>
          {isVoted ? (
            <VoteResultContainer>
              <div className="container">
                <span>허가 {ARTICLE_DETAIL.agree}</span>
                <span>불허 {ARTICLE_DETAIL.disagree}</span>
              </div>

              <div className="container">
                <span>{ARTICLE_DETAIL.agreeRate}</span>
                <span>{ARTICLE_DETAIL.disagreeRate}</span>
              </div>

              {/* 그래프 */}
              <span>그래프</span>
            </VoteResultContainer>
          ) : (
            <VoteContainer>
              <Button>허가</Button>
              <Button>불허</Button>
            </VoteContainer>
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
  background-color: ${({ theme }) => theme.colors.white};
  padding: 3rem;
  * {
    margin: 0.5rem;
  }

  hr {
    margin: 0;
    background: ${({ theme }) => theme.colors.lightgrey_1};
    height: 0.1rem;
    border: 0;
  }
  hr.dot {
    margin: 0;
    background: ${({ theme }) => theme.colors.lightgrey_1};
    height: 0.1rem;
    border: 0;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  #profile-img {
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
  }

  #name-container {
    width: 100%;
    display: flex;
    align-items: center;
  }
  span.bold {
    font: ${({ theme }) => theme.fonts.bold};
  }
  span.grey {
    font: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.grey};
    width: fit-content;
    block-size: fit-content;
  }

  #tier-img {
    width: 2rem;
    height: 2rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  font: ${({ theme }) => theme.fonts.bold};
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
  img {
    width: 30rem;
    height: 30rem;
    border-radius: 1rem;
  }
`;
const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const VContatiner = styled.div`
  height: fit-content;
  margin: 0;
`;
const VoteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    width: 100%;
    height: 4rem;
    border-radius: 1.5rem;
    background-color: ${({ theme }) => theme.colors.lightpurple};
  }
  button:hover {
    background-color: ${({ theme }) => theme.colors.mainpurple};
  }
  button:focus {
    outline: none;
  }
`;
const VoteResultContainer = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.lightpurple};
  border-radius: 1.5rem;
  .container {
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const Button = styled.button``;
const FooterContainer = styled.div``;
