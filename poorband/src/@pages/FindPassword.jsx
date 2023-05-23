import React, { useRef } from "react";
import { styled } from "styled-components";

export default function FindPassword() {
  const userNameRef = useRef(null);
  const userPhoneNumberRef = useRef(null);

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
        <button>비밀번호 찾기</button>
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
