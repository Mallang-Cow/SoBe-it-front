import React, { useState } from "react";
import { ARTICLE_DETAIL } from "../../../core/articleData";
import { TIER } from "../../../core/tierImage";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";


export default function ProfileEdit(props) {
  const {setShowEdit}=props;

  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");

  const [newProfileData, setNewProfileData] = useState({
    "nickname":nickname,
    "introduction":introduction
  });

  /**
   * 닉네임변경 
   * @param {*} event 
   **/
  const nicknameChange = (event) => {
    setNickname((perv)=>({...perv, nickname:event.target.value}));
  }

  /**
   * 자기소개 변경
   * @param {*} event 
   **/
  const introductionChange = (event) => {
    setIntroduction((perv)=>({...perv, introduction:event.target.value}));
  }

  /**
   * 프로필 수정 폼 
   **/
  function submitNewProfileData(){
    if (newProfileData.nickname&&newProfileData.introduction) {
      // API 호출
      
      
    }
    setShowEdit(false);
  }

  return (
    <ProfileEditWrapper>
          {/*자신의 프로필인 경우에만 가능*/}
          {/*프로필 사진, ID 불러오기*/}
          {/*닉네임, 한줄소개 수정가능*/}
          <img id="profile-img" src={ARTICLE_DETAIL.user.profileImageUrl} alt="프로필 사진" />
          <div>
            <input type="text" id="editNickname" placeholder="닉네임" onChange={nicknameChange}/>
            <span className="bold">@{ARTICLE_DETAIL.user.userId}</span>
            <input type="text" id="editIntroduction" placeholder="자기소개" onChange={introductionChange}/>
          </div>
          {/*저장하기 -> 변경된 정보 저장하고 ProfileInfo로 & 취소하기 -> 변경하지 않고 ProfileInfo로*/}
          <div>
            <button onClick={submitNewProfileData}>저장하기</button>
            <button onClick={() => setShowEdit(false)}>취소하기</button>
          </div>
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