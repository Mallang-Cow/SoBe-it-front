import React, { useEffect, useState } from "react";
import { TIER } from "../../../core/tierImage";
import { styled } from "styled-components";
import { getProfileInfoData } from "../../../api/getProfileInfoData";
import { useMutation } from "react-query";

export default function ProfileInfo(props) {
  const {setShowEdit, userId, setUserId}=props;
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollower, setShowFollower] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    data && console.log(data);
  }, [data]);

  useEffect(() => {
    targegtUserId({userId:userId});
  }, [userId]);

  console.log("useEffect")
  console.log(userId)

  const {mutate: targegtUserId} = useMutation (getProfileInfoData,{
    onSuccess: (response) => {
      console.log(response);
      setData(response);
    },
    onError: () => {
      console.log("error");
    },
  });

  return (
    <ProfileInfoWrapper>
      {/*프로필 이미지, 닉네임, 티어, ID, 한줄소개 불러오기*/}
      <img id="profile-img" src={data?.profileImg} alt="프로필 사진" />
        <ProfileHeaderWrapper>
          <div id="name-container">
            <span className="bold">{data?.nickname}</span>
            <img id="tier-img" src={TIER[data?.user?.userTier]} alt="티어" />
            <span className="bold">@{data?.userId}</span>
          </div>
          {/*자신의 프로필인 경우, '프로필 편집' 버튼 보여주기*/}
          {data?.status === 1 && (
            <button setUserId={setUserId} userId={userId} onClick={() => setShowEdit(true)}>프로필 편집</button>
          )}
        </ProfileHeaderWrapper>

        <span>{data?.introDetail}</span>

        <ProfileFollowWrapper>
          {/*팔로잉 수(클릭시, Following로 이동), 팔로워 수(클릭시, Follower로 이동) 불러오기*/}
          <div onClick={() => {setShowFollowing(true)}}>
            <span >팔로잉 </span>
            <span className="bold">{data?.followingCnt}</span>
          </div>

          <div onClick={() => {setShowFollower(true)}}>
            <span >팔로워 </span>
            <span className="bold">{data?.followerCnt}</span>
          </div>
        </ProfileFollowWrapper>     
    </ProfileInfoWrapper>
  );
}
const ProfileInfoWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
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