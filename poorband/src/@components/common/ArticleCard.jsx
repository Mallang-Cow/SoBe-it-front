import React, { useEffect, useState } from "react";
import { getArticleDetailData } from "../../../api/getArticleDetailData";
import { ARTICLE_DETAIL } from "../../../core/articleData";
import { CATEGORY } from "../../../core/expenditureCategory";
import { styled } from "styled-components";
import { TIER } from "../../../core/tierImage";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { likeArticle } from "../../../api/likeArticle";
import { voteArticle } from "../../../api/vote";
import ProgressBar from "./ProgressBar";
import { userIdState } from "../../recoil/userId";
import { useRecoilState } from "recoil";
import { deleteArticle } from "../../../api/deleteArticle";

export default function ArticleCard(props) {
  const { articleSeq, setArticleSeq, setCenterContent, setArticleType, clickActive, setReloadFeed, onPage } = props;
  const [thisArticleSeq, setThisArticleSeq] = useState(0);
  const [thisUserId, setThisUserId] = useState("");
  const [time, setTime] = useState([]);
  const [userId, setUserId] = useRecoilState(userIdState);
  const nowTime = new Date();

  // 글 정보 가져오기
  const {
    data: article,
    isLoading,
    isError,
    error,
  } = useQuery(["articleDetail", articleSeq], () => getArticleDetailData(Number(articleSeq)), {
    onSuccess: (response) => {
      setThisArticleSeq(Number(response?.articleSeq));
      setThisUserId(response?.user?.userId);
    },
    onError: () => {
      console.log("Error");
    },
  });

  // 글번호 & 글타입 & 날짜 구하기
  useEffect(() => {
    setArticleType(article?.articleType);
    const artDate = new Date(article?.writtenDate);
    if (artDate.getFullYear() != nowTime.getFullYear())
      setTime(["year", nowTime.getFullYear() - artDate.getFullYear()]); // 연도차이
    if (artDate.getMonth() != nowTime.getMonth())
      setTime(["month", nowTime.getMonth() - artDate.getMonth()]); // 달 차이
    else if (artDate.getDate() != nowTime.getDate())
      setTime(["date", nowTime.getDate() - artDate.getDate()]); // 일 차이
    else if (artDate.getHours() != nowTime.getHours())
      setTime(["hours", nowTime.getHours() - artDate.getHours()]); // 시간 차이
    else if (artDate.getMinutes() != nowTime.getMinutes())
      setTime(["minutes", nowTime.getMinutes() - artDate.getMinutes()]); // 분 차이
    else setTime(["seconds", nowTime.getSeconds() - artDate.getSeconds()]); // 초 차이
  }, [thisArticleSeq]);

  // 상세 페이지로 이동
  function goToArticleDetail() {
    // 상세 페이지의 경우 디테일 페이지 이동 클릭 비활성화 (clickActive=false)
    if (clickActive) {
      setArticleSeq(thisArticleSeq);
      setCenterContent("detail");
      window.scrollTo(0, 0);
    }
  }

  // 글 작성자 프로필 페이지로 이동
  function goToProfile() {
    setUserId(thisUserId);
    setCenterContent("profile");
  }

  // 좋아요
  function clickLike() {
    like({ articleSeq: Number(articleSeq) });
  }

  const queryClient = useQueryClient();
  // 좋아요 정보 Post 전송
  const { mutate: like } = useMutation(likeArticle, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("articleDetail");
    },
    onError: () => {
      console.log("error");
    },
  });

  // 투표하기
  function clickVote(voteType) {
    vote({ articleSeq: Number(articleSeq), voteType: Number(voteType) });
  }

  // 투표 정보 Post 전송
  const { mutate: vote } = useMutation(voteArticle, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("articleDetail");
    },
    onError: () => {
      console.log("error");
    },
  });

  // 수정 폼으로 이동
  function goToEdit() {
    setArticleSeq(thisArticleSeq);
    setCenterContent("edit");
  }

  // 글 삭제
  function delArticle() {
    if (window.confirm("글을 삭제하시겠습니까?")) {
      // 삭제 버튼 누를 경우 삭제 실행
      deleteArt({ articleSeq: thisArticleSeq });
    }
  }

  // 삭제 POST
  const { mutate: deleteArt } = useMutation(deleteArticle, {
    onSuccess: (response) => {
      console.log(response);

      if (onPage === "detail") setCenterContent("home"); // 상세 페이지에서 삭제한다면 홈으로 이동
      else if (onPage === "home") setReloadFeed(true); // 리로드
    },
    onError: (response) => {
      console.log(response);
      console.log("error");
    },
  });

  return (
    <Wrapper>
      <ProfileContainer>
        <div id="name-container">
          <LinkContainer
            onClick={() => {
              goToProfile();
            }}>
            <img id="profile-img" src={article?.user?.profileImageUrl} alt="프로필사진" />

            <p className="bold" id="nickname">
              {article?.user.nickname}
            </p>
            <p className="bold" id="userId">
              {article?.user?.userId}
            </p>
          </LinkContainer>

          <img id="tier-img" src={TIER[article?.user?.userTier]} alt="티어" />
          {time && (
            <p className="grey">
              • {time[1]}
              {time[0] === "year" && "년"}
              {time[0] === "month" && "월"}
              {time[0] === "date" && "일"}
              {time[0] === "hours" && "시간"}
              {time[0] === "minutes" && "분"}
              {time[0] === "seconds" && "초"} 전
            </p>
          )}
        </div>

        {/* 현재 시간과 비교해서 보여주기 */}
        {article?.status === 1 && <p className="grey status">전체 공개</p>}
        {article?.status === 2 && <p className="grey status">맞팔 공개</p>}
        {article?.status === 3 && <p className="grey status">비공개</p>}
        {article?.mine && <span className="material-symbols-outlined more">more_vert</span>}
        {/* 더보기 아이콘 넣기 */}
      </ProfileContainer>
      <Body
        clickActive={clickActive}
        onClick={() => {
          goToArticleDetail();
        }}>
        <TitleContainer>{article?.articleType === 1 ? <p>지출 내역</p> : <p>결재 내역</p>}</TitleContainer>

        {/* 지출 내역 - 날짜, 분류 */}
        {article?.articleType === 1 && (
          <>
            <DateContiner>
              <p className="category">날짜</p>
              <p>{article?.consumptionDate}</p>
            </DateContiner>

            <CategoryContainer>
              <p className="category">분류</p>
              <p className="content">{CATEGORY[article?.expenditureCategory]}</p>
            </CategoryContainer>
          </>
        )}

        <ContextContainer>
          <p className="category">내용</p>
          <p className="content">{article?.articleText}</p>
        </ContextContainer>
        {article?.imageUrl && (
          <ImageContainer>
            <img src={article?.imageUrl} alt="이미지"></img>
          </ImageContainer>
        )}
        <PriceContainer>
          <p className="category">금액</p>
          <p className="content">{article?.amount?.toLocaleString("en-US")}원</p>
        </PriceContainer>
      </Body>

      {article?.articleType === 2 && (
        <VContatiner>
          {article?.voted ? (
            <VoteResultContainer result={article?.agreeRate >= article?.disagreeRate}>
              <div className="container">
                <p className="allow label">허가</p>
                <p className="notAllow label">불허 </p>
              </div>
              <div className="container">
                <p className="allow value">
                  {article?.agreeRate}%({article?.agree}표)
                </p>
                <p className="notAllow value">
                  {article?.disagreeRate}%({article?.disagree}표)
                </p>
              </div>
              {/* 그래프 */}
              {article?.agreeRate >= article?.disagreeRate ? (
                <ProgressBar reverse={0} basecolor={"#C4C4C4"} barcolor={"#845EC2"} percentage={article?.agreeRate} />
              ) : (
                <ProgressBar
                  reverse={1}
                  basecolor={"#C4C4C4"}
                  barcolor={"#845EC2"}
                  percentage={article?.disagreeRate}
                />
              )}
            </VoteResultContainer>
          ) : (
            <VoteContainer>
              <button
                className="left"
                onClick={() => {
                  clickVote(1);
                }}>
                허가
              </button>
              <button
                className="right"
                onClick={() => {
                  clickVote(2);
                }}>
                불허
              </button>
            </VoteContainer>
          )}
        </VContatiner>
      )}

      <FooterContainer>
        <Like>
          {article?.liked ? (
            <span
              className="material-symbols-rounded active"
              onClick={() => {
                clickLike();
              }}>
              favorite
            </span>
          ) : (
            <span
              className="material-symbols-rounded"
              onClick={() => {
                clickLike();
              }}>
              favorite
            </span>
          )}
          <p>{article?.likeCnt}</p>
        </Like>

        <Comment>
          <span className="material-symbols-rounded">comment</span>
          <p>{article?.commentCnt}</p>
        </Comment>

        {/* 내 글이면 수정/삭제 버튼 생성 */}
        {article?.mine && (
          <ButtonContainer>
            <Button
              id="edit"
              onClick={() => {
                goToEdit();
              }}>
              수정
            </Button>
            <Button
              id="del"
              onClick={() => {
                delArticle();
              }}>
              삭제
            </Button>
          </ButtonContainer>
        )}
      </FooterContainer>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 3rem;
  ${({ theme }) => theme.shadows.card};
  p.category {
    font: ${({ theme }) => theme.fonts.medium};
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.darkgrey_1};
  }
  p.content {
    font: ${({ theme }) => theme.fonts.bold};
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.black};
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  margin: 1rem 0;

  #profile-img {
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
    margin: 0;
  }

  #name-container {
    width: 100%;
    display: flex;
    align-items: center;
  }
  p.bold {
    font: ${({ theme }) => theme.fonts.bold};
    margin: 0 0.5rem;
  }
  img {
    margin: 0 0.5rem;
  }
  p#userId {
    color: ${({ theme }) => theme.colors.darkgrey_1};
    margin: 0;
  }
  p.grey {
    font: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.darkgrey_1};
    margin-left: 1rem;
  }
  p.grey.status {
    margin-right: 0.5rem;
    width: 8rem;
    font: ${({ theme }) => theme.fonts.medium};

    color: ${({ theme }) => theme.colors.darkgrey_1};
    text-align: right;
  }

  .more {
    font-size: 2rem;
    margin: 0 1rem;
  }

  #tier-img {
    width: 2rem;
    height: 2rem;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  #nickname {
    margin-left: 1rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.2rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  font: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.black};
  margin: 0.5rem;
`;

const DateContiner = styled.div`
  display: flex;
  padding: 1.2rem 0;
  justify-content: space-between;
  margin: 0.5rem;
  font: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.black};
`;
const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem;
  padding: 1.2rem 0;
  font: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.black};
`;

const Body = styled.div`
  cursor: ${({ clickActive }) => clickActive && "pointer"};
`;
const ContextContainer = styled.div`
  display: flex;
  padding: 1.2rem 0;
  justify-content: space-between;
  margin: 0.5rem;
  font: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.black};
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem;
  img {
    width: 30rem;
    height: 30rem;
    border-radius: 1rem;
  }
`;
const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.2rem 0;
  margin: 0.5rem;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.lightgrey_1};
`;
const VContatiner = styled.div`
  margin: 1.5rem 0;
`;
const VoteContainer = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 1.6rem;

  padding: 0;
  button {
    width: 100%;
    height: 5rem;
    border-radius: 1.5rem;
    font: ${({ theme }) => theme.fonts.bold};
    background-color: ${({ theme }) => theme.colors.lightpurple};
  }
  button:hover {
    background-color: ${({ theme }) => theme.colors.mainpurple};
  }
  button:focus {
    outline: none;
  }
  button.left {
    margin-right: 1rem;
  }
`;
const VoteResultContainer = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.lightpurple};
  ${({ theme }) => theme.fonts.bold};
  padding: 1.5rem;
  border-radius: 1.5rem;
  margin: 0.5rem;
  .container {
    margin: 0.5rem 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .reverse {
    rotate: 180deg;
  }
  .allow {
    color: ${({ result, theme }) => result && theme.colors.mainpurple};
  }
  .notAllow {
    color: ${({ result, theme }) => result || theme.colors.mainpurple};
  }
  .allow.label {
    font-size: ${({ result }) => (result ? "1.6rem" : "1.4rem")};
  }
  .allow.value {
    font-size: 1.2rem;
  }
  .notAllow.label {
    font-size: ${({ result }) => (!result ? "1.6rem" : "1.4rem")};
  }
  .notAllow.value {
    font-size: 1.2rem;
  }
`;

const FooterContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  p {
    font-size: 1.6rem;
    ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.darkgrey_1};
  }
  span.material-symbols-rounded {
    font-size: 2.4rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.darkgrey_1};
  }
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
const Comment = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 1.4rem;
    margin-left: 1rem;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;

  #del {
    background-color: ${({ theme }) => theme.colors.darkgrey_2};
    margin-left: 1rem;
  }
  :focus {
    outline: none;
  }
`;
const Button = styled.button`
  border-radius: 3rem;
  height: 3rem;
  width: 8rem;
  ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.mainpurple};
  font-size: 1.4rem;
`;
