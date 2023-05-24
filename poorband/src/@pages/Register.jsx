import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { signup } from "../../api/userAPI";
import { smsAuthOk, smsAuthRequest } from "../../api/smsAPI";
import { Button, Container, TextField, Typography } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';
import { theme } from '../style/theme';
import '../style/RootContainer.css';
import { SIDEBAR_DETAIL } from "../../core/sideBarData";

export default function Register() {
  const userIdRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordCheckRef = useRef(null);
  const userNameRef = useRef(null);
  const nicknameRef = useRef(null);
  const userEmailRef = useRef(null);
  const userPhoneNumberRef = useRef(null);
  const authenticationNumberRef = useRef(null);
  const navigate = useNavigate();

  const { mutate: registerUser } = useMutation(signup, {
    onSuccess: (response) => {
      // 회원 가입 성공 시 처리할 로직 작성
      // 회원 가입 후 로그인 페이지로 이동
      navigate("/"); // 추후 경로 /login으로 수정
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        alert("회원 가입 정보를 다시 확인해 주세요.");
      }
    },
  });

  const register = () => {
    const userDTO = {
      user_id: userIdRef.current.value,
      password: passwordRef.current.value,
      user_name: userNameRef.current.value,
      nickname: nicknameRef.current.value,
      email: userEmailRef.current.value,
      phone_number: userPhoneNumberRef.current.value
    };

    registerUser(userDTO);
  };

  const { mutate: userSmsAuthRequest } = useMutation(smsAuthRequest, {
    onSuccess: (response) => {
      // 전화번호 인증 요청 성공 시 처리할 로직 작성
      // 커서가 자동으로 인증 번호 입력으로 넘어가도록 작성하기
      if (response === false) {
        alert("전화번호 인증 요청 실패");
      } else {
        alert("전화번호 인증 요청 성공");
      }
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        alert("전화번호를 다시 확인해 주세요.");
      }
    },
  });

  const smsRequest = () => {
    const tel = userPhoneNumberRef.current.value;

    userSmsAuthRequest(Number(tel));
  };

  const { mutate: userSmsAuthOk } = useMutation(smsAuthOk, {
    onSuccess: (response) => {
      if (response === false) {
        alert("전화번호 인증 확인 실패");
      } else {
        alert("전화번호 인증 확인 성공")
      }
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        alert("인증에 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    },
  });

  const smsOk = () => {
    const code = authenticationNumberRef.current.value;

    userSmsAuthOk(code);
  }

  return (
    <div className="RootContainer">
    <Container component="main" style={{ width:"54rem" }}>
      <LogoContainer>
        <img src={SIDEBAR_DETAIL.user.profileImageUrl} alt="로고" style={{ width: "3rem", height: "3rem", borderRadius: "1rem" }}/>
      </LogoContainer>

      <TitleContainer>
        <TitleTypography variant="h3">Register</TitleTypography>
      </TitleContainer>

      <RegisterFormContainer style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "33.2rem" }}>
            <InputTextField label="아이디" variant="standard" type="text" fullWidth inputRef={ userIdRef } />
          </div>
          <div style={{ width: "9.4rem" }}>
           <CheckButton fullWidth>중복 확인</CheckButton>
          </div>
        </div>

        <InputTextField label="비밀번호" variant="standard" type="password" fullWidth inputRef={ passwordRef } />

        <InputTextField label="비밀번호 확인" variant="standard" type="password" fullWidth inputRef={ passwordCheckRef }/>
        
        <InputTextField label="이름" variant="standard" type="text" fullWidth inputRef={ userNameRef }/>

        <InputTextField label="닉네임" variant="standard" type="text" fullWidth inputRef={ nicknameRef }/>

        <InputTextField label="이메일" variant="standard" type="email" fullWidth inputRef={ userEmailRef }/>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "33.2rem" }}>
            <InputTextField label="전화번호" variant="standard" type="text" fullWidth inputRef={ userPhoneNumberRef }/>
          </div>
          <div style={{ width: "9.4rem" }}>
            <CheckButton fullWidth onClick={ smsRequest }>인증 요청</CheckButton>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "33.2rem" }}>
            <InputTextField label="인증 번호" variant="standard" type="text" fullWidth inputRef={ authenticationNumberRef }/>
          </div>
          <div style={{ width: "9.4rem" }}>
            <CheckButton fullWidth onClick={ smsOk }>인증 확인</CheckButton>
          </div>
        </div>
      </RegisterFormContainer>

      <ButtonContainer>
        <RegisterButton variant="contained" fullWidth onClick={ register }>Register</RegisterButton>
      </ButtonContainer>
    </Container>
    </div>
  );
}

const LogoContainer = styled(Container) ({

});

const TitleContainer = styled(Container) ({
  marginBottom: '2.2rem',
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

const RegisterFormContainer = styled(Container) ({

});

const InputTextField = styled(TextField) ({
  marginBottom: '1.6rem',
  '& input': {
    height: '1.8rem',
    fontSize: '1.6rem',
  },
  '& label': {
    fontSize: '1.6rem',
    color: theme.colors.lightgrey_2, // 기본 label 색상
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: theme.colors.lightgrey_2, // 기본 border 색상
  },
  '& label.Mui-focused': {
    fontSize: '1.4rem',
    color: theme.colors.darkgrey_1,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.colors.mainpurple,
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': { // hover 했을 때
    borderBottomWidth: '1px',
    borderBottomColor: theme.colors.darkgrey_1,
  },
});

const CheckButton = styled(Button) ({
  color: theme.colors.white,
  height: '4.3rem',
  marginBottom: '1.8rem',
  textTransform: 'none',
  fontSize: '1.2rem',
  fontFamily: [
    'Spoqa Han Sans Neo',
  ].join(','),
  fontStyle: 'normal',
  fontWeight: 500,
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

const ButtonContainer = styled(Container) ({

});

const RegisterButton = styled(Button) ({
  color: theme.colors.white,
  height: '4.3rem',
  marginTop: '1rem',
  marginBottom: '1.8rem',
  textTransform: 'none',
  fontSize: '1.2rem',
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
