import React from "react";
import { styled as muiStyled } from '@mui/material/styles';
import { styled } from "styled-components";
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import ClearIcon from '@mui/icons-material/Clear';
import { theme } from '../../style/theme';

export default function ReplyNotificationCard() {
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
          <div style={{ display: "flex", flexDirection: "row", marginBottom: '0.6rem', alignItems: 'center' }}>
            <MainNotificationText primary="Reply Content" />
            <TimeNotificationText primary="time" />
          </div>
          <SubNotificationText secondary="Article Content" />
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

const TimeNotificationText = muiStyled(ListItemText) ({
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
