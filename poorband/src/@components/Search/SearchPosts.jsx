import React from "react";
import ArticleCard from "../ArticleCard";

export default function SearchPosts() {
  return (
    <>
      <div>SearchPosts</div>
      {/* 글 검색 결과 쭉 불러오기 */}
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </>
  );
}
