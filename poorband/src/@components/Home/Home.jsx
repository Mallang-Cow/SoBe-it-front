import React from "react";
import WriteForm from "./WriteForm";
import Feed from "./Feed";
import { styled } from "styled-components";

export default function Home(props) {
  const { setCenterContent, setArticleSeq } = props;
  return (
    <>
      <HomeWrapper>
        <HomeTag>Home</HomeTag>
        <WriteForm />
        <Feed setCenterContent={setCenterContent} setArticleSeq={setArticleSeq} />
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
  width: 639px;
  height: 30px;

  margin-bottom: 1.5rem;
  margin-left: 1.875rem;
  margin-top: 3vh;

  font-family: "Spoqa Han Sans Neo";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  color: #000000;
`;
