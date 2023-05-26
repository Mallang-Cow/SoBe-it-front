import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useMutation } from "react-query"; // useQuery, useQueryClient
import { getHotPost } from "../../../api/getHotPost";
// import { likeArticle } from "../../../api/likeArticle";
// import { getArticleDetailData } from "../../../api/getArticleDetailData";

export default function HotPostCard(props) {
  // const { articleSeq } = props;

  const [data, setData] = useState([]);
  const newData = {
    userId: "test1",
  };

  useEffect(() => {
    hotPosts(newData);
  }, []);

  const { mutate: hotPosts } = useMutation(getHotPost, {
    onSuccess: (response) => {
      setData(response.data[props.idx]);
      // setThisArticleSeq(Number(article?.articleSeq));

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

  // const [thisArticleSeq, setThisArticleSeq] = useState(0);
  // const [thisUserId, setThisUserId] = useState("");

  // // 글 정보 가져오기
  // const {
  //   data: article,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery(["articleDetail", articleSeq], () => getArticleDetailData(articleSeq), {
  //   onSuccess: () => {
  //     setThisArticleSeq(Number(article?.articleSeq));
  //     setThisUserId(article?.user?.userId);
  //   },
  //   onError: () => {
  //     console.log("Error");
  //   },
  // });

  // // 좋아요
  // function clickLike() {
  //   like({ articleSeq: Number(articleSeq) });
  // }

  // const queryClient = useQueryClient();
  // // 좋아요 정보 Post 전송
  // const { mutate: like } = useMutation(likeArticle, {
  //   onSuccess: (response) => {
  //     queryClient.invalidateQueries("articleDetail");
  //   },
  //   onError: () => {
  //     console.log("error");
  //   },
  // });
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
                  // clickLike();
                }}>
                favorite
              </span>
            ) : (
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  // clickLike();
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
