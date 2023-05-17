import React from "react";
import SideChallengeCard from "./SideChallengeCard";
import HotPostCard from "../../HotPostCard";
import SearchBar from "../../SearchBar";

export default function SideBar() {
  return (
    <>
      <div>SideBar</div>
      <SearchBar />
      {/* 진행중인 도전과제 있을 경우 */}
      <SideChallengeCard />

      {/* 인기게시글 리스트 - 진행중인 도전과제 있으면 3개, 없으면 5개정도..? */}
      <HotPostCard />
      <HotPostCard />
      <HotPostCard />
    </>
  );
}
