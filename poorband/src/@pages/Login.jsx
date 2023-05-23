import React, { useRef } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { signin } from "../../api/userAPI";

export default function Login() {
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const { mutate: loginUser } = useMutation(signin, {
    onSuccess: (response) => {
      if (response.token) {
        sessionStorage.setItem("ACCESS_TOKEN", response.token);
        navigate("/home");
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

  const navigateToFindId = () => {
    navigate("/find-id");
  };

  const navigateToFindPassword = () => {
    navigate("/find-password");
  };

  return (
    <LoginWrapper>
      <LogoContainer>
        <img src="" alt="로고" />
      </LogoContainer>
      <TitleContainer>
        <span>Log in</span>
      </TitleContainer>
      <FormContainer>
        <input type="text" ref={ idRef } />
        <input type="password" ref={ passwordRef } />
        <button onClick={ login }>Log in</button>
      </FormContainer>
      <ButtonContainer>
        <button>회원가입</button>
        <button onClick={ navigateToFindId }>아이디 찾기</button>
        <button onClick={ navigateToFindPassword }>비밀번호 찾기</button>
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
