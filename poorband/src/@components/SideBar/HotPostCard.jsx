import React, { useState } from "react";
import { styled } from "styled-components";
import { SIDEBAR_DETAIL } from "../../../core/sideBarData";

export default function HotPostCard(props) {
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };

  let content = null;
  if (like === true) {
    content = <span className="material-symbols-outlined">favorite</span>;
  } else {
    content = <span className="material-symbols-outlined">favorite</span>;
  }
  return (
    <Wrapper>
      <ProfileWrapper>
        <img id="profile-image" src={SIDEBAR_DETAIL.user.profileImageUrl} alt="프로필사진" />
        <span>{SIDEBAR_DETAIL.user.nickname}</span>
      </ProfileWrapper>
      <ReceiptContainer>
        <h1>{SIDEBAR_DETAIL.articleText}</h1>
        <hr></hr>
        <div id="price">
          <span>금액</span>
          <span>{SIDEBAR_DETAIL.amount}원</span>
        </div>
        <div className="likeIcon" onClick={handleLike}>
          {like ? (
            <span id="filledIcon" className="material-symbols-outlined">
              favorite
            </span>
          ) : (
            <span className="material-symbols-outlined">favorite</span>
          )}
        </div>
        <span>{SIDEBAR_DETAIL.likeCnt}</span>
        <div>
          <span className="material-symbols-outlined">chat_bubble</span>
        </div>
        <span>{SIDEBAR_DETAIL.commentCnt}</span>
      </ReceiptContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem 1rem;
  * {
    margin: 0.5rem;
  }
  ${({ theme }) => theme.fonts.regular};
  font-size: 1.2rem;
`;

const ProfileWrapper = styled.div`
  background-color: white;

  #profile-image {
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
  }

  h2 {
    text-align: center;
    font-size: 2rem;
  }

  hr {
    margin: 0;
    background: ${({ theme }) => theme.colors.black};
    height: 0.1rem;
    border: 0;
  }
`;

const ReceiptContainer = styled.div`
  #price {
    display: flex;
    justify-content: flex-end;
  }

  #filledIcon {
    fill: 1;
    color: red;
  }
`;
