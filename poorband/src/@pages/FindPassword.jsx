import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { findPassword } from "../../api/userAPI";
import { Button, ButtonGroup, Container, TextField, Typography } from "@mui/material";
import { createTheme, styled as muiStyled, ThemeProvider } from "@mui/material/styles";
import { theme } from "../style/theme";
import "../style/RootContainer.css";
import { SIDEBAR_DETAIL } from "../../core/sideBarData";

export default function FindPassword() {
  const userNameRef = useRef(null);
  const userPhoneNumberRef = useRef(null);
  const navigate = useNavigate();

  const { mutate: findUserPassword } = useMutation(findPassword, {
    onSuccess: (response) => {
      alert(response);
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        alert("회원 정보를 다시 확인해 주세요.");
      }
    },
  });

  const handleFindPassword = async () => {
    const findPasswordDTO = {
      userName: userNameRef.current.value,
      phoneNumber: userPhoneNumberRef.current.value,
    };

    findUserPassword(findPasswordDTO);
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToFindId = () => {
    navigate("/find-id");
  };

  return (
    <div className="RootContainer">
      <Container component="main" style={{ width: "54rem" }}>
        <LogoContainer>
          <img src="https://i.ibb.co/J742sC7/1-5.png" alt="로고" style={{ width: "6rem", marginBottom: "2rem" }} />
        </LogoContainer>

        <TitleContainer>
          <TitleTypography variant="h3">비밀번호 찾기</TitleTypography>
        </TitleContainer>

        <FormContainer>
          <InputTextField label="이름" type="text" fullWidth inputRef={userNameRef} />
          <InputTextField label="전화번호" type="text" fullWidth inputRef={userPhoneNumberRef} />
          <FindPasswordButton variant="contained" fullWidth onClick={handleFindPassword}>
            비밀번호 찾기
          </FindPasswordButton>

          <ThemeProvider theme={ButtonGroupTheme}>
            <ButtonGroup variant="text" aria-label="text button group" color="primary" fullWidth>
              <GroupButton onClick={navigateToRegister}>회원가입</GroupButton>
              <GroupButton onClick={navigateToLogin}>로그인</GroupButton>
              <GroupButton onClick={navigateToFindId}>아이디 찾기</GroupButton>
            </ButtonGroup>
          </ThemeProvider>
        </FormContainer>
      </Container>
    </div>
  );
}

const LogoContainer = muiStyled(Container)({});

const TitleContainer = muiStyled(Container)({
  paddingBottom: "2.2rem",
});

const TitleTypography = muiStyled(Typography)({
  fontSize: "4.2rem",
  fontFamily: ["Spoqa Han Sans Neo"].join(","),
  fontStyle: "normal",
  fontWeight: 700,
  letterSpacing: "0.03em",
});

const FormContainer = muiStyled(Container)({});

const InputTextField = muiStyled(TextField)({
  marginBottom: "2rem",
  "& input": {
    height: "1.8rem",
    fontSize: "1.6rem",
  },
  "& label": {
    fontSize: "1.6rem",
    color: theme.colors.lightgrey_2, // 기본 label 색상
  },
  "& label.Mui-focused": {
    fontSize: "1.6rem",
    color: theme.colors.darkgrey_1,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.colors.lightpurple,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.colors.lightgrey_2,
    },
    "&:hover fieldset": {
      borderColor: theme.colors.darkgrey_1,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.colors.lightpurple,
    },
  },
});

const FindPasswordButton = muiStyled(Button)({
  color: theme.colors.white,
  height: "4.6rem",
  marginTop: "1rem",
  marginBottom: "1.8rem",
  textTransform: "none",
  fontSize: "1.8rem",
  fontFamily: ["Spoqa Han Sans Neo"].join(","),
  fontStyle: "normal",
  fontWeight: 700,
  letterSpacing: "0.03em",
  backgroundColor: theme.colors.mainpurple,
  borderColor: theme.colors.lightgrey_2,
  "&:hover": {
    backgroundColor: theme.colors.darkpurple_2,
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: theme.colors.lightpurple,
    borderColor: theme.colors.lightgrey_1,
  },
  "&:focus": {
    boxShadow: "0 0 0 0.04rem #EDEDED",
    border: "none",
    outline: "none",
  },
});

const ButtonGroupTheme = createTheme({
  palette: {
    primary: {
      main: theme.colors.mainpurple,
    },
  },
});

const GroupButton = muiStyled(Button)({
  color: theme.colors.mainpurple,
  fontSize: "1.6rem",
  fontFamily: ["Spoqa Han Sans Neo"].join(","),
  fontStyle: "normal",
  fontWeight: 400,
  letterSpacing: "0.03em",
  textTransform: "none",
  "&:focus": {
    boxShadow: "0 0 0 0.04rem #EDEDED",
    border: "none",
    outline: "none",
  },
});
