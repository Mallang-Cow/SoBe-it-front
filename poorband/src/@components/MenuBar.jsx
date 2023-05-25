import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { SIDEBAR_DETAIL } from "../../core/sideBarData";

export default function MenuBar(props) {
  const { centerContent, setCenterContent, setUserId } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMenuItemClick = (index) => {
    setActiveIndex(index);
    setCenterContent(sidebarNavItems[index].section);
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <LogoWrapper>
          <img
            src="https://ih1.redbubble.net/image.1819983922.6790/st,small,845x845-pad,1000x1000,f8f8f8.jpg"
            alt="logo"
            width="50rem"></img>
        </LogoWrapper>
        <MenuWrapper>
          {sidebarNavItems.map((item, index) => (
            <MenuItem
              key={index}
              active={activeIndex === index}
              onClick={() => {
                // setCenterContent("profile");
                handleMenuItemClick(index);
              }}>
              <IconWrapper>{item.icon}</IconWrapper>
              <Text>{item.display}</Text>
            </MenuItem>
          ))}
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
          <button>로그아웃</button>
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

  padding: 2rem 0;

  background-color: white;
`;

const HeaderWrapper = styled.section`
  display: grid;
  place-items: center;
  height: 120px;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: "Mochiy Pop P one", sans-serif;
`;
const ActiveMenuBarItem = styled.div``;
const LogoWrapper = styled.div`
  padding: 2rem 0;
`;
const MenuBarItem = styled.div``;
const MenuWrapper = styled.section``;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  place-content: flex-start;
  padding: 1rem 3rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: #555555;
  transition: color 0.3s ease-in-out;
  cursor: pointer;

  ${({ active }) =>
    active &&
    css`
      color: #fff;
      background-color: #308efe;
    `}
`;

const IconWrapper = styled.div`
  margin-right: 1rem;

  i {
    font-size: 1.75rem;
  }
`;

const Text = styled.div``;

const sidebarNavItems = [
  {
    display: "Home",
    icon: <span className="material-symbols-outlined">home</span>,
    to: "/home",
    section: "home",
  },
  {
    display: "Statistics",
    icon: <span className="material-symbols-outlined">pie_chart</span>,
    to: "/statistics",
    section: "statistics",
  },
  {
    display: "Notifications",
    icon: <span className="material-symbols-outlined">notifications</span>,
    to: "/notifications",
    section: "notifications",
  },
  {
    display: "Settings",
    icon: <span className="material-symbols-outlined">settings</span>,
    to: "/settings",
    section: "settings",
  },
];

const BottomWrapper = styled.section`
  align-self: flex-end;
  margin: 1rem;
  font-size: 1.6rem;
  ${({ theme }) => theme.fonts.regular};
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
