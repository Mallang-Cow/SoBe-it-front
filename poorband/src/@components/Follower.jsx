import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import UserCard from "../@components/common/UserCard";
import { followerList } from "../../api/followAPI";

export default function Follower(props) {
  const { userId, setUserId, setCenterContent } = props;
  const [followerListResult, setfollowerListResult] = useState([]);
  const [isError, setIsError] = useState(false);
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

  return (
    <>
      <div>Follower</div>
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
