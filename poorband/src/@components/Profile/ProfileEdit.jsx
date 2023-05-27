import React, { useState } from "react";
import { ARTICLE_DETAIL } from "../../../core/articleData";
import { TIER } from "../../../core/tierImage";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

export default function ProfileEdit(props) {
  const { setShowEdit } = props;

  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const [newProfileData, setNewProfileData] = useState({
    nickname: nickname,
    introduction: introduction,
  });

  /**
   * 닉네임변경
   * @param {*} event
   **/
  const nicknameChange = (event) => {
    setNickname((perv) => ({ ...perv, nickname: event.target.value }));
  };

  /**
   * 자기소개 변경
   * @param {*} event
   **/
  const introductionChange = (event) => {
    setIntroduction((perv) => ({ ...perv, introduction: event.target.value }));
  };

  /**
   * 프로필 사진 변경
   * @param {*} event
   **/
  const profileImageUrlChange = (event) => {
    setProfileImageUrl((perv) => ({ ...perv, profileImageUrl: event.target.value }));
  };

  /**
   * 프로필 수정 폼
   **/
  function submitNewProfileData() {
    if (newProfileData.nickname && newProfileData.introduction && newProfileData.profileImageUrl) {
      // API 호출
    }
    setShowEdit(false);
  }

  return (
    <ProfileEditWrapper>
      <img id="profile-img" src={ARTICLE_DETAIL.user.profileImageUrl} alt="프로필 사진" />
      <FormWrapper>
        <NameLineWrapper>
          <NameWrapper>
            <input type="text" id="editNickname" placeholder="닉네임" onChange={nicknameChange} />
            <p>@{ARTICLE_DETAIL.user.userId}</p>
          </NameWrapper>
          {/*저장하기 -> 변경된 정보 저장하고 ProfileInfo로 & 취소하기 -> 변경하지 않고 ProfileInfo로*/}
          <ButtonWrapper>
            <button class="cancel" onClick={() => setShowEdit(false)}>
              취소하기
            </button>
            <button class="save" onClick={submitNewProfileData}>
              저장하기
            </button>
          </ButtonWrapper>
        </NameLineWrapper>
        <TextWrapper id="editIntroduction" placeholder="자기소개" onChange={introductionChange} />
      </FormWrapper>
    </ProfileEditWrapper>
  );
}
const ProfileEditWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.darkpurple};
  padding: 3rem;
  display: flex;

  #profile-img {
    width: 10rem;
    height: 10rem;
    border-radius: 1rem;
    background-color: black;
  }
`;

const FormWrapper = styled.section`
  flex: auto;
  padding: 0.5rem 0 0.5rem 1.5rem;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.fonts.regular};

  textarea:focus,
  textarea:focus-visible {
    outline: none;
  }
`;
const NameLineWrapper = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;
const NameWrapper = styled.section`
  display: flex;
  align-items: center;
  flex: auto;
  input {
    border-radius: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.lightgrey_2};
    height: 3rem;
    flex: auto;
    background-color: ${({ theme }) => theme.colors.white};

    ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.black};
  }
  p {
    margin-left: 1rem;
    font-size: 1.6rem;
    ${({ theme }) => theme.colors.darkgrey_1};
    color: ${({ theme }) => theme.colors.darkgrey_1};
  }
`;
const ButtonWrapper = styled.section`
  display: flex;

  .save {
    margin-left: 1rem;
    border-radius: 3rem;
    height: 3rem;
    width: 8rem;
    ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.mainpurple};
    font-size: 1.4rem;
  }

  .cancel {
    margin-left: 1rem;
    border-radius: 3rem;
    height: 3rem;
    width: 8rem;
    ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.mainpurple};
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.mainpurple};
    font-size: 1.4rem;
  }
`;
const TextWrapper = styled.textarea`
  flex: auto;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.lightgrey_2};
  background-color: ${({ theme }) => theme.colors.white};
  resize: none;
  ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.black};
`;
