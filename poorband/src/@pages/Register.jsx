import React, { useRef } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { signup } from "../../api/user";

export default function Register() {
  const userIdRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordCheckRef = useRef(null);
  const userNameRef = useRef(null);
  const nicknameRef = useRef(null);
  const userEmailRef = useRef(null);
  const userPhoneNumberRef = useRef(null);
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

  return (
    <RegisterWrapper>
      <LogoContainer>
        <img src="" alt="로고" />
      </LogoContainer>
      <TitleContainer>
        <span>Register</span>
      </TitleContainer>
      <FormContainer>
        <div>아이디</div>
        <input type="text" ref={ userIdRef } />
        <button>중복 확인</button>
        <br />
        <div>비밀번호</div>
        <input type="password" ref={ passwordRef } />
        <br />
        <div>비밀번호 확인</div>
        <input type="password" ref={ passwordCheckRef }/>
        <br />
        <div>이름</div>
        <input type="text" ref={ userNameRef }/>
        <br />
        <div>닉네임</div>
        <input type="text" ref={ nicknameRef }/>
        <br />
        <div>이메일</div>
        <input type="text" ref={ userEmailRef }/>
        <br />
        <div>전화번호</div>
        <input type="text" ref={ userPhoneNumberRef }/>
        <button>인증 요청</button>
      </FormContainer>
      <ButtonContainer>
        <button onClick={ register }>Register</button>
      </ButtonContainer>
    </RegisterWrapper>
  );
}

const RegisterWrapper = styled.main`
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
