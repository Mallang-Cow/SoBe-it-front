import React, { useEffect, useState } from "react";
import { ARTICLE_DETAIL } from "../../../core/articleData";
import { TIER } from "../../../core/tierImage";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getProfileInfoData } from "../../../api/getProfileInfoData";
import { getProfileEditData } from "../../../api/getProfileEditData";


export default function ProfileEdit(props) {
  const {setShowEdit, userId, setUserId}=props;

  const[file, setFile] = useState(null);
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState();
  const [init, setInit] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // 변경될 프로필 정보
  const newProfileData = {
    profileEditDTO:{
      nickname:nickname,
      introduction:introduction,
      profileImageUrl: profileImageUrl
  }};

  console.log("newProfileData = " + newProfileData);

  const formData = new FormData();
  const json = JSON.stringify(newProfileData.profileEditDTO);
  const blob = new Blob([json], {type: 'application/json'});

  console.log("formData = " + formData);

  formData.append('file', file);
  formData.append('profileEditDTO', blob);

  // 프로필 정보 가져오기
  const {
    data: profileData,
    isLoading,
    isError,
    error,
  } = useQuery(["profileInfo", userId], () => getProfileInfoData({userId:userId}),{
    onSuccess: (response) => {
      console.log("아이디: " + response?.userId);

      //처음 로딩시 초기값 설정
      if(!init){
        setNickname(response?.nickname);
        setIntroduction(response?.introDetail);
        setProfileImageUrl(response?.profileImg);
        setInit(true);
      }
    },
    onError: () => {
      console.log("error");
    },
  });

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
  function submitNewProfileData(){
    if (nickname == ""){
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (introduction == ""){
      alert("자기소개를 작성해주세요.");
      return;
    }

    if (
      newProfileData.nickname && 
      newProfileData.introduction && 
      newProfileData.profileImageUrl
    ) {
      console.log("nickname : " + nickname);
      console.log("introduction : " + introduction);
      console.log("profileImageUrl : " + profileImageUrl);
      // API 호출
      editProfile(newProfileData); 
    }
  }

  const { mutate: editProfile } = useMutation(getProfileEditData, {
    onSuccess: (response) => {
      console.log(response)
      setIsSuccess(true);
    },
    onError: () => {
      console.log("edit error");
    },
  });

  // 수정 성공 -> 화면 전환
  useEffect(() => {
    if(isSuccess) {
      setUserId(userId);
      setShowEdit(false);
    }
  }, [isSuccess])

  return (
    <ProfileEditWrapper>
      {/*ID 불러오기 & 닉네임, 한줄소개 수정가능 & 프로필 사진은 보류*/}
      {profileImageUrl && (
        <ImageContainer>
          <img src={profileImageUrl} alt="프로필 사진" />
        </ImageContainer>
      )}
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

      <NicknameText
        type="text"
        value={nickname} 
        name="editNickname" 
        placeholder="닉네임" 
        onChange={nicknameChange}
      />

      <span className="bold">@{ARTICLE_DETAIL.user.userId}</span>

      <IntroductionText
        type="text" 
        value={introduction}
        name="editIntroduction" 
        placeholder="자기소개를 작성하세요." 
        onChange={introductionChange}
      />
      <ButtonWrapper>
        {/*저장하기 -> 변경된 정보 저장하고 ProfileInfo로 & 취소하기 -> 변경하지 않고 ProfileInfo로*/}
        <SubmitButton className="submit" onClick={submitNewProfileData}>저장하기</SubmitButton>
        <CancelButton className="cancel" onClick={() => setShowEdit(false)}>취소하기</CancelButton>
      </ButtonWrapper>
      

    </ProfileEditWrapper>
  );
}
const ProfileEditWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 3rem;
  * {
    margin: 0.5rem;
  }

  hr {
    margin: 0;
    background: ${({ theme }) => theme.colors.lightgrey_1};
    height: 0.1rem;
    border: 0;
  }
  hr.dot {
    margin: 0;
    background: ${({ theme }) => theme.colors.lightgrey_1};
    height: 0.1rem;
    border: 0;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;

  #profile-img {
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
  }

  #name-container {
    width: 100%;
    display: flex;
    align-items: center;
  }
  span.bold {
    font: ${({ theme }) => theme.fonts.bold};
  }
  span.grey {
    font: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.grey};
    width: fit-content;
    block-size: fit-content;
  }

  #tier-img {
    width: 2rem;
    height: 2rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  margin: 0.5rem;
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
  }
`;

const FileLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;

  & > span {
    font-size: 3rem;
  }
`;
const NicknameText = styled.input`
  width: 12rem;
  height: 3rem;
  padding: 0 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  border-radius: 0.4rem;
  text-align: left;
  font-size: 1.4rem;
`;

const IntroductionText = styled.textarea`
  width: 30%;
  height: 4rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  text-align: left;
  border-radius: 0.5rem;
  ${({ theme }) => theme.fonts.regular};
  resize: none;
`;

const ButtonWrapper = styled.section`
  display: flex;
`;

const SubmitButton = styled.button`
  margin-left: 1.5rem;
  border-radius: 3rem;
  height: 3rem;
  width: 8rem;
  ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.mainpurple};
  font-size: 1.4rem;
`;

const CancelButton = styled.button`
  margin-left: 1.5rem;
  border-radius: 3rem;
  height: 3rem;
  width: 8rem;
  ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.mainpurple};
  font-size: 1.4rem;
`;