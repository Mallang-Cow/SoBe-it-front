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
              {" "}
              <span class="material-symbols-outlined">home</span>
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
              {" "}
              <span class="material-symbols-outlined">pie_chart</span>
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
              <span class="material-symbols-outlined">notifications</span>
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
          <div>
            <table>
              <tr>
                <td rowSpan={2}>
                  <img
                    id="profile-image"
                    src="https://item.kakaocdn.net/do/1d495862f49c38232ca8b6cc6a9679a0effd194bae87d73dd00522794070855d"
                    alt="프로필사진"
                  />
                </td>
                <td>닉네임</td>
                <td rowSpan={2}>
                  <button>
                    <span class="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              <tr>
                <td>아이디</td>
              </tr>
            </table>
          </div>
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

  ${({ theme }) => theme.fonts.bold};
`;

const HeaderWrapper = styled.li`
  margin: 1rem;
`;
const BottomWrapper = styled.li`
  margin: 1rem;
  font-size: 1.8rem;
`;
const MenuWrapper = styled.div`
  :hover {
    background-color: #845ec2;
    color: white;
  }

  span {
    margin: 1rem;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img:hover {
    background-color: #845ec2;
  }
  background-color: white;

  #profile-image {
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
  }
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
