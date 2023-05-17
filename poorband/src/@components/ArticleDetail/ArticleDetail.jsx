import React from "react";
import ArticleCard from "../ArticleCard";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";

export default function ArticleDetail() {
  return (
    <>
      <div>ArticleDetail</div>
      <ArticleCard />

      {/* 댓글 폼 여기 있다가 없어지고 다른 답댓 달면 거기에 뜨게..? */}
      <CommentForm />

      {/* 댓글 리스트 (길어지면 컴포넌트 빼기) */}
      <CommentCard />
      <CommentCard />
      <CommentCard />
    </>
  );
}
