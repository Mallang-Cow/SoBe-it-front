import React from "react";
import { styled as muiStyled } from '@mui/material/styles';
import { styled } from "styled-components";
import { Avatar, Button, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import ClearIcon from '@mui/icons-material/Clear';
import { theme } from '../../style/theme';

export default function FollowNotificationCard() {
  const deleteNotification = (event) => {
    event.stopPropagation(); // 이벤트 버블링 중단
    console.log("삭제 버튼 클릭");
  };

  return (
    <NotificationCardButton disableRipple>
      <ListItem secondaryAction={
        <NotificationIconButton edge="end" aria-label="delete" onClick={ deleteNotification } disableRipple>
          <ClearIcon />
        </NotificationIconButton>
      }>
        
        <ListItemAvatar style={{ width: "6rem", height: "6rem" }}>
          <Avatar style={{ width: "6rem", height: "6rem" }}>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <div style={{ marginLeft: "2rem", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <div>
              <div style={{ display: "flex", flexDirection: "row", marginBottom: "0.6rem", alignItems: "center" }}>
                <MainNotificationText primary="NickName" />
                <PlusNotificationText primary="UserTier" />
                <PlusNotificationText primary="UserId" />
              </div>
              
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                {/* <SubNotificationText secondary="Follow Content" /> */}
                <FollowContent>Follow Content</FollowContent>
                <PlusNotificationText secondary="time" />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <FollowButton>팔로우</FollowButton>
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

const FollowContent = styled.div`
  color: #8799A5;
  font-size: 1.4rem;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.03em;
`;  

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
