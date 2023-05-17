import React from "react";
import ArticleCard from "../common/ArticleCard";

export default function Feed() {
  return (
    <>
      <div>Feed</div>
      {/* ArticleCard 가져와서 무한스크롤~ */}
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </>
  );
}
