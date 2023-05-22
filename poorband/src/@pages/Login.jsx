import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { userLogin } from "../../api/login";

export default function Login() {
  const [loginData, setloginData] = useState({
    user_id: "",
    password: "",
  });

  const idRef = useRef(null);
  const passwordRef = useRef(null);

  function login() {
    setloginData({ user_id: idRef.current.value, password: passwordRef.current.value });
  }

  const navigate = useNavigate();
  const { mutate: goToLogin } = useMutation(userLogin, {
    onSuccess: (response) => {
      window.sessionStorage.setItem("ACCESS_TOKEN", response.data.token);
      navigate("/home");
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        alert("다시 로그인해주세요.");
      }
    },
  });

  useEffect(() => {
    if (loginData.user_id && loginData.password) {
      console.log(loginData);
      goToLogin(loginData);
    }
  }, [loginData]);

  return (
    <LoginWrapper>
      <LogoContainer>
        <img src="" alt="로고" />
      </LogoContainer>
      <TitleContainer>
        <span>Log in</span>
      </TitleContainer>
      <FormContainer>
        <input type="text" ref={idRef} />
        <input type="password" ref={passwordRef} />
        <button onClick={login}>Log in</button>
      </FormContainer>
      <ButtonContainer>
        <span>회원가입</span>
        <span>아이디 찾기</span>
        <span>비밀번호 찾기</span>
      </ButtonContainer>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.main`
  background-color: green;
`;
const LogoContainer = styled.div``;
const TitleContainer = styled.div``;
const FormContainer = styled.div`
  input {
    border: 1px black solid;
    outline: black;
  }
`;
const ButtonContainer = styled.div``;
