import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query"; // useQuery, useQueryClient
import { getHotPost } from "../../../api/getHotPost";
import { getArticleDetailData } from "../../../api/getArticleDetailData";
import { likeArticle } from "../../../api/likeArticle";
import { userIdState } from "../../recoil/userId";
import { useRecoilState } from "recoil";

// import { likeArticle } from "../../../api/likeArticle";
// import { getArticleDetailData } from "../../../api/getArticleDetailData";

export default function HotPostCard(props) {
  const { clickActive, setCenterContent, setArticleSeq } = props;

  const [data, setData] = useState([]);

  const [thisArticleSeq, setThisArticleSeq] = useState(null);
  const [thisUserId, setThisUserId] = useState("");
  const [userId, setUserId] = useRecoilState(userIdState);

  // const newData = {
  //   userId: "test1",
  // };
  // console.log(thisArticleSeq);

  useEffect(() => {
    hotPosts();
  }, []);

  const { mutate: hotPosts } = useMutation(getHotPost, {
    onSuccess: (response) => {
      setData(response?.data[props.idx]);
      setThisArticleSeq(Number(response?.data[props.idx]?.articleSeq));
      // console.log(response?.data[props.idx]?.articleSeq);
      // console.log(data?.user?.profileImageUrl);
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

  // 글 작성자 프로필 페이지로 이동
  function goToProfile() {
    setUserId(data?.user?.userId);
    setCenterContent("profile");
  }
  return (
    <>
      {data && (
        <Wrapper>
          <ProfileWrapper
            onClick={() => {
              goToProfile();
            }}>
            <img id="profile-image" src={data?.user?.profileImageUrl} alt="프로필사진" />
            <span>{data?.user?.nickname}</span>
          </ProfileWrapper>
          <ReceiptContainer
            clickActive={clickActive}
            onClick={() => {
              goToArticleDetail();
            }}>
            <h1>{data?.articleText}</h1>
            <hr></hr>
            <div id="price">
              <span>금액</span>
              <span>{data?.amount?.toLocaleString()}원</span>
            </div>{" "}
          </ReceiptContainer>

          <CountInfoWrapper>
            <Like onClick={handleLike}>
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
            </Like>
            <span>{data?.likeCnt}</span>
            <div>
              <span className="material-symbols-outlined">chat_bubble</span>
            </div>
            <span>{data?.commentCnt}</span>
          </CountInfoWrapper>
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
