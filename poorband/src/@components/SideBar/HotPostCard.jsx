import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { SIDEBAR_DETAIL } from "../../../core/sideBarData";
import { useMutation } from "react-query";
import { getHotPost } from "../../../api/getHotPost";
export default function HotPostCard(props) {
  const [data, setData] = useState([]);
  const newData = {
    userId: "test1",
  };

  useEffect(() => {
    // hotPosts(newData);
  }, []);

  const { mutate: hotPosts } = useMutation(getHotPost, {
    onSuccess: (response) => {
      setData(response.data[props.idx]);
      console.log(response.data[0]);
      console.log(data?.user?.profileImageUrl);
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        console.log("인기 게시물 가져오기 실패");
      }
    },
  });

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
        <img id="profile-image" src="{data?.user?.profileImageUrl}" alt="프로필사진" />
        <span>{data?.user?.nickname}</span>
      </ProfileWrapper>
      <ReceiptContainer>
        <h1>{data?.articleText}</h1>
        <hr></hr>
        <div id="price">
          <span>{data?.articleSeq}</span>
          <span>금액</span>
          <span>{data?.amount}원</span>
        </div>
        <CountInfoWrapper>
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
        </CountInfoWrapper>
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
const CountInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;
