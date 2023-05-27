import React, { useEffect, useState } from "react";
import { TIER } from "../../../core/tierImage";
import { styled } from "styled-components";
import { getProfileInfoData } from "../../../api/getProfileInfoData";
import { useMutation } from "react-query";

export default function ProfileInfo(props) {
  const { setShowEdit, userId } = props;
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollower, setShowFollower] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    data && console.log(data);
  }, [data]);

  useEffect(() => {
    targegtUserId({ userId: userId });
  }, [userId]);

  const { mutate: targegtUserId } = useMutation(getProfileInfoData, {
    onSuccess: (response) => {
      console.log(response);
      setData(response);
    },
    onError: () => {
      console.log("error");
    },
  });
  console.log(data);

  return (
    <ProfileInfoWrapper>
      <img id="profile-img" src={data?.profileImg} alt="프로필 사진" />
      <ProfileTextWrapper>
        <ProfileContextWrapper>
          <NameWrapper>
            <div id="name-container">
              <p className="nickname">{data?.nickname}</p>
              <p className="userId">@{data?.userId}</p>
              <img id="tier-img" src={TIER[data?.user?.userTier]} alt="티어" />
            </div>
            {/*자신의 프로필인 경우, '프로필 편집' 버튼 보여주기*/}
            {data?.status === 1 && <button onClick={() => setShowEdit(true)}>프로필 편집</button>}
            {/* {data?.status === 2 && <button onClick={() => setShowEdit(true)}>팔로우</button>} */}
            {/* {data?.status === 2 && <button onClick={() => setShowEdit(true)}>팔로잉</button>} */}
          </NameWrapper>
          <InformationWrapper>
            <p>{data?.introDetail}</p>
          </InformationWrapper>
        </ProfileContextWrapper>

        <ProfileFollowWrapper>
          {/*팔로잉 수(클릭시, Following로 이동), 팔로워 수(클릭시, Follower로 이동) 불러오기*/}
          <FollowWrapper
            onClick={() => {
              setShowFollowing(true);
            }}>
            <p>팔로잉</p>
            <p className="followCnt">{data?.followingCnt}</p>
          </FollowWrapper>

          <FollowWrapper
            onClick={() => {
              setShowFollower(true);
            }}>
            <p>팔로워</p>
            <p className="followCnt">{data?.followerCnt}</p>
          </FollowWrapper>
        </ProfileFollowWrapper>
      </ProfileTextWrapper>
    </ProfileInfoWrapper>
  );
}
const ProfileInfoWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.regular};
  display: flex;
  align-items: center;
  padding: 3rem;

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
    width: 10rem;
    height: 10rem;
    border-radius: 1rem;
    background-color: black;
  }

  #name-container {
    flex: auto;
    display: flex;
    align-items: center;
    margin: 0;
  }
  p {
    ${({ theme }) => theme.fonts.regular};
  }
  p.nickname {
    font-size: 2rem;
    margin-right: 0.5rem;
  }
  p.userId {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.darkgrey_2};
    margin-right: 0.5rem;
  }

  #tier-img {
    width: 2rem;
    height: 2rem;
  }
`;

const ProfileTextWrapper = styled.div`
  height: 10rem;
  padding: 0.5rem 0 0.5rem 1.5rem;
  flex: auto;
  width: 53.9rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProfileContextWrapper = styled.div`
  p {
    text-overflow: hidden;
  }
  margin-bottom: 0.5rem;
`;

const FollowWrapper = styled.div`
  font-size: 1.6rem;
  display: flex;
  p {
    margin-right: 1rem;
    color: ${({ theme }) => theme.colors.darkgrey_1};
  }
  p.followCnt {
    color: ${({ theme }) => theme.colors.black};
  }
`;

const NameWrapper = styled.section`
  display: flex;
  width: 100%;
  margin-bottom: 0.5rem;
  button {
    border: 1px solid ${({ theme }) => theme.colors.mainpurple};
    background-color: white;

    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.mainpurple};
    appearance: none; // 이 행은 브라우저 기본 스타일을 제거합니다.
    text-align: center;

    border-radius: 3rem;
    height: 3rem;
    width: 10rem;
    cursor: pointer;
  }
  button:active {
    outline: none;
  }
`;

const InformationWrapper = styled.div`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.darkgrey_2};
  overflow: hidden;
`;

const ProfileFollowWrapper = styled.section`
  display: flex;
`;
