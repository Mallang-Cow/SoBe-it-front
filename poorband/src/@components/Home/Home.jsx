import React, { useEffect, useRef, useState } from "react";
import WriteForm from "./WriteForm";
import Feed from "./Feed";
import { styled } from "styled-components";

export default function Home(props) {
  const { setCenterContent, setArticleSeq, setUserId, reloadFeed, setReloadFeed } = props;
  const [position, setPosition] = useState(false);
  const handleScroll = () => {
    if (scrollY > 50) setPosition(true);
    else setPosition(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <HomeWrapper>
        <HomeTag position={position}>Home</HomeTag>
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
  padding: 4rem 3rem 2rem;
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 1px solid ${({ theme, position }) => (position ? theme.colors.lightgrey_1 : theme.colors.white)};

  ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 2.4rem;

  span {
    font-size: 3rem;
    margin-right: 1rem;
  }
`;
