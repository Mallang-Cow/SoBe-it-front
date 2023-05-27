import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { styled as muiStyled } from '@mui/material/styles';
import { styled } from "styled-components";
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import { theme } from '../../style/theme';
// import { SIDEBAR_DETAIL } from "../../../core/sideBarData"; //"../../core/sideBarData";
import { deleteOneNotification } from "../../../api/notificationAPI";

export default function ReplyNotificationCard({ notificationSeq, type, content, articleContent, notArticleSeq, imageUrl, timestamp, setCenterContent, setArticleSeq }) {
  const [time, setTime] = useState([]);
  const nowDate = new Date();
  const navigate = useNavigate();

  // 댓글이 작성된 게시글 상세 페이지로 이동
  function goToArticleDetail() {
    setArticleSeq(notArticleSeq);
    setCenterContent("detail");
  }

  // 사용자 프로필 이미지
  let avatarImg = null;
  if (imageUrl) {
    avatarImg = <img src={ imageUrl } alt="사용자 프로필 이미지" style={{ width: "100%", height: "100%" }} />;
  }
  else {
//    avatarImg = <img src={ SIDEBAR_DETAIL.user.profileImageUrl } style={{ width: "100%", height: "100%", borderRadius: "1rem" }} />;
    avatarImg = <MoodBadIcon style={{ width: "6rem", height: "6rem" }}/>;
  }

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
        console.log("댓글 알림 삭제 성공");
      }
      else {
        console.log("댓글 알림 삭제 실패");
      }
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        alert("댓글 알림 삭제 과정에 오류가 발생했습니다.");
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

  return (
    <NotificationCardButton onClick={ goToArticleDetail } disableRipple>
      <ListItem secondaryAction={
        <NotificationIconButton edge="end" aria-label="delete" onClick={ deleteNotification } disableRipple>
          <ClearIcon />
        </NotificationIconButton>
      }>
        <ListItemAvatar style={{ width: "6rem", height: "6rem" }}>
          <Avatar style={{ width: "6rem", height: "6rem" }}>
            { avatarImg }
          </Avatar>
        </ListItemAvatar>
        <div style={{ marginLeft: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "row", marginBottom: '0.6rem', alignItems: 'center' }}>
            <MainNotificationText primary={ content } />
            <TimeNotificationText primary={ time && (
              <p className="grey">
                {time[1]}
                {time[0] === "year" && "년"}
                {time[0] === "month" && "월"}
                {time[0] === "date" && "일"}
                {time[0] === "hours" && "시간"}
                {time[0] === "minutes" && "분"}
                {time[0] === "secounds" && "초"} 전
              </p>
            )} />
          </div>
          <SubNotificationText secondary={ articleContent } />
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

const NotificationIconButton = muiStyled(IconButton) ({
  '&:hover': {
    backgroundColor: theme.colors.lightpurple,
  },
  '&:active': {
    backgroundColor: 'none',
  },
  '&:focus': {
    border: 'none',
    outline: 'none',
  },
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

const TimeNotificationText = muiStyled(ListItemText) ({
  marginLeft: '0.6rem',

  '& span': { 
    color: '#85929E',
    fontSize: '1.2rem',
    fontFamily: [
      'Roboto',
    ].join(','),
    fontStyle: 'normal',
    fontWeight: 500,
    letterSpacing: '0.03em',
  },
});

const SubNotificationText = muiStyled(ListItemText) ({
  '& p': { 
    color: '#8799A5',
    fontSize: '1.4rem',
    fontFamily: [
      'Roboto',
    ].join(','),
    fontStyle: 'normal',
    fontWeight: 500,
    letterSpacing: '0.03em',
  },
});
