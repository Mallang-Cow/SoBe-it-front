import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileEdit from "./ProfileEdit";
import ProfilePosts from "./ProfilePosts";
import ProfileChallenges from "./ProfileChallenges";
import { styled } from "styled-components";

export default function Profile(props) {
  const { setCenterContent, setArticleSeq, setUserId, userId, reloadFeed, setReloadFeed } = props;
  const [showEdit, setShowEdit]=useState(false)
  const [showElement, setShowElement] = useState(true); // true면 작성글, false면 도전과제

  return (
    <>
      <ProfileWrapper>
        <ProfileTitle>Profile</ProfileTitle>

        {/* 프로필 편집 시 편집 창으로 바뀌기 */}
        {!showEdit?<ProfileInfo showEdit={showEdit} setShowEdit={setShowEdit} setUserId={setUserId} userId={userId}/>:<ProfileEdit showEdit={showEdit} setShowEdit={setShowEdit} setUserId={setUserId} userId={userId}/>}

        {/* 메뉴 */}
        {/* 메뉴 선택함에따라 다른 내용 보이기 -> 길어진다면 컴포넌트 분리 */}
        <BtnProfileWrapper>
          <Button1 showElement={showElement} onClick={() => {setShowElement(true); }}>작성한 글</Button1>
          <Button2 showElement={showElement} onClick={() => {setShowElement(false); }}>도전 과제</Button2>
        </BtnProfileWrapper>

        {showElement?<ProfilePosts 
                            setCenterContent={setCenterContent}
                            setArticleSeq={setArticleSeq}
                            setUserId={setUserId} 
                            userId={userId}
                            reloadFeed={reloadFeed}
                            setReloadFeed={setReloadFeed} /> : <ProfileChallenges setUserId={setUserId} userId={userId}/>}
      </ProfileWrapper>
    </>
  );
}

const ProfileWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const ProfileTitle = styled.h2`
  width: 639px;
  height: 30px;

  margin-bottom: 1vh;
  margin-left: 1.875rem;
  margin-top: 3vh;

  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  color: #000000;
`;

const Button1=styled.button`
  
  ${({ theme }) => theme.fonts.bold};

  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.25rem;
  /* identical to box height */

  text-align: center;
  color: ${props => props.showElement ? '#000000' : '#C4C4C4'};
  padding-left: 17vh;
  padding-right: 17vh;
  display: flex;
  justify-content: center;
  
  height:1.25rem;
`;

const Button2=styled.button`
  
  ${({ theme }) => theme.fonts.bold};

  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.25rem;
  /* identical to box height */

  text-align: center;
  color: ${props => props.showElement ? '#C4C4C4' : '#000000'};
  padding-left: 17vh;
  padding-right: 17vh;
  display: flex;
  justify-content: center;
  
  height:1.25rem;
`;

const BtnProfileWrapper=styled.section`
  display: flex;
  justify-content: space-evenly;
  width:699px;
  margin-top: 2.3vh;
  margin-bottom: 4vh;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #E6E6E6;
`;
