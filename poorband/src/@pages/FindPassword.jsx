import React, { useRef } from "react";
import { styled } from "styled-components";
import { useMutation } from "react-query";
import { findPassword } from "../../api/userAPI";

export default function FindPassword() {
  const userNameRef = useRef(null);
  const userPhoneNumberRef = useRef(null);

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
      phoneNumber: userPhoneNumberRef.current.value
    };

    findUserPassword(findPasswordDTO);
  }

  return (
    <FindPasswordWrapper>
      <LogoContainer>
        <img src="" alt="로고" />
      </LogoContainer>

      <TitleContainer>
        <span>Find Password</span>
      </TitleContainer>

      <FormContainer>
        <div>이름</div>
        <input type="text" ref={ userNameRef } />
        <br/>

        <div>전화번호</div>
        <input type="text" ref={ userPhoneNumberRef } />
        <br/>
      </FormContainer>
        
      <ButtonContainer>
        <button onClick={ handleFindPassword }>비밀번호 찾기</button>
      </ButtonContainer>
    </FindPasswordWrapper>
  );
}

const FindPasswordWrapper = styled.main`
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
