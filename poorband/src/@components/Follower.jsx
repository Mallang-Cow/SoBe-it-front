import React from "react";
import UserCard from "./UserCard";

export default function Follower() {
  return (
    <>
      <div>Follower</div>
      {/* 팔로워 리스트 가져오기 */}
      <UserCard />
      <UserCard />
      <UserCard />
    </>
  );
}
