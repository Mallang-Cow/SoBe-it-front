import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileEdit from "./ProfileEdit";
import ProfilePosts from "./ProfilePosts";
import ProfileChallenges from "./ProfileChallenges";
import { styled } from "styled-components";

export default function Profile(props) {
  const { setCenterContent, setArticleSeq, setUserId, userId, reloadFeed, setReloadFeed } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showElement, setShowElement] = useState(true); // true면 작성글, false면 도전과제

  return (
    <ProfileWrapper>
      <HeaderWrapper>
        <ProfileTitle>@{userId}</ProfileTitle>

        {/* 프로필 편집 시 편집 창으로 바뀌기 */}
        {!showEdit ? (
          <ProfileInfo setCenterContent={ setCenterContent } showEdit={ showEdit } setShowEdit={ setShowEdit } userId={ userId } setUserId={ setUserId } />
        ) : (
          <ProfileEdit showEdit={ showEdit } setShowEdit={ setShowEdit } userId={ userId } setUserId={ setUserId } />
        )}

        {/* 메뉴 */}
        {/* 메뉴 선택함에따라 다른 내용 보이기 -> 길어진다면 컴포넌트 분리 */}
        <BtnProfileWrapper>
          {showElement ? (
            <ActiveButton showElement={showElement}>작성한 글</ActiveButton>
          ) : (
            <Button
              showElement={showElement}
              onClick={() => {
                setShowElement(true);
              }}>
              작성한 글
            </Button>
          )}

          {!showElement ? (
            <ActiveButton showElement={showElement}>도전 과제</ActiveButton>
          ) : (
            <Button
              showElement={showElement}
              onClick={() => {
                setShowElement(false);
              }}>
              도전 과제
            </Button>
          )}
        </BtnProfileWrapper>
      </HeaderWrapper>

      {showElement ? (
        <ProfilePosts
          setCenterContent={setCenterContent}
          setArticleSeq={setArticleSeq}
          setUserId={setUserId}
          userId={userId}
          reloadFeed={reloadFeed}
          setReloadFeed={setReloadFeed}
        />
      ) : (
        <ProfileChallenges setUserId={setUserId} userId={userId} />
      )}
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const HeaderWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
`;
const ProfileTitle = styled.h2`
  background-color: white;
  z-index: 1;
  padding: 4rem 3rem 2rem;
  display: flex;
  justify-content: start;
  position: sticky;
  top: 0;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1};

  ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 2.4rem;
`;

const Button = styled.button`
  ${({ theme }) => theme.fonts.regular};
  font-size: 1.6rem;
  width: 50%;

  color: ${({ theme }) => theme.colors.lightgrey_2};
  padding: 1.5rem;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
`;

const ActiveButton = styled.button`
  ${({ theme }) => theme.fonts.regular};
  font-size: 1.6rem;
  width: 50%;
  padding: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  border-bottom: 3px solid ${({ theme }) => theme.colors.mainpurple};
`;

const BtnProfileWrapper = styled.section`
  display: flex;
  justify-content: space-evenly;

  button:focus,
  button:focus-visible {
    outline: none;
  }
`;
