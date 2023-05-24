import React from 'react'
import { styled } from 'styled-components';

export default function ChallengeCardMakeBtn(props) {
  const {setShowChallengeMake}=props;

  return (
    <>
      <ChallengeCardMakeBtnWrapper>
        <MakeButton onClick={() => setShowChallengeMake(true)}> + 새로운 도전과제 시작하기</MakeButton>
      </ChallengeCardMakeBtnWrapper>
    </>
  );
}

const ChallengeCardMakeBtnWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`; 

const MakeButton = styled.button`
  ${({ theme }) => theme.fonts.bold};
  background-color: ${({ theme }) => theme.colors. mainpurple};
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;

  text-align: center;
  display: flex;
  justify-content: center;
`; 