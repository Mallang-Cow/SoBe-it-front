import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

export default function MenuBar(props) {
  const { centerContent, setCenterContent, setUserSeq } = props;
  return (
    <Wrapper>
      <MenuWrapper>
        {centerContent === "home" ? (
          <ActiveMenuBarItem>Home</ActiveMenuBarItem>
        ) : (
          <MenuBarItem
            onClick={() => {
              setCenterContent("home");
            }}>
            Home
          </MenuBarItem>
        )}
        {centerContent === "statistics" ? (
          <ActiveMenuBarItem>Statistics</ActiveMenuBarItem>
        ) : (
          <MenuBarItem
            onClick={() => {
              setCenterContent("statistics");
            }}>
            Statistics
          </MenuBarItem>
        )}
        {centerContent === "notifications" ? (
          <ActiveMenuBarItem>Notifications</ActiveMenuBarItem>
        ) : (
          <MenuBarItem
            onClick={() => {
              setCenterContent("notifications");
            }}>
            Notifications
          </MenuBarItem>
        )}
        <MenuBarItem>Settings</MenuBarItem>
      </MenuWrapper>
      <ProfileWrapper
        onClick={() => {
          setCenterContent("profile");
          //setUserSeq(현재유저번호);
        }}>
        <img
          id="profile-image"
          src="https://item.kakaocdn.net/do/1d495862f49c38232ca8b6cc6a9679a0effd194bae87d73dd00522794070855d"
          alt="프로필사진"
        />
        <span>닉네임</span>
        <span>아이디</span>
        <span>더보기</span>
      </ProfileWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.li`
  margin: '-291.31 -434.56',

  width: 12.88,
  height: 67.5,

  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;
const MenuWrapper = styled.div`
  :hover {
    background-color: green;
    color: white;
  }
`;

const ProfileWrapper = styled.div`
  :hover {
    background-color: grey;
  }
  background-color: white;

  #profile-image {
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
  }
`;

const MenuBarItem = styled.ul`
  background-color: white;
`;
const ActiveMenuBarItem = styled.ul`
  background-color: grey;
`;
