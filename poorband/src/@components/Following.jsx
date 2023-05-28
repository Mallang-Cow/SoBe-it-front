import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import UserCard from "../@components/common/UserCard";
import { followingList } from "../../api/followAPI";

export default function Following(props) {
  const { userId } = props;
  const [followingListResult, setfollowingListResult] = useState([]);
  const [isError, setIsError] = useState(false);
  console.log(userId);

  const { mutate: followingListMutation, isLoading } = useMutation(followingList, {
    onSuccess: (response) => {
      console.log(response);
      setfollowingListResult(response); // API에서 받은 사용자의 팔로잉 목록 결과를 상태로 설정
      setIsError(false);
    },
    onError: (error) => {
      console.log(error);

      if (error.message === "Request failed with status code 500") {
        setIsError(true);
        setfollowingListResult([]);
      }
    }
  });

  useEffect(() => {
    const profileUserId = {
      userId: userId
    };

    followingListMutation(profileUserId);
  }, [followingListMutation, userId]);

  return (
    <>
      <div>Following</div>
      {/* 로딩 중인 경우 로딩 표시 */}
      { isLoading && 
        <div>Loading...</div> }

      {/* 팔로워 리스트 가져오기 */}
      { followingListResult.map((resultFollowing) => (
        <UserCard />
      )) }

      {/* 500 에러가 발생한 경우 에러 메시지 표시 */}
      { isError && 
        <div>Error: Failed to select following user list.</div> }
    </>
  );
}
