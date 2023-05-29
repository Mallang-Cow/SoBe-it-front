import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { signin } from "../../api/userAPI";
import { Button, ButtonGroup, Container, TextField, Typography } from '@mui/material';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { theme } from '../style/theme';
import '../style/RootContainer.css';
import { SIDEBAR_DETAIL } from "../../core/sideBarData";

export default function Login() {
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const isLoggedIn = () => {
    const token = sessionStorage.getItem("ACCESS_TOKEN");

    if (token && token !== "null" && token !== "") {
      return true; // 토큰이 null과 빈 문자열이 아닌 다른 값으로 존재할 경우 true 반환
    }
    else {
      return false; // 토큰이 null이고 빈 문자열일 경우 false 반환
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      console.log(isLoggedIn());
      navigate("/");
    }
  }, [navigate]);

  const { mutate: loginUser } = useMutation(signin, {
    onSuccess: (response) => {
      if (response.token) {
        sessionStorage.setItem("ACCESS_TOKEN", response.token);
        navigate("/");
      }
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        alert("로그인 정보를 다시 확인해 주세요.");
      }
    },
  });

  const login = async () => {
    const loginData = {
      user_id: idRef.current.value,
      password: passwordRef.current.value,
    };

    loginUser(loginData);
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  const navigateToFindId = () => {
    navigate("/find-id");
  };

  const navigateToFindPassword = () => {
    navigate("/find-password");
  };

  return (
    <div className="RootContainer">
      <Container component="main" style={{ width:"54rem" }}>
        <LogoContainer>
          <img src={SIDEBAR_DETAIL.user.profileImageUrl} alt="로고" style={{ width: "3rem", height: "3rem", borderRadius: "1rem" }}/>
        </LogoContainer>

        <TitleContainer>
          <TitleTypography variant="h3">Log in</TitleTypography>
        </TitleContainer>

        <FormContainer >
          <InputTextField label="ID" type="text" fullWidth inputRef={ idRef }/>
          <InputTextField label="Password" type="password" fullWidth inputRef={ passwordRef } />
          <LoginButton variant="contained" fullWidth onClick={ login }>Log In</LoginButton>

          <ThemeProvider theme={ ButtonGroupTheme } >
            <ButtonGroup variant="text" aria-label="text button group" color="primary" fullWidth>
              <GroupButton onClick={ navigateToRegister }>회원가입</GroupButton>
              <GroupButton onClick={ navigateToFindId }>아이디 찾기</GroupButton>
              <GroupButton onClick={ navigateToFindPassword }>비밀번호 찾기</GroupButton>
            </ButtonGroup>
          </ThemeProvider>
        </FormContainer>
      </Container>
    </div>
  );
}

const LogoContainer = styled(Container) ({

});

const TitleContainer = styled(Container) ({
  paddingBottom: '2.2rem',
});

const TitleTypography = styled(Typography) ({
  fontSize: '4.2rem',
  fontFamily: [
    'Spoqa Han Sans Neo',
  ].join(','),
  fontStyle: 'normal',
  fontWeight: 700,
  letterSpacing: '0.03em',
});

const FormContainer = styled(Container) ({

});

const InputTextField = styled(TextField) ({
  marginBottom: '2rem',
  '& input': {
    height: '1.8rem',
    fontSize: '1.6rem',
  },
  '& label': {
    fontSize: '1.6rem',
    color: theme.colors.lightgrey_2, // 기본 label 색상
  },
  '& label.Mui-focused': {
    fontSize: '1.6rem',
    color: theme.colors.darkgrey_1,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.colors.lightpurple,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.colors.lightgrey_2,
    },
    '&:hover fieldset': {
      borderColor: theme.colors.darkgrey_1,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.colors.lightpurple,
    },
  },
});

const LoginButton = styled(Button) ({
  color: theme.colors.white,
  height: '4.6rem',
  marginTop: '1rem',
  marginBottom: '1.8rem',
  textTransform: 'none',
  fontSize: '1.8rem',
  fontFamily: [
    'Spoqa Han Sans Neo',
  ].join(','),
  fontStyle: 'normal',
  fontWeight: 700,
  letterSpacing: '0.03em',
  backgroundColor: theme.colors.mainpurple,
  borderColor: theme.colors.lightgrey_2,
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

const ButtonGroupTheme = createTheme ({
  palette: {
    primary: {
      main: theme.colors.mainpurple,
    },
  },
});

const GroupButton = styled(Button) ({
  color: theme.colors.mainpurple,
  fontSize: '1.6rem',
  fontFamily: [
    'Spoqa Han Sans Neo',
  ].join(','),
  fontStyle: 'normal',
  fontWeight: 400,
  letterSpacing: '0.03em',  
  textTransform: 'none',
  '&:focus': {
    boxShadow: '0 0 0 0.04rem #EDEDED',
    border: 'none',
    outline: 'none',
  },
});
