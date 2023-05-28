import React, { useState } from "react";
import { useMutation } from "react-query";
import { styled as muiStyled } from '@mui/material/styles';
import { styled } from "styled-components";
import { Avatar, Button, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import { theme } from '../../style/theme';
// import { SIDEBAR_DETAIL } from "../../../core/sideBarData";
import { TIER } from "../../../core/tierImage";
import { followUser, unFollowUser } from "../../../api/followAPI";

export default function UserCard(props) {
  const { userId, nickname, userTier, introduction, profileImgUrl, status, setCenterContent, setUserId } = props;
  const [isFollowing, setIsFollowing] = useState(status);

  // 나를 팔로우한 사용자 프로필 페이지로 이동
  function goToProfile() {
    setUserId(userId);
    setCenterContent("profile");
  }

  // 사용자 프로필 이미지
  let avatarImg = null;
  if (profileImgUrl) {
    avatarImg = <img src={ profileImgUrl } alt="사용자 프로필 이미지" style={{ width: "100%", height: "100%" }} />;
  }
  else {
//    avatarImg = <img src={ SIDEBAR_DETAIL.user.profileImageUrl } style={{ width: "100%", height: "100%", borderRadius: "1rem" }} />;
    avatarImg = <MoodBadIcon style={{ width: "6rem", height: "6rem", color: "#845EC2" }}/>;
  }

  // 팔로우
  const { mutate: followUserMutation } = useMutation(followUser, {
    onSuccess: (response) => {
      console.log("팔로우 : " + response);

      if (response === "success") {
        setIsFollowing(true); // 팔로우 상태 변경
      }
      else {
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
        setIsFollowing(false); // 팔로우 상태 변경
      }
      else {
        console.log("언팔로우 실패");
      }
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        alert("언팔로우 과정에 오류가 발생했습니다.");
      }
    }
  });

  const handleFollow = (event) => {
    event.stopPropagation(); // 이벤트 버블링 중단
    
    console.log("팔로우 또는 언팔로우할 사용자 아이디 : " + userId);

    const handleUserId = {
      userId: userId,
    };

    if (isFollowing === 0) {
      followUserMutation(handleUserId);
    }
    else if (isFollowing === 2) {
      unFollowUserMutation(handleUserId);
    }
  }

  return (
    <NotificationCardButton onClick={ goToProfile } disableRipple>
      <ListItem>        
        <ListItemAvatar style={{ width: "6rem", height: "6rem" }}>
          {/* <Avatar style={{ width: "6rem", height: "6rem" }}> */}
            { avatarImg }
          {/* </Avatar> */}
        </ListItemAvatar>
        <div style={{ marginLeft: "2rem", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <div>
              <div style={{ display: "flex", flexDirection: "row", marginBottom: "0.6rem", alignItems: "center" }}>
                <NotificationTextWrapper>
                  <MainNotificationText primary={ nickname } />
                </NotificationTextWrapper>
                <NotificationTextWrapper>
                  <TierImg id="tier-img" src={ TIER[userTier] } alt="티어" />
                </NotificationTextWrapper>
                <NotificationTextWrapper>
                  <PlusNotificationText style={{ color: "#878787" }} primary={ `@${ userId }` } />
                </NotificationTextWrapper>
              </div>
              
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <IntroductionContent style={{ color: "#878787" }}>{ introduction }</IntroductionContent>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <FollowButton onClick={ handleFollow } disabled={ status === 1 }>
                { isFollowing === 1 ? "ME" : isFollowing ? "언팔로우" : "팔로우" }
              </FollowButton>
            </div>
          </div>
        </div>
      </ListItem>
    </NotificationCardButton>
  );
}

const NotificationCardButton = muiStyled(ListItemButton) ({
  '&:hover': {
    backgroundColor: theme.colors.lightpurple,
  },
  '&:active': {
    backgroundColor: 'none',
  },
  '%:focus': {
    backgroundColor: 'none',
  },
});

const NotificationTextWrapper = styled('div')({
  display: 'inline-block',
  width: 'fit-content',
});

const MainNotificationText = muiStyled(ListItemText) ({
  '& span': { 
    fontSize: '1.6rem',
    fontFamily: [
      'Roboto',
    ].join(','),
    fontStyle: 'normal',
    fontWeight: 500,
    letterSpacing: '0.03em',
  },
});

const TierImg = styled.img`
  margin-left: 0.6rem;
  width: 2rem;
  height: 2rem;
`;

const PlusNotificationText = muiStyled(ListItemText) ({
  marginLeft: '0.6rem',

  '& span': { 
    fontSize: '1.2rem',
    fontFamily: [
      'Roboto',
    ].join(','),
    fontStyle: 'normal',
    fontWeight: 500,
    letterSpacing: '0.03em',
  },
});

const IntroductionContent = styled.div`
  font-size: 1.4rem;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.03em;
`;

const FollowButton = muiStyled(Button) ({
  width: '3.4rem',
  height: '2.2rem',
  borderRadius: '3rem',
  color: theme.colors.white,
  backgroundColor: theme.colors.mainpurple,
  fontSize: '1.2rem',
  fontFamily: [
    'Spoqa Han Sans Neo',
  ].join(','),
  fontStyle: 'normal',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: theme.colors.darkpurple_2
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: theme.colors.lightpurple,
    borderColor: theme.colors.lightgrey_1,
  },
  '&:focus': {
    boxShadow: '0 0 0 0.04rem #EDEDED',
    border: 'none',
    outline: 'none',
  },
});
