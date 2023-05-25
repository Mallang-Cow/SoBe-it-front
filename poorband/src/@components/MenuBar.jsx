import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { SIDEBAR_DETAIL } from "../../core/sideBarData";
import { useMutation } from "react-query";
import { getHotPost } from "../../api/getHotPost";

export default function MenuBar(props) {
  const { centerContent, setCenterContent, setUserId } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const [data, setData] = useState([]);
  const newData = {
    userId: "test1",
  };

  useEffect(() => {
    hotPosts(newData);
  }, []);

  const { mutate: hotPosts } = useMutation(getHotPost, {
    onSuccess: (response) => {
      setData(response.data[props.idx]);
      console.log(response.data[0]);
      console.log(data?.user?.profileImageUrl);
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        console.log("인기 게시물 가져오기 실패");
      }
    },
  });

  const handleMenuItemClick = (index) => {
    setActiveIndex(index);
    setCenterContent(sidebarNavItems[index].section);
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <LogoWrapper>
          <img src="{data?.user?.profileImageUrl}" alt="logo" width="50rem"></img>
        </LogoWrapper>
        <MenuWrapper>
          {sidebarNavItems.map((item, index) => (
            <MenuItem
              key={index}
              active={activeIndex === index}
              onClick={() => {
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
          <ProfileInfoWrapper>
            <ProfileImgWrapper>
              <img id="profile-image" src={SIDEBAR_DETAIL.user.profileImageUrl} alt="프로필사진" />
            </ProfileImgWrapper>
            <ProfileNameWrapper>
              <p>{SIDEBAR_DETAIL.user.nickname}</p>
              <p id="username">{SIDEBAR_DETAIL.user.userName}</p>
            </ProfileNameWrapper>
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

  padding: 3rem 2rem 0 0;

  background-color: white;
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HeaderWrapper = styled.section`
  display: grid;

  height: 10rem;
  font-size: 1.5rem;
  font-weight: 700;
  ${({ theme }) => theme.fonts.bold};
`;
const LogoWrapper = styled.div`
  padding: 2rem 0;
`;
const MenuWrapper = styled.section`
  background-color: white;
  font-size: 2rem;

  border-radius: 1px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12), 0 2px 1px 0 rgba(0, 0, 0, 0.22);

  animation: ${fadeInAnimation} 0.5s ease-in-out;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  place-content: flex-start;
  padding: 2rem 1.2rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  transition: color 0.3s ease-in-out;
  cursor: pointer;

  ${({ active }) =>
    active.toString() === "true" &&
    css`
      color: ${({ theme }) => theme.colors.mainpurple};
      background-color: ${({ theme }) => theme.colors.lightpurple};
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
  font-size: 1.6rem;
  ${({ theme }) => theme.fonts.regular};
`;

const ProfileWrapper = styled.section`
  display: flex;
  justify-content: space-between;

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

const ProfileImgWrapper = styled.section`
  margin-right: 1rem;
`;
const ProfileInfoWrapper = styled.section`
  display: flex;
  justify-content: space-between;
`;

const ProfileNameWrapper = styled.section`
  #username {
    ${({ theme }) => theme.fonts.light};
  }
`;
const ProfileMenuWrapper = styled.section`
  display: flex;
  align-self: flex-end;
`;

const LogoutWrapper = styled.section`
  display: flex;
  align-items: flex-start;
  padding: 2rem 0;

  button {
    padding: 0 2rem;
  }
`;
