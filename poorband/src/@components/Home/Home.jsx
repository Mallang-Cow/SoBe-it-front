import React from "react";
import WriteForm from "./WriteForm";
import Feed from "./Feed";
import { styled } from "styled-components";

export default function Home() {
  return (
    <>
      <HomeWrapper>
        <HomeTag>Home</HomeTag>
        <WriteForm />
        <Feed />
      </HomeWrapper>
    </>
  );
}

const HomeWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;


  width: 50%;
  height: 115vh;
`;

const HomeTag = styled.h2`
  width: 639px;
  height: 30px;


  margin-bottom: 1vh;
  margin-left: 1vh;

  width: 639px;
  height: 30px;
  
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
`;