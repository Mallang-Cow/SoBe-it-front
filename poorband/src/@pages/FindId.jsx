import React, { useRef } from "react";
import { styled } from "styled-components";
import { useMutation } from "react-query";
import { findId } from "../../api/userAPI";

export default function FindId() {
  const userNameRef = useRef(null);
  const userPhoneNumberRef = useRef(null);

  const { mutate: findUserId } = useMutation(findId, {
    onSuccess: (data) => {
      alert("User Id : " + data.userId);
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        alert("회원 정보를 다시 확인해 주세요.");
      }
    },
  });

  const handleFindId = async () => {
    const findIdDTO = {
      inputUserName: userNameRef.current.value,
      inputUserPhoneNumber: userPhoneNumberRef.current.value
    };

    findUserId(findIdDTO);
  }

  return (
    <FindIdWrapper>
      <LogoContainer>
        <img src="" alt="로고" />
      </LogoContainer>

      <TitleContainer>
        <span>Find Id</span>
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
        <button onClick={ handleFindId }>아이디 찾기</button>
      </ButtonContainer>
    </FindIdWrapper>
  );
}

const FindIdWrapper = styled.main`
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
