import React from "react";
import UserCard from "../common/UserCard";

export default function SearchUsers() {
  return (
    <>
      <div>SearchUsers</div>
      {/* 사용자 검색 결과 쭉 불러오기 */}
      <UserCard />
      <UserCard />
      <UserCard />
    </>
  );
}
