import React, { useEffect, useState } from "react";
import ArticleLikeNotificationCard from "./ArticleLikeNotificationCard";
import { styled as muiStyled } from '@mui/material/styles';
import { styled } from "styled-components";
import { List, Typography } from '@mui/material';
import { theme } from '../../style/theme';
import ReplyNotificationCard from "./ReplyNotificationCard";
import { selectAllNotification } from "../../../api/notificationAPI";
import ReplyLikeNotificationCard from "./ReplyLikeNotificationCard";
import FollowNotificationCard from "./FollowNotificationCard";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await selectAllNotification();
//      setNotifications(response); // API에서 받은 알림 데이터를 상태로 설정
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <HeaderContainer>
        <header>Notifications</header>
      </HeaderContainer>

      <List dense={ false }>
        {/* 전체 삭제 버튼 */}
        <DeleteAllNotificationText variant="h6">전체 알림 삭제</DeleteAllNotificationText>

        {/* 알림 전체 불러오기 */}
        {generate(
          <ArticleLikeNotificationCard />
        )}
        <ReplyNotificationCard />
        <ReplyLikeNotificationCard />
        <FollowNotificationCard />
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

const DeleteAllNotificationText = muiStyled(Typography) ({
  paddingRight: '1.6rem',
  paddingBottom: '0.4rem',
  textAlign: 'right',
  color: theme.colors.lightgrey_2,
  fontSize: '1.4rem',
  fontFamily: [
    'Spoqa Han Sans Neo',
  ].join(','),
  fontStyle: 'normal',
  fontWeight: 500,
});
