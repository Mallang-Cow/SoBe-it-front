import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

export default function MenuBar(props) {
  const { centerContent, setCenterContent, setUserSeq } = props;
  // const menus = [
  //   { name: "Home", path: "home" },
  //   { name: "Statistics", path: "statistics" },
  //   { name: "Notifications", path: "notifications" },
  //   { name: "Settings", path: "settings" },
  // ];
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
        <img src="" alt="프로필사진" />
        <span>닉네임</span>
        <span>아이디</span>
        <span>더보기</span>
      </ProfileWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;
const MenuWrapper = styled.div`
  :hover {
    background-color: red;
  }
`;

const ProfileWrapper = styled.div`
  :hover {
    background-color: grey;
  }
  background-color: white;
`;

const MenuBarItem = styled.ul`
  background-color: white;
`;
const ActiveMenuBarItem = styled.ul`
  background-color: grey;
`;
