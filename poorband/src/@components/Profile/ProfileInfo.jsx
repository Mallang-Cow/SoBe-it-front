import React, { useState } from "react";
import { ARTICLE_DETAIL } from "../../../core/articleData";
import { TIER } from "../../../core/tierImage";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

export default function ProfileInfo(props) {
  const {setShowEdit}=props;

  const navigate = useNavigate();

  function moveToFollowerPage(){
    navigate("/follower");
  }

  function moveToFollowingPage(){
    navigate("/following");
  }

  // 특정 사용자 ID
  const specificUserId = ARTICLE_DETAIL.user.userId;

  return (
    <ProfileInfoWrapper>
      {/*프로필 이미지, 닉네임, 티어, ID, 한줄소개 불러오기*/}
      <img id="profile-img" src={ARTICLE_DETAIL.user.profileImageUrl} alt="프로필 사진" />
        <ProfileHeaderWrapper>
          <div id="name-container">
            <span className="bold">{ARTICLE_DETAIL.user.nickname}</span>
            <img id="tier-img" src={TIER[ARTICLE_DETAIL.user.userTier]} alt="티어" />
            <span className="bold">@{ARTICLE_DETAIL.user.userId}</span>
          </div>
          {/*자신의 프로필인 경우, '프로필 편집' 버튼 보여주기*/}
          {ARTICLE_DETAIL.user.userId === specificUserId && (
            <button onClick={() => setShowEdit(true)}>프로필 편집</button>
          )}
        </ProfileHeaderWrapper>

        <span>{ARTICLE_DETAIL.user.introduction}</span>

        <ProfileFollowWrapper>
           {/*팔로잉 수(클릭시, Following로 이동), 팔로워 수(클릭시, Follower로 이동) 불러오기*/}
           <div onClick={moveToFollowingPage}>
            <span >팔로잉 </span>
            <span className="bold">1000</span>
          </div>

          <div onClick={moveToFollowerPage}>
            <span >팔로워 </span>
            <span className="bold">1000</span>
          </div>
        </ProfileFollowWrapper>     
    </ProfileInfoWrapper>
  );
}
const ProfileInfoWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;
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

const ProfileHeaderWrapper = styled.section`
  display: flex;
`;

const ProfileFollowWrapper = styled.section`
  display: flex;
`;