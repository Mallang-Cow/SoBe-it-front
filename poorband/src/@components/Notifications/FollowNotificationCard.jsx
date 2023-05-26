import React from "react";
import { styled as muiStyled } from '@mui/material/styles';
import { styled } from "styled-components";
import { Avatar, Button, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import ClearIcon from '@mui/icons-material/Clear';
import { theme } from '../../style/theme';

export default function FollowNotificationCard() {
  return (
    <NotificationCardButton disableRipple>
      <ListItem secondaryAction={
                    <NotificationIconButton edge="end" aria-label="delete">
                      <ClearIcon />
                    </NotificationIconButton> }>
        
        <ListItemAvatar style={{ width: "6rem", height: "6rem" }}>
          <Avatar style={{ width: "6rem", height: "6rem" }}>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <div style={{ marginLeft: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
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

            <div>
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
  '& .MuiButtonBase-root': {
    // ListItemButton 내의 ButtonBase 컴포넌트에 대한 스타일링
    pointerEvents: 'none',
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
});
