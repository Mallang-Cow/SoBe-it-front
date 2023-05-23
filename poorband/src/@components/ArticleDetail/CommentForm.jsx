import React from "react";
import { styled } from "styled-components";

export default function CommentForm() {
  return (
    <Wrapper>
      <ProfileContainer>
        <img src="" alt="프사" className="profile-img" />
        <p className="nickname">닉네임</p>
        <p className="id">아이디</p>
        <img src="" alt="티어" className="tier-img" />
      </ProfileContainer>
      <textarea type="text" placeholder="댓글을 작성하세요." />
      <ButtonContainer>
        <button>작성하기</button>
      </ButtonContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
  ${({ theme }) => theme.shadows.card};
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 2rem;

  textarea {
    width: 100%;
    height: 7rem;
    border: none;
    padding: 1.5rem 0.5rem;
    resize: none;
    ${({ theme }) => theme.fonts.medium};
    font-size: 1.6rem;
  }
  textarea:focus {
    outline: none;
  }
  textarea::placeholder {
    color: ${({ theme }) => theme.colors.lightgrey_2};
    ${({ theme }) => theme.fonts.bold};
  }
`;
const ProfileContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding-bottom: 1.5rem;

  font-size: 1.4rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  .profile-img {
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
    margin-right: 1rem;
    background: black;
  }
  .nickname {
    ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.black};
    margin-right: 0.5rem;
  }
  .id {
    ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.darkgrey_1};
    margin-right: 0.5rem;
  }
  .tier-img {
    background-color: black;
    width: 2rem;
    height: 2rem;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;

  button {
    border-radius: 3rem;
    height: 3rem;
    width: 8rem;
    ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.mainpurple};
    font-size: 1.4rem;
  }
  button:focus {
    outline: none;
  }
  button:hover {
    background-color: ${({ theme }) => theme.colors.darkpurple_2};
  }
`;
