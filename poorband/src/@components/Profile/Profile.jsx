import React from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileEdit from "./ProfileEdit";
import ProfilePosts from "./ProfilePosts";
import ProfileChallenges from "./ProfileChallenges";

export default function Profile() {
  return (
    <>
      <div>Profile</div>
      {/* 프로필 편집 시 편집 창으로 바뀌기 */}
      <ProfileInfo />
      <ProfileEdit />

      {/* 메뉴 */}
      {/* 메뉴 선택함에따라 다른 내용 보이기 -> 길어진다면 컴포넌트 분리 */}
      <ProfilePosts />
      <ProfileChallenges />
    </>
  );
}
