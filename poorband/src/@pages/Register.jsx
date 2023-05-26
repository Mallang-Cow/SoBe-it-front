import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { checkId, signup } from "../../api/userAPI";
import { smsAuthOk, smsAuthRequest } from "../../api/smsAPI";
import { Button, Container, TextField, Typography } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';
import { theme } from '../style/theme';
import '../style/RootContainer.css';
import { SIDEBAR_DETAIL } from "../../core/sideBarData";

export default function Register() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [userName, setUserName] = useState("");
  const [nickname, setNickname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [authenticationNumber, setAuthenticationNumber] = useState("");
  const [isIdVerified, setIsIdVerified] = useState(false); // 아이디 중복 확인 체크 변수
  const [isPhoneRequested, setIsPhoneRequested] = useState(false); // 전화번호 인증 요청 체크 변수
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 전화번호 인증 완료 체크 변수
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
      user_id: userId,
      password: password,
      user_name: userName,
      nickname: nickname,
      email: userEmail,
      phone_number: userPhoneNumber
    };

    registerUser(userDTO);
  };

  const handleRegister = () => {
    if (userId && isIdVerified 
        && password && passwordCheck
        && password === passwordCheck
        && userName && nickname && userEmail
        && userPhoneNumber && authenticationNumber
        && isPhoneRequested
        && isAuthenticated) {
          register();
    }
    else {
      if (!userId) {
        alert("아이디를 입력해 주세요.");
      }
      else if (!isIdVerified) {
        alert("아이디 중복을 확인해 주세요.");
      }
      else if (!password) {
        alert("비밀번호를 입력해 주세요.");
      }
      else if (!passwordCheck) {
        alert("비밀번호를 확인해 주세요.");
      }
      else if (password !== passwordCheck) {
        alert("비밀번호가 다릅니다.");
      }
      else if (!userName || !nickname || !userEmail) {
        alert("가입 정보를 전부 입력해 주세요.");
      }
      else if (!userPhoneNumber) {
        alert("전화번호 입력 후 인증해 주세요.");
      }
      else if (!isPhoneRequested) {
        alert("전화번호 인증을 해 주세요.");
      }
      else if (!authenticationNumber) {
        alert("인증 번호를 입력해 주세요.");
      }
      else if (!isAuthenticated) {
        alert("인증 번호를 확인해 주세요.");
      }
      else {
        alert("가입 정보를 확인해 주세요.");
      }
    }
  }

  const { mutate: checkUserId } = useMutation(checkId, { // 아이디 중복 체크 API 연결
    onSuccess: (response) => {
      console.log(response);
      if (response.is_id_verified) {
        alert("아이디가 중복되지 않습니다.");
        setIsIdVerified(true); // 아이디 중복되지 않음으로 체크
      }
      else {
        alert("중복된 아이디입니다.");
        setIsIdVerified(false);
      }
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        alert("아이디를 다시 확인해 주세요.");
        setIsIdVerified(false);
      }
    },
  });

  const checkIdVerified = () => {
    if (userId === "") {
      alert("아이디를 입력해 주세요.");
    }
    else {
      const userDTO = {
        user_id: userId,
      };

      checkUserId(userDTO);
    }
  }

  const { mutate: userSmsAuthRequest } = useMutation(smsAuthRequest, {
    onSuccess: (response) => {
      // 전화번호 인증 요청 성공 시 처리할 로직 작성
      // 커서가 자동으로 인증 번호 입력으로 넘어가도록 작성하기
      if (response === false) {
        alert("전화번호 인증 요청 실패");
      } 
      else {
        alert("전화번호 인증 요청 성공");
        setIsPhoneRequested(true); // 전화번호 인증 요청 성공으로 체크
      }
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        alert("전화번호를 다시 확인해 주세요.");
      }
    },
  });

  const smsRequest = () => {
    const tel = userPhoneNumber;

    userSmsAuthRequest(Number(tel));
  };

  const { mutate: userSmsAuthOk } = useMutation(smsAuthOk, {
    onSuccess: (response) => {
      if (response === false) {
        alert("전화번호 인증 확인 실패");
      } else {
        alert("전화번호 인증 확인 성공")
        setIsAuthenticated(true); // 전화번호 인증 확인 성공으로 체크
      }
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        alert("인증에 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    },
  });

  const smsOk = () => {
    const data = {
      "code" : authenticationNumber,
      "phone" : userPhoneNumber
    };
    userSmsAuthOk(data);
  };

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

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
            <InputTextField label="아이디" variant="standard" type="text" fullWidth 
                            value={ userId } disabled={ isIdVerified } onChange={ (e) => handleChange(e, setUserId) } />
          </div>
          <div style={{ width: "9.4rem" }}>
           <CheckButton fullWidth disabled={ isIdVerified } onClick={ checkIdVerified }>중복 확인</CheckButton>
          </div>
        </div>

        <InputTextField label="비밀번호" variant="standard" type="password" fullWidth 
                        value={ password } onChange={ (e) => handleChange(e, setPassword) } />

        <InputTextField label="비밀번호 확인" variant="standard" type="password" fullWidth 
                        value={ passwordCheck } onChange={ (e) => handleChange(e, setPasswordCheck) }/>
        
        <InputTextField label="이름" variant="standard" type="text" fullWidth 
                        value={ userName } onChange={ (e) => handleChange(e, setUserName) }/>

        <InputTextField label="닉네임" variant="standard" type="text" fullWidth 
                        value={ nickname } onChange={ (e) => handleChange(e, setNickname) }/>

        <InputTextField label="이메일" variant="standard" type="email" fullWidth 
                        value={ userEmail } onChange={ (e) => handleChange(e, setUserEmail) }/>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "33.2rem" }}>
            <InputTextField label="전화번호" variant="standard" type="text" fullWidth 
                            value={ userPhoneNumber } onChange={ (e) => handleChange(e, setUserPhoneNumber) }/>
          </div>
          <div style={{ width: "9.4rem" }}>
            <CheckButton fullWidth onClick={ smsRequest }>인증 요청</CheckButton>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "33.2rem" }}>
            <InputTextField label="인증 번호" variant="standard" type="text" fullWidth 
                            value={ authenticationNumber } onChange={ (e) => handleChange(e, setAuthenticationNumber) }/>
          </div>
          <div style={{ width: "9.4rem" }}>
            <CheckButton fullWidth onClick={ smsOk } disabled={ !isPhoneRequested }>인증 확인</CheckButton>
          </div>
        </div>
      </RegisterFormContainer>

      <ButtonContainer>
        <RegisterButton variant="contained" fullWidth onClick={ handleRegister } disabled={ !isAuthenticated }>Register</RegisterButton>
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
