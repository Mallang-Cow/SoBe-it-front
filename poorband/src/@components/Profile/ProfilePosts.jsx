import React from "react";
import ArticleCard from "./ArticleCard";

export default function ProfilePosts() {
  return (
    <>
      <div>ProfilePosts</div>
      {/* 이 사람이 쓴 글 쭉 불러오기 */}
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </>
  );
}
