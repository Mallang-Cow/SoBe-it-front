import React from "react";
import SearchUsers from "./SearchUsers";
import SearchPosts from "./SearchPosts";

export default function SearchResults() {
  return (
    <>
      <div>SearchResults</div>
      {/* 메뉴 */}

      {/* 메뉴에 따라 컴포넌트 변경 */}
      <SearchUsers />
      <SearchPosts />
    </>
  );
}
