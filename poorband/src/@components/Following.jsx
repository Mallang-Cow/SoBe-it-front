import React from "react";
import UserCard from "../@components/common/UserCard";

export default function Following(props) {
  const { userId } = props;
  console.log(userId);

  return (
    <>
      <div>Following</div>
      {/* 팔로워 리스트 가져오기 */}
      <UserCard />
      <UserCard />
      <UserCard />
    </>
  );
}
