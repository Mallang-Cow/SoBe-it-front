import React, { useEffect, useState } from "react";
import { ARTICLE_DETAIL } from "../../../core/articleData";
import { TIER } from "../../../core/tierImage";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getProfileInfoData } from "../../../api/getProfileInfoData";
import { getProfileEditData } from "../../../api/getProfileEditData";

export default function ProfileEdit(props) {
  const { setShowEdit, userId, setUserId } = props;

  const [file, setFile] = useState(null);
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [init, setInit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 프로필 정보 가져오기
  const { mutate: userData } = useMutation(getProfileInfoData, {
    onSuccess: (response) => {
      //처음 로딩시 초기값 설정
      if (!init) {
        setNickname(response?.nickname);
        setIntroduction(response?.introDetail);
        setProfileImageUrl(response?.profileImg);
        setInit(true);
      }
    },
    onError: (error) => {
      console.log("error");
    },
  });

  useEffect(() => {
    userId && userData({ userId: userId });
  }, []);

  /**
   * 닉네임변경
   * @param {*} event
   **/
  const nicknameChange = (event) => {
    setNickname(event.target.value);
  };

  /**
   * 자기소개 변경
   * @param {*} event
   **/
  const introductionChange = (event) => {
    setIntroduction(event.target.value);
  };

  /**
   * 프로필 사진 변경
   * @param {*} event
   **/
  const profileImageUrlChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    console.log(file);
    // 이제 file을 서버로 전송하거나 필요한 작업을 수행할 수 있습니다.
  };

  /**
   * 프로필 수정 폼
   **/
  function submitNewProfileData() {
    if (nickname == "") {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (introduction == "") {
      alert("자기소개를 작성해주세요.");
      return;
    }

    // 변경될 프로필 정보
    const newProfileData = {
      profile: { userId: userId, nickname: nickname, introduction: introduction, profileImgUrl: profileImageUrl },
    };

    const formData = new FormData();
    const json = JSON.stringify(newProfileData.profile);
    const blob = new Blob([json], { type: "application/json" });

    formData.append("file", file);
    formData.append("profile", blob);

    // API 호출
    editProfile(formData);
  }

  const { mutate: editProfile } = useMutation(getProfileEditData, {
    onSuccess: (response) => {
      console.log(response);
      setIsSuccess(true);
    },
    onError: () => {
      console.log("edit error");
    },
  });

  // 수정 성공 -> 화면 전환
  useEffect(() => {
    if (isSuccess) {
      setUserId(userId);
      setShowEdit(false);
    }
  }, [isSuccess]);

  return (
    <ProfileEditWrapper>
      {/*ID 불러오기 & 닉네임, 한줄소개 수정가능 & 프로필 사진은 보류*/}
      {profileImageUrl && <img id="profile-img" src={profileImageUrl} alt="프로필 사진" />}
      {/*<FileLabel htmlFor="file">
        <span className="material-symbols-outlined">image</span>
      </FileLabel>*/}
      <input
        className="imgInput"
        type="file"
        name="file"
        id="file"
        accept="image/*"
        onChange={profileImageUrlChange}
        //style={{ display: "none" }}
      />

      <FormWrapper>
        <NameLineWrapper>
          <NameWrapper>
            <input type="text" value={nickname} name="editNickname" placeholder="닉네임" onChange={nicknameChange} />
            <p>@{userId}</p>
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
        <TextWrapper
          value={introduction}
          name="editIntroduction"
          placeholder="자기소개"
          onChange={introductionChange}
        />
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
    padding: 0 0.5rem;
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
  padding: 0.5rem;
`;
