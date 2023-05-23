import React, { useRef } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { signup } from "../../api/user";
import { smsAuthOk, smsAuthRequest } from "../../api/smsAPI";

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
      if (response.data === false) {
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
      if (response.data === false) {
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
        <button onClick={ smsRequest }>인증 요청</button>
        <div>인증 번호</div>
        <input type="text" ref={ authenticationNumberRef }/>
        <button onClick={ smsOk }>인증 확인</button>
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
