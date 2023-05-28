import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import styled, { css, keyframes } from "styled-components";
import { signout } from "../../api/userAPI";
import { ACCESS_TOKEN } from "../../api/ApiService";
import { SIDEBAR_DETAIL } from "../../core/sideBarData";
import { getHotPost } from "../../api/getHotPost";
import { getChallenge } from "../../api/getChallenge";
import { userIdState } from "../recoil/userId";
import { useRecoilState } from "recoil";
import { getNowUser } from "../../api/getNowUser";
import { getMyInfo } from "../../api/getMyInfo";
import { nowUserState } from "../recoil/nowUserInfo";

export default function MenuBar(props) {
  const { centerContent, setCenterContent } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const [thisUserId, setThisUserId] = useState("");
  const [userId, setUserId] = useRecoilState(userIdState);
  const [nowUser, setNowUser] = useRecoilState(nowUserState);

  const [data, setData] = useState([]);

  // const newData = {
  //   userId: "test5",
  // };

  // useEffect(() => {
  //   // myInfo();
  //   console.log(centerContent);
  //   console.log(nowUser.userSeq);
  // }, []);

  // const { mutate: myInfo } = useMutation(getMyInfo, {
  //   onSuccess: (response) => {
  //     setData(response.data);
  //     console.log("성공");
  //     console.log(response.data.nickname);
  //   },
  //   onError: (error) => {
  //     if (error.message === "Request failed with status code 500") {
  //       console.log("프로필 정보 가져오기 실패");
  //     }
  //   },
  // });

  const handleMenuItemClick = (index) => {
    setActiveIndex(index);
    setCenterContent(sidebarNavItems[index].section);
  };

  // 글 작성자 프로필 페이지로 이동
  function goToProfile() {
    setUserId(nowUser?.userId);
    setCenterContent("profile");
  }

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

  const logout = () => {
    logoutUser();
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
              active={(activeIndex === index).toString()}
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
        <LinkContainer
          onClick={() => {
            goToProfile();
          }}>
          <ProfileInfoWrapper>
            <ProfileImgWrapper>
              <img id="profile-image" src={nowUser?.profileImgUrl} alt="프로필사진" />
            </ProfileImgWrapper>
            <ProfileNameWrapper>
              <p>{nowUser?.nickname}</p>
              <p id="username">@{nowUser?.userId}</p>
            </ProfileNameWrapper>
          </ProfileInfoWrapper>
        </LinkContainer>
        <LogoutWrapper onClick={logout}>
          <span className="material-symbols-rounded">logout</span>
        </LogoutWrapper>
      </BottomWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  height: 100%;

  padding: 4rem 0 3rem 0;

  background-color: ${({ theme }) => theme.colors.white};
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
  font-size: 1.8rem;
  width: 100%;
  ${({ theme }) => theme.fonts.bold};
`;
const LogoWrapper = styled.div`
  margin-bottom: 3rem;
`;

const MenuWrapper = styled.section`
  font-size: 2rem;

  border-radius: 1px;

  :hover {
    background-color: ${({ theme }) => theme.colors.lightpurple};
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  place-content: flex-start;
  padding: 2rem 0;
  font-size: 1.8rem;
  ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.darkgrey_2};
  transition: color 0.3s ease-in-out;
  cursor: pointer;

  ${({ active }) =>
    active.toString() === "true" &&
    css`
      color: ${({ theme }) => theme.colors.mainpurple};
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
    icon: <span className="material-symbols-rounded">home</span>,
    to: "/home",
    section: "home",
  },
  {
    display: "Statistics",
    icon: <span className="material-symbols-rounded">pie_chart</span>,
    to: "/statistics",
    section: "statistics",
  },
  {
    display: "Notifications",
    icon: <span className="material-symbols-rounded">notifications</span>,
    to: "/notifications",
    section: "notifications",
  },
  {
    display: "Settings",
    icon: <span className="material-symbols-rounded">settings</span>,
    to: "/settings",
    section: "settings",
  },
];

const BottomWrapper = styled.section`
  font-size: 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.fonts.regular};
  width: 100%;
`;

const LinkContainer = styled.section`
  display: flex;
  justify-content: space-between;
  flex: auto;

  #profile-image {
    display: block;
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
  }
`;

const ProfileImgWrapper = styled.section`
  margin-right: 1rem;
`;
const ProfileInfoWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileNameWrapper = styled.section`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: start;
  ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  #username {
    ${({ theme }) => theme.fonts.regular};
    font-size: 1.4rem;
  }
`;
const ProfileMenuWrapper = styled.section`
  display: flex;
  align-self: flex-end;
`;

const LogoutWrapper = styled.section`
  display: flex;
  align-items: center;
  padding: 1rem;
  span {
    font-size: 2.5rem;
  }
`;
