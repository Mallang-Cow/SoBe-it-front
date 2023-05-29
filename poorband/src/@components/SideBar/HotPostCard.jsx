import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query"; // useQuery, useQueryClient
import { getHotPost } from "../../../api/getHotPost";
import { getArticleDetailData } from "../../../api/getArticleDetailData";
import { likeArticle } from "../../../api/likeArticle";
import { userIdState } from "../../recoil/userId";
import { useRecoilState } from "recoil";
import { TIER } from "../../../core/tierImage";
import { profileImg } from "../../../core/defaultImg";

// import { likeArticle } from "../../../api/likeArticle";
// import { getArticleDetailData } from "../../../api/getArticleDetailData";

export default function HotPostCard(props) {
  const { clickactive, setCenterContent, setArticleSeq, idx } = props;

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
      setData(response?.data[idx]);
      setThisArticleSeq(Number(response?.data[idx]?.articleSeq));
      // console.log(response?.data[props.idx]?.liked);
      // console.log(data?.user?.profileImageUrl);
      // console.log(data?.user?.profileImageUrl);
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        console.log("인기 게시물 가져오기 실패");
      }
    },
  });

  const [liked, setLiked] = useState(data?.liked);

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
    // 상세 페이지의 경우 디테일 페이지 이동 클릭 비활성화 (clickactive=false)
    if (clickactive) {
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

  const onErrorImg = (e) => {
    e.target.src = profileImg;
  };
  return (
    <>
      {data && (
        <Wrapper>
          <ProfileWrapper
            onClick={() => {
              goToProfile();
            }}>
            <img
              id="profile-image"
              src={data?.user?.profileImageUrl || profileImg}
              alt="프로필사진"
              onError={onErrorImg}
            />
            <p className="nickname">{data?.user?.nickname}</p>
            <p className="id">@{data?.user?.userId}</p>
            <img id="tier-image" src={TIER[data?.user?.userTier]} alt="티어" />
          </ProfileWrapper>
          <ReceiptContainer
            clickactive={clickactive}
            onClick={() => {
              goToArticleDetail();
            }}>
            <TextContainer>
              <p>{data?.articleText}</p>{" "}
            </TextContainer>
            <PriceContainer>
              <p className="regular">금액</p>
              <p className="bold">{data?.amount?.toLocaleString()}원</p>
            </PriceContainer>
          </ReceiptContainer>

          <CountInfoWrapper>
            <Like>
              {data?.liked ? (
                <span
                  className="material-symbols-rounded active"
                  onClick={() => {
                    clickLike();
                    console.log("click1");
                  }}>
                  favorite
                </span>
              ) : (
                <span
                  className="material-symbols-rounded"
                  onClick={() => {
                    clickLike();
                    console.log("click2");
                  }}>
                  favorite
                </span>
              )}
            </Like>
            <p>{data?.likeCnt}</p>
            <div>
              <span className="material-symbols-rounded">comment</span>
            </div>
            <p>{data?.commentCnt}</p>
          </CountInfoWrapper>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.fonts.regular};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 1.2rem;
  padding: 1.5rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;

  p {
    ${({ theme }) => theme.fonts.bold};
    font-size: 1.4rem;
    margin-left: 0.5rem;
  }
  p.id {
    color: ${({ theme }) => theme.colors.darkgrey_1};
    font-size: 1.4rem;
  }

  #profile-image {
    background-color: red;
    width: 3rem;
    height: 3rem;
    border-radius: 0.5rem;
  }

  #tier-image {
    margin-left: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const ReceiptContainer = styled.div`
  cursor: pointer;
`;
const TextContainer = styled.div`
  margin-bottom: 1rem;
  padding: 1rem 0;
  ${({ theme }) => theme.fonts.bold};
  font-size: 1.4rem;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.lightgrey_1};
`;
const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  .regular {
    ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.darkgrey_2};
  }
  .bold {
    ${({ theme }) => theme.fonts.bold};
  }
`;

const CountInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;

  p {
    font-size: 1.2rem;
    margin: 0 0.5rem;
  }
  span.material-symbols-rounded {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.black};
  }
`;
const Like = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  span.material-symbols-rounded:hover {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.red};
  }
  span.active.material-symbols-rounded {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.red};
  }
`;
