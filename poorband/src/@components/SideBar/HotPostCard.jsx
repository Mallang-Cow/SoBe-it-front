import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query"; // useQuery, useQueryClient
import { getHotPost } from "../../../api/getHotPost";
import { getArticleDetailData } from "../../../api/getArticleDetailData";
import { likeArticle } from "../../../api/likeArticle";

// import { likeArticle } from "../../../api/likeArticle";
// import { getArticleDetailData } from "../../../api/getArticleDetailData";

export default function HotPostCard(props) {
  const { clickActive, setCenterContent, setArticleSeq } = props;

  const [data, setData] = useState([]);

  const [thisArticleSeq, setThisArticleSeq] = useState(null);
  const [thisUserId, setThisUserId] = useState("");

  const newData = {
    userId: "test1",
  };
  // console.log(thisArticleSeq);

  useEffect(() => {
    hotPosts(newData);
  }, []);

  const { mutate: hotPosts } = useMutation(getHotPost, {
    onSuccess: (response) => {
      setData(response?.data[props.idx]);
      setThisArticleSeq(Number(response?.data[props.idx]?.articleSeq));
      // console.log(response?.data[props.idx]?.articleSeq);
      // console.log(response.data[0]);
      // console.log(data?.user?.profileImageUrl);
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        console.log("인기 게시물 가져오기 실패");
      }
    },
  });

  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  let content = null;
  if (liked === true) {
    content = <span className="material-symbols-outlined">favorite</span>;
  } else {
    content = <span className="material-symbols-outlined">favorite</span>;
  }

  function goToArticleDetail() {
    // 상세 페이지의 경우 디테일 페이지 이동 클릭 비활성화 (clickActive=false)
    if (clickActive) {
      setArticleSeq(thisArticleSeq);
      setCenterContent("detail");
    }
  }

  function clickLike() {
    like({ articleSeq: Number(thisArticleSeq) });
  }

  const queryClient = useQueryClient();
  // 좋아요 정보 Post 전송
  const { mutate: like } = useMutation(likeArticle, {
    onSuccess: (response) => {
      // console.log(response);
      hotPosts(thisArticleSeq);
    },
    onError: () => {
      console.log("error");
    },
  });
  return (
    <>
      {data && (
        <Wrapper
          clickActive={clickActive}
          onClick={() => {
            goToArticleDetail();
          }}>
          <ProfileWrapper>
            <img id="profile-image" src="{data?.user?.profileImageUrl}" alt="프로필사진" />
            <span>{data?.user?.nickname}</span>
          </ProfileWrapper>
          <ReceiptContainer>
            <h1>{data?.articleText}</h1>
            <hr></hr>
            <div id="price">
              <span>금액</span>
              <span>{data?.amount?.toLocaleString()}원</span>
            </div>
            <CountInfoWrapper>
              <div className="likeIcon" onClick={handleLike}>
                {liked ? (
                  <span
                    id="filledIcon"
                    className="material-symbols-outlined"
                    onClick={() => {
                      clickLike();
                      console.log("click1");
                    }}>
                    favorite
                  </span>
                ) : (
                  <span
                    className="material-symbols-outlined"
                    onClick={() => {
                      clickLike();
                      console.log("click2");
                    }}>
                    favorite
                  </span>
                )}
              </div>
              <span>{data?.likeCnt}</span>
              <div>
                <span className="material-symbols-outlined">chat_bubble</span>
              </div>
              <span>{data?.commentCnt}</span>
            </CountInfoWrapper>
          </ReceiptContainer>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  cursor: ${({ clickActive }) => clickActive && "pointer"};

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
    border-top: 1px dashed red;
    margin: 0;
    background: ${({ theme }) => theme.colors.lightgrey_2};
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
  justify-content: flex-start;
  align-items: center;
`;
const Like = styled.div`
  display: flex;
  margin: 0 2rem 0 0;
  align-items: center;

  p {
    font-size: 1.4rem;
    margin-left: 1rem;
  }
  span.material-symbols-rounded:hover {
    color: ${({ theme }) => theme.colors.red};
  }
  span.active.material-symbols-rounded {
    color: ${({ theme }) => theme.colors.red};
  }
`;
