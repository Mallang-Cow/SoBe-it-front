import React, { useState } from "react";
import WriteForm from "./WriteForm";
import Feed from "./Feed";
import { styled } from "styled-components";

export default function Home(props) {
  const { setCenterContent, setArticleSeq, setUserId, reloadFeed, setReloadFeed } = props;

  return (
    <>
      <HomeWrapper>
        <HomeTag>Home</HomeTag>
        <WriteForm setReloadFeed={setReloadFeed} />
        <Feed
          setCenterContent={setCenterContent}
          setArticleSeq={setArticleSeq}
          setUserId={setUserId}
          reloadFeed={reloadFeed}
          setReloadFeed={setReloadFeed}
        />
      </HomeWrapper>
    </>
  );
}

const HomeWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const HomeTag = styled.h2`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  padding: 4rem 2rem 0 2rem;
  display: flex;
  justify-content: start;
  align-items: center;

  ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 2.4rem;

  span {
    font-size: 3rem;
    margin-right: 1rem;
  }
`;
