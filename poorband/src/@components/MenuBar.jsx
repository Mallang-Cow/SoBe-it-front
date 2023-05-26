import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { styled } from "styled-components";
import { signout } from "../../api/userAPI";
import { ACCESS_TOKEN } from '../../api/ApiService';
import { SIDEBAR_DETAIL } from "../../core/sideBarData";

export default function MenuBar(props) {
  const { centerContent, setCenterContent, setUserId } = props;
  const navigate = useNavigate();

  const { mutate: logoutUser } = useMutation(signout, {
    onSuccess: (response) => {
      console.log(response);
      sessionStorage.setItem(ACCESS_TOKEN, null);
      navigate("/"); // 추후 경로 /login으로 수정
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        console.log(error.response.data.error);
        alert("로그아웃 하는 과정에 오류가 발생했습니다.");
      }
    },
  });

  const logout = async () => {
    logoutUser();
  };

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
              <span className="material-symbols-outlined">home</span>
              Home
            </ActiveMenuBarItem>
          ) : (
            <MenuBarItem
              onClick={() => {
                setCenterContent("home");
              }}>
              {" "}
              <span className="material-symbols-outlined">home</span>
              Home
            </MenuBarItem>
          )}
          {centerContent === "statistics" ? (
            <ActiveMenuBarItem>
              <span className="material-symbols-outlined">pie_chart</span>
              Statistics
            </ActiveMenuBarItem>
          ) : (
            <MenuBarItem
              onClick={() => {
                setCenterContent("statistics");
              }}>
              {" "}
              <span className="material-symbols-outlined">pie_chart</span>
              Statistics
            </MenuBarItem>
          )}
          {centerContent === "notifications" ? (
            <ActiveMenuBarItem>
              <span className="material-symbols-outlined">notifications</span>Notifications
            </ActiveMenuBarItem>
          ) : (
            <MenuBarItem
              onClick={() => {
                setCenterContent("notifications");
              }}>
              <span className="material-symbols-outlined">notifications</span>
              Notifications
            </MenuBarItem>
          )}
          <MenuBarItem>
            <span className="material-symbols-outlined">settings</span>Settings
          </MenuBarItem>
        </MenuWrapper>
      </HeaderWrapper>
      <BottomWrapper>
        <ProfileWrapper
          onClick={() => {
            setCenterContent("profile");
            //setUserId(현재유저번호);
          }}>
          <ProfileImgWrapper>
            <img id="profile-image" src={SIDEBAR_DETAIL.user.profileImageUrl} alt="프로필사진" />
          </ProfileImgWrapper>
          <ProfileInfoWrapper>
            <p>{SIDEBAR_DETAIL.user.nickname}</p>
            <p id="username">{SIDEBAR_DETAIL.user.userName}</p>
          </ProfileInfoWrapper>
          <ProfileMenuWrapper>
            <button>
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </ProfileMenuWrapper>
        </ProfileWrapper>
        <LogoutWrapper>
          <span className="material-symbols-outlined">logout</span>
          <button onClick={ logout }>로그아웃</button>
        </LogoutWrapper>
      </BottomWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  background-color: white;
`;

const HeaderWrapper = styled.section`
  margin: 1rem;
  ${({ theme }) => theme.fonts.bold};
`;
const BottomWrapper = styled.section`
  margin: 1rem;
  font-size: 1.6rem;
  ${({ theme }) => theme.fonts.regular};
`;
const MenuWrapper = styled.section`
  :hover {
    background-color: #845ec2;
    color: white;
  }

  span {
    margin: 1rem;
  }
`;

const ProfileWrapper = styled.section`
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

const MenuBarItem = styled.div`
  background-color: white;
  font-size: 2rem;
  border: 1rem;
`;
const ActiveMenuBarItem = styled.div`
  background-color: white;
  font-size: 2rem;
`;

const LogoutWrapper = styled.section`
  display: flex;
  align-items: center;
  padding: 2rem 0;

  button {
    padding: 0 2rem;
  }
`;

const ProfileImgWrapper = styled.section``;
const ProfileInfoWrapper = styled.section`
  #username {
    ${({ theme }) => theme.fonts.light};
  }
`;
const ProfileMenuWrapper = styled.section``;
