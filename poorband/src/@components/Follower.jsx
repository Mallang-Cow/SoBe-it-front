import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import UserCard from "../@components/common/UserCard";
import { followerList } from "../../api/followAPI";
import { prevPageProfile } from "../recoil/prevPage";

export default function Follower(props) {
  const { userId, setUserId, setCenterContent } = props;
  const [followerListResult, setfollowerListResult] = useState([]);
  const [isError, setIsError] = useState(false);
  const [prevPage, setPrevPage] = useRecoilState(prevPageProfile);
  console.log(userId + "의 팔로워 목록");

  const { mutate: followerListMutation, isLoading } = useMutation(followerList, {
    onSuccess: (response) => {
      console.log(response);
      setfollowerListResult(response); // API에서 받은 사용자의 팔로워 목록 결과를 상태로 설정
      setIsError(false);
    },
    onError: (error) => {
      console.log(error);

      if (error.message === "Request failed with status code 500") {
        setIsError(true);
        setfollowerListResult([]);
      }
    }
  });

  useEffect(() => {
    const profileUserId = {
      userId: userId
    };

    followerListMutation(profileUserId);
  }, [followerListMutation, userId]);

  function goBack() {
    prevPage && setCenterContent(prevPage);
  }

  return (
    <>
      <HeaderContainer>
        <div style={{ display: "flex", flexDirection: "column", width: "100%", textAlign: "center" }}>
          <div style={{ marginBottom: "2rem" }}>팔로워</div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <span
              className="material-symbols-rounded"
              onClick={() => {
                goBack();
              }}>
              arrow_back
            </span>
            <header>{ `@${ userId }` }</header>
          </div>
        </div>
      </HeaderContainer>

      {/* 로딩 중인 경우 로딩 표시 */}
      { isLoading && 
        <div>Loading...</div> }

      {/* 팔로워 리스트 가져오기 */}
      { followerListResult.map((resultFollower) => (
        <UserCard 
          key={ resultFollower.userSeq }
          userId={ resultFollower.userId }
          nickname={ resultFollower.nickname }
          userTier={ resultFollower.userTier }
          introduction={ resultFollower.introduction }
          profileImgUrl={ resultFollower.profileImgUrl }
          status={ resultFollower.status }
          setCenterContent={ setCenterContent }
          setUserId={ setUserId }
        />
      )) }

      {/* 500 에러가 발생한 경우 에러 메시지 표시 */}
      { isError && 
        <div>Error: Failed to select following user list.</div> }
    </>
  );
}

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  padding: 4rem 3rem 2rem;
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 2.4rem;
  span {
    font-size: 3rem;
    margin-right: 1rem;
    cursor: pointer;
  }
`;
