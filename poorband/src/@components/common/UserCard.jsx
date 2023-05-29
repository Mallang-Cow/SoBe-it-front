import React, { useState } from "react";
import { useMutation } from "react-query";
import { styled as muiStyled } from "@mui/material/styles";
import { styled } from "styled-components";
import { Avatar, Button, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { theme } from "../../style/theme";
import { TIER } from "../../../core/tierImage";
import { followUser, unFollowUser } from "../../../api/followAPI";
import { profileImg } from "../../../core/defaultImg";

export default function UserCard(props) {
  const { userId, nickname, userTier, introduction, profileImgUrl, status, setCenterContent, setUserId } = props;
  const [isFollowing, setIsFollowing] = useState(status);

  // 나를 팔로우한 사용자 프로필 페이지로 이동
  function goToProfile() {
    setUserId(userId);
    setCenterContent("profile");
  }

  const onErrorImg = (e) => {
    e.target.src = profileImg;
  };

  // 사용자 프로필 이미지
  let avatarImg = (
    <img
      src={profileImgUrl || profileImg}
      alt="사용자 프로필 이미지"
      onError={onErrorImg}
      style={{ width: "100%", height: "100%", display: "block", borderRadius: "1rem" }}
    />
  );

  // 팔로우
  const { mutate: followUserMutation } = useMutation(followUser, {
    onSuccess: (response) => {
      console.log("팔로우 : " + response);

      if (response === "success") {
        setIsFollowing(2); // 팔로우 상태 변경
      } else {
        console.log("팔로우 실패");
      }
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        alert("팔로우 과정에 오류가 발생했습니다.");
      }
    },
  });

  // 언팔로우
  const { mutate: unFollowUserMutation } = useMutation(unFollowUser, {
    onSuccess: (response) => {
      console.log("언팔로우 : " + response);

      if (response === "success") {
        setIsFollowing(0); // 팔로우 상태 변경
      } else {
        console.log("언팔로우 실패");
      }
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        alert("언팔로우 과정에 오류가 발생했습니다.");
      }
    },
  });

  const handleFollow = (event) => {
    event.stopPropagation(); // 이벤트 버블링 중단

    console.log("팔로우 또는 언팔로우할 사용자 아이디 : " + userId);

    const handleUserId = {
      userId: userId,
    };

    if (isFollowing === 0) {
      followUserMutation(handleUserId);
    } else if (isFollowing === 2) {
      if (window.confirm("해당 사용자를 언팔로우 하시겠습니까?")) {
        unFollowUserMutation(handleUserId);
      }
    }
  };

  return (
    <NotificationCardButton onClick={goToProfile} disableRipple>
      <ListItem>
        <ListItemAvatar style={{ width: "6rem", height: "6rem" }}>
          {/* <Avatar style={{ width: "6rem", height: "6rem" }}> */}
          {avatarImg}
          {/* </Avatar> */}
        </ListItemAvatar>
        <div style={{ marginLeft: "2rem", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <div>
              <div style={{ display: "flex", flexDirection: "row", marginBottom: "0.6rem", alignItems: "center" }}>
                <NotificationTextWrapper>
                  <MainNotificationText primary={nickname} />
                </NotificationTextWrapper>
                <NotificationTextWrapper>
                  <TierImg id="tier-img" src={TIER[userTier]} alt="티어" />
                </NotificationTextWrapper>
                <NotificationTextWrapper>
                  <PlusNotificationText style={{ color: "#878787" }} primary={`@${userId}`} />
                </NotificationTextWrapper>
              </div>

              <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <IntroductionContent style={{ color: "#878787" }}>{introduction}</IntroductionContent>
              </div>
            </div>

            <FollowContainer style={{ display: "flex", alignItems: "center" }}>
              {isFollowing === 0 && (
                <FollowButton className="follow" onClick={handleFollow}>
                  팔로우
                </FollowButton>
              )}
              {isFollowing === 1 && (
                <FollowButton className="me" onClick={handleFollow} disabled={status === 1}>
                  ME
                </FollowButton>
              )}
              {isFollowing === 2 && (
                <FollowButton className="unfollow" onClick={handleFollow}>
                  팔로잉
                </FollowButton>
              )}
            </FollowContainer>
          </div>
        </div>
      </ListItem>
    </NotificationCardButton>
  );
}

const NotificationCardButton = muiStyled(ListItemButton)({
  "&:hover": {
    backgroundColor: theme.colors.lightpurple,
  },
  "&:active": {
    backgroundColor: "none",
  },
  "%:focus": {
    backgroundColor: "none",
  },
});

const NotificationTextWrapper = styled("div")({
  display: "inline-block",
  width: "fit-content",
});

const MainNotificationText = muiStyled(ListItemText)({
  "& span": {
    color: theme.colors.black,
    fontFamily: "Spoqa Han Sans Neo",
    fontSize: "1.6rem",
    fontWeight: 500,
    letterSpacing: "0.03em",
  },
});

const TierImg = styled.img`
  margin-left: 0.6rem;
  width: 2rem;
  height: 2rem;
`;

const PlusNotificationText = muiStyled(ListItemText)({
  marginLeft: "0.6rem",

  "& span": {
    color: theme.colors.darkgrey_1,
    fontSize: "1.6rem",
    fontFamily: "Spoqa Han Sans Neo",
    fontWeight: 500,
    letterSpacing: "0.03em",
  },
});

const IntroductionContent = styled.div`
  font-size: 1.4rem;
  ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.darkgrey_1};
`;

const FollowButton = styled.button``;

const FollowContainer = styled.div`
  button {
    border: 1px solid ${({ theme }) => theme.colors.mainpurple};
    background-color: white;

    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.mainpurple};
    appearance: none; // 이 행은 브라우저 기본 스타일을 제거합니다.
    text-align: center;

    border-radius: 3rem;
    height: 3rem;
    width: 10rem;
    cursor: pointer;
  }
  button:active,
  button:focus,
  button:focus-visible {
    outline: none;
  }
  button.follow {
    border: none;
    background-color: ${({ theme }) => theme.colors.mainpurple};

    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.white};
  }
  .follow:hover {
    background-color: ${({ theme }) => theme.colors.darkpurple_2};
  }
  button.me {
    border: none;
    background-color: ${({ theme }) => theme.colors.lightpurple};
  }
`;
