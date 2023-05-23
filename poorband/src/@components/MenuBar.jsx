import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

export default function MenuBar(props) {
  const { centerContent, setCenterContent, setUserSeq } = props;
  return (
    <Wrapper>
      <HeaderWrapper>
        <img
          src="https://ih1.redbubble.net/image.1819983922.6790/st,small,845x845-pad,1000x1000,f8f8f8.jpg"
          alt="logo"
          width="50rem"></img>
        <MenuWrapper>
          {centerContent === "home" ? (
            <ActiveMenuBarItem>
              <span class="material-symbols-outlined">home</span>
              Home
            </ActiveMenuBarItem>
          ) : (
            <MenuBarItem
              onClick={() => {
                setCenterContent("home");
              }}>
              Home
            </MenuBarItem>
          )}
          {centerContent === "statistics" ? (
            <ActiveMenuBarItem>
              <span class="material-symbols-outlined">pie_chart</span>
              Statistics
            </ActiveMenuBarItem>
          ) : (
            <MenuBarItem
              onClick={() => {
                setCenterContent("statistics");
              }}>
              Statistics
            </MenuBarItem>
          )}
          {centerContent === "notifications" ? (
            <ActiveMenuBarItem>
              <span class="material-symbols-outlined">notifications</span>Notifications
            </ActiveMenuBarItem>
          ) : (
            <MenuBarItem
              onClick={() => {
                setCenterContent("notifications");
              }}>
              Notifications
            </MenuBarItem>
          )}
          <MenuBarItem>
            <span class="material-symbols-outlined">settings</span>Settings
          </MenuBarItem>
        </MenuWrapper>
      </HeaderWrapper>
      <BottomWrapper>
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
        <span class="material-symbols-outlined">logout</span>
        <button>로그아웃</button>
      </BottomWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;

  background-color: white;

  margin: "-291.31 -434.56";

  width: 12.88;
  height: 67.5;

  display: flex;
  justify-content: space-between;
`;

const HeaderWrapper = styled.li`
  margin: 1rem;
`;
const BottomWrapper = styled.li`
  margin: 1rem;
  font-size: 2rem;
`;
const MenuWrapper = styled.div`
  :hover {
    background-color: #845ec2;
    color: white;
  }
`;

const ProfileWrapper = styled.div`
  :hover {
    background-color: #845ec2;
  }
  background-color: white;

  #profile-image {
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
  }
  font-size: 2rem;
`;

const MenuBarItem = styled.ul`
  background-color: white;
  font-size: 2rem;
  border: 1rem;
`;
const ActiveMenuBarItem = styled.ul`
  background-color: white;
  font-size: 2rem;
`;
