import React from "react";
import { styled } from "styled-components";

export default function CommentCard(props) {
  const { comment } = props;
  console.log(comment);
  return (
    <Wrapper>
      <ProfileContainer>
        <NameContainer>
          <img src={comment?.profile_image_url} alt="프사" className="profile-img" />
          <p className="nickname">{comment?.nickname}</p>
          <p className="id">@아이디</p>
          <img src="" alt="티어" className="tier-img" />
        </NameContainer>
        <span className="material-symbols-outlined more">more_vert</span>
      </ProfileContainer>
      <TextContainer>
        <p>{comment?.reply_text}</p>
      </TextContainer>
      <FooterContainer>
        <Like>
          {comment?._clicked_like ? (
            <span className="material-symbols-rounded active">favorite</span>
          ) : (
            <span className="material-symbols-rounded">favorite</span>
          )}
          <p>{comment?.reply_like_cnt}</p>
        </Like>

        <Comment>
          <span className="material-symbols-rounded">comment</span>
          <p>
            {/* 댓글수 */}
            {comment?.reply_like_cnt}
          </p>
        </Comment>
      </FooterContainer>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  padding: 2rem;
  ${({ theme }) => theme.shadows.card};
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 1rem;
`;
const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TextContainer = styled.div`
  padding: 2rem 0;
  ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 1.6rem;
`;
const FooterContainer = styled.div`
  margin: 0.5rem 0 0 0;
  display: flex;
  p {
    font-size: 1.6rem;
    ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.darkgrey_1};
  }
  span.material-symbols-rounded {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.darkgrey_1};
  }
  span.active.material-symbols-rounded {
    color: ${({ theme }) => theme.colors.red};
  }
`;
const Like = styled.div`
  display: flex;
  margin: 0 2rem 0 0;
  align-items: center;
  p {
    font-size: 1.6rem;
    margin-left: 1rem;
  }
`;
const Comment = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 1.6rem;
    margin-left: 1rem;
  }
`;
