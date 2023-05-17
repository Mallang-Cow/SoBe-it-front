import React from "react";
import ChallengeCard from "./ChallengeCard";

export default function ProfileChallenges() {
  return (
    <>
      <div>ProfileChallenges</div>
      {/* 자기 페이지인 경우 도전과제 추가 버튼 & 도전과제 현황 보여주기 */}

      {/* 도전과제 리스트 불러오기 */}
      <ChallengeCard />
      <ChallengeCard />
      <ChallengeCard />
    </>
  );
}
