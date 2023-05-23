import React from "react";
import { styled } from "styled-components";

export default function HotPostCard(props) {
  const now = 60;

  return (
    <Wrapper>
      <ProfileWrapper>
        <img
          id="profile-image"
          src="https://item.kakaocdn.net/do/1d495862f49c38232ca8b6cc6a9679a0effd194bae87d73dd00522794070855d"
          alt="프로필사진"
        />
        <span>닉네임</span>
      </ProfileWrapper>
      <ReceiptContainer>
        <h1>바쁘다바빠현대사회속단비같은쾌락추구</h1>
        <hr></hr>
        <div id="price">
          <span>금액</span>
          <span>1200원</span>
        </div>
        <span>❤️ 하트</span>
        <span>🗨️ 댓글</span>
      </ReceiptContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #eee;
  padding: 1rem;
  * {
    margin: 0.5rem;
  }
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
`;
