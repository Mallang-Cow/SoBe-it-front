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

  console.log(userId);

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
              <p id="username">{nowUser?.userId}</p>
            </ProfileNameWrapper>
          </ProfileInfoWrapper>
          <ProfileMenuWrapper>
            <button>
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </ProfileMenuWrapper>
        </LinkContainer>
        <LogoutWrapper>
          <span className="material-symbols-outlined">logout</span>
          <button onClick={logout}>로그아웃</button>
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
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  place-content: flex-start;
  padding: 2rem 1.2rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkgrey_1};
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

const LinkContainer = styled.section`
  display: flex;
  justify-content: space-between;

  img:hover {
    background-color: #845ec2;
  }
  background-color: white;

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
