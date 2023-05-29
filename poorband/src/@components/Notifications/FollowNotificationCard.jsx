import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { styled as muiStyled } from "@mui/material/styles";
import { styled } from "styled-components";
import { Avatar, Button, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { theme } from "../../style/theme";
import { TIER } from "../../../core/tierImage";
import { followUser, unFollowUser } from "../../../api/followAPI";
import { deleteOneNotification } from "../../../api/notificationAPI";
import { profileImg } from "../../../core/defaultImg";

export default function FollowNotificationCard({
  notificationSeq,
  type,
  followingUserNickName,
  followingUserId,
  following,
  content,
  userTier,
  url,
  imageUrl,
  timestamp,
  setCenterContent,
  setUserId,
  onDelete,
}) {
  const [time, setTime] = useState([]);
  const nowDate = new Date();
  const [isFollowing, setIsFollowing] = useState(following);

  // 나를 팔로우한 사용자 프로필 페이지로 이동
  function goToProfile() {
    setUserId(followingUserId);
    setCenterContent("profile");
  }

  const onErrorImg = (e) => {
    e.target.src = profileImg;
  };

  // 사용자 프로필 이미지
  let avatarImg = (
    <img
      src={imageUrl || profileImg}
      onError={onErrorImg}
      alt="사용자 프로필 이미지"
      style={{ width: "100%", height: "100%", borderRadius: "1rem" }}
    />
  );

  // 알림 시간 구하기
  useEffect(() => {
    const notificationDate = new Date(timestamp);
    if (notificationDate.getFullYear() != nowDate.getFullYear())
      setTime(["year", nowDate.getFullYear() - notificationDate.getFullYear()]); // 연도 차이
    if (notificationDate.getMonth() != nowDate.getMonth())
      setTime(["month", nowDate.getMonth() - notificationDate.getMonth()]); // 달 차이
    else if (notificationDate.getDate() != nowDate.getDate())
      setTime(["date", nowDate.getDate() - notificationDate.getDate()]); // 일 차이
    else if (notificationDate.getHours() != nowDate.getHours())
      setTime(["hours", nowDate.getHours() - notificationDate.getHours()]); // 시간 차이
    else if (notificationDate.getMinutes() != nowDate.getMinutes())
      setTime(["minutes", nowDate.getMinutes() - notificationDate.getMinutes()]); // 분 차이
    else setTime(["seconds", nowDate.getSeconds() - notificationDate.getSeconds()]); // 초 차이
  }, []);

  const { mutate: deleteOneNotificationMutation } = useMutation(deleteOneNotification, {
    onSuccess: (response) => {
      if (response) {
        console.log("팔로우 알림 삭제 성공");
        onDelete(notificationSeq);
      } else {
        console.log("팔로우 알림 삭제 실패");
      }
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        alert("팔로우 알림 삭제 과정에 오류가 발생했습니다.");
      }
    },
  });

  const deleteNotification = (event) => {
    event.stopPropagation(); // 이벤트 버블링 중단
    console.log("삭제 버튼 클릭");

    const notificationDeleteDTO = {
      notificationSeq: notificationSeq,
      type: type,
    };

    console.log(notificationDeleteDTO);
    deleteOneNotificationMutation(notificationDeleteDTO);
  };

  // 팔로우
  const { mutate: followUserMutation } = useMutation(followUser, {
    onSuccess: (response) => {
      console.log("팔로우 : " + response);

      if (response === "success") {
        setIsFollowing(true); // 팔로우 상태 변경
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
        setIsFollowing(false); // 팔로우 상태 변경
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

    console.log("팔로우 또는 언팔로우할 사용자 아이디 : " + followingUserId);

    const handleUserId = {
      userId: followingUserId,
    };
    if (!isFollowing) {
      followUserMutation(handleUserId);
    } else {
      if (window.confirm("해당 사용자를 언팔로우 하시겠습니까?")) {
        unFollowUserMutation(handleUserId);
      }
    }
  };

  return (
    <NotificationCardButton onClick={goToProfile} disableRipple>
      <ListItem
        secondaryAction={
          <NotificationIconButton edge="end" aria-label="delete" onClick={deleteNotification} disableRipple>
            <span className="material-symbols-rounded">close</span>
          </NotificationIconButton>
        }>
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
                  <MainNotificationText primary={followingUserNickName} />
                </NotificationTextWrapper>
                <NotificationTextWrapper>
                  {/* <PlusNotificationText primary={ userTier } /> */}
                  <TierImg id="tier-img" src={TIER[userTier]} alt="티어" />
                </NotificationTextWrapper>
                <NotificationTextWrapper>
                  <PlusNotificationText style={{ color: "#878787" }} primary={`@${followingUserId}`} />
                </NotificationTextWrapper>
              </div>

              <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                {/* <SubNotificationText secondary="Follow Content" /> */}
                <FollowContent>{content}</FollowContent>
                <TimeNotificationText
                  secondary={
                    time && (
                      <span>
                        {time[1]}
                        {time[0] === "year" && "년"}
                        {time[0] === "month" && "월"}
                        {time[0] === "date" && "일"}
                        {time[0] === "hours" && "시간"}
                        {time[0] === "minutes" && "분"}
                        {time[0] === "secounds" && "초"} 전
                      </span>
                    )
                  }
                />
              </div>
            </div>

            <FollowContainer style={{ display: "flex", alignItems: "center" }}>
              {isFollowing ? (
                <FollowButton className="unfollow" onClick={handleFollow} disabled={status === 1}>
                  팔로잉
                </FollowButton>
              ) : (
                <FollowButton className="follow" onClick={handleFollow}>
                  팔로우
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

const NotificationIconButton = muiStyled(IconButton)({
  "&:hover": {
    backgroundColor: theme.colors.lightpurple,
  },
  "&:active": {
    backgroundColor: "none",
  },
  "&:focus": {
    border: "none",
    outline: "none",
  },
});

const CustomAccountBoxIconContainer = muiStyled("div")({
  width: "6rem",
  height: "6rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "0.4rem solid #845EC2",
  borderRadius: "1rem",
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

const TimeNotificationText = muiStyled(ListItemText)({
  marginLeft: "0.6rem",

  "& span": {
    color: theme.colors.lightgrey_2,
    fontSize: "1.4rem",
    fontFamily: "Spoqa Han Sans Neo",
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

const FollowContent = styled.div`
  font-size: 1.4rem;
  ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.darkgrey_1};
`;

const FollowButton = muiStyled(Button)({});

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
`;
