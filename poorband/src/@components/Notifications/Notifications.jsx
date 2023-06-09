import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { styled as muiStyled } from "@mui/material/styles";
import { styled } from "styled-components";
import { Button, List } from "@mui/material";
import { theme } from "../../style/theme";
import { selectAllNotification } from "../../../api/notificationAPI";
import ArticleLikeNotificationCard from "./ArticleLikeNotificationCard";
import ReplyNotificationCard from "./ReplyNotificationCard";
import ReplyLikeNotificationCard from "./ReplyLikeNotificationCard";
import FollowNotificationCard from "./FollowNotificationCard";
import { deleteAllNotification } from "../../../api/notificationAPI";

export default function Notifications(props) {
  const { setArticleSeq, setCenterContent, setUserId } = props;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await selectAllNotification();
      console.log(response);
      setNotifications(response); // API에서 받은 알림 데이터를 상태로 설정
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteNotification = (notificationSeq) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.notificationSeq !== notificationSeq),
    );
  };

  const renderNotificationCard = (notification) => {
    const { type } = notification; // 비구조화 할당 문법 : notification 객체에서 type 속성 추출  // const type = notification.type과 동일

    switch (type) {
      case 1: // 댓글 알림
        return (
          <ReplyNotificationCard
            key={notification.notificationSeq}
            notificationSeq={notification.notificationSeq}
            type={notification.type}
            content={notification.content}
            articleContent={notification.articleContent}
            notArticleSeq={notification.notArticleSeq}
            imageUrl={notification.imageUrl}
            timestamp={notification.timestamp}
            setCenterContent={setCenterContent}
            setArticleSeq={setArticleSeq}
            onDelete={handleDeleteNotification}
          />
        );
      case 2: // 팔로우 알림
        return (
          <FollowNotificationCard
            key={notification.notificationSeq}
            notificationSeq={notification.notificationSeq}
            type={notification.type}
            followingUserNickName={notification.followingUserNickName}
            followingUserId={notification.followingUserId}
            following={notification.following}
            content={notification.content}
            userTier={notification.userTier}
            url={notification.url}
            imageUrl={notification.imageUrl}
            timestamp={notification.timestamp}
            setCenterContent={setCenterContent}
            setUserId={setUserId}
            onDelete={handleDeleteNotification}
          />
        );
      case 3: // 댓글 좋아요 알림
        return (
          <ReplyLikeNotificationCard
            key={notification.notificationSeq}
            notificationSeq={notification.notificationSeq}
            type={notification.type}
            content={notification.content}
            articleContent={notification.articleContent}
            notArticleSeq={notification.notArticleSeq}
            imageUrl={notification.imageUrl}
            timestamp={notification.timestamp}
            setCenterContent={setCenterContent}
            setArticleSeq={setArticleSeq}
            onDelete={handleDeleteNotification}
          />
        );
      case 4: // 게시글 좋아요 알림
        return (
          <ArticleLikeNotificationCard
            key={notification.notificationSeq}
            notificationSeq={notification.notificationSeq}
            type={notification.type}
            content={notification.content}
            articleContent={notification.articleContent}
            notArticleSeq={notification.notArticleSeq}
            timestamp={notification.timestamp}
            setCenterContent={setCenterContent}
            setArticleSeq={setArticleSeq}
            onDelete={handleDeleteNotification}
          />
        );
      default:
        return null;
    }
  };

  const { mutate: deleteAllNotifications, isLoading: isDeletingAll } = useMutation(deleteAllNotification, {
    onSuccess: (response) => {
      if (response) {
        console.log("알림 전체 삭제 성공");
        setNotifications([]); // 알림 상태 초기화
      } else {
        console.log("알림 전체 삭제 실패");
      }
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        alert("알림 전체 삭제 과정에 오류가 발생했습니다.");
      }
    },
  });

  return (
    <div>
      <HeaderContainer>
        <header>Notifications</header>
      </HeaderContainer>

      <List dense={false}>
        {/* 전체 삭제 버튼 */}
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", paddingRight: "1.6rem" }}>
          <DeleteAllNotificationButton onClick={deleteAllNotifications} disabled={isDeletingAll}>
            {isDeletingAll ? "삭제 중..." : "전체 알림 삭제"}
          </DeleteAllNotificationButton>
        </div>

        {/* 알림 전체 불러오기 */}
        {/* 알림 목록 렌더링 */}
        {notifications.map((notification) => renderNotificationCard(notification))}
      </List>
    </div>
  );
}

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  padding: 4rem 3rem 2rem;
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1};

  ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 2.4rem;

  span {
    font-size: 3rem;
    margin-right: 1rem;
  }
`;

const DeleteAllNotificationButton = muiStyled(Button)({
  marginTop: "0rem",
  marginRight: "0.8rem",
  marginBottom: "0.4rem",
  marginLeft: "0rem",
  textAlign: "center",
  color: theme.colors.lightgrey_2,
  fontSize: "1.4rem",
  fontFamily: ["Spoqa Han Sans Neo"].join(","),
  fontStyle: "normal",
  fontWeight: 500,
  letterSpacing: "0.012rem",
  "&:hover": {
    backgroundColor: theme.colors.lightgrey_1,
  },
  "&:active": {
    backgroundColor: "none",
  },
  "&:focus": {
    border: "none",
    outline: "none",
  },
});
