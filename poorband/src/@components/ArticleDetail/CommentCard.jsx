import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { styled } from "styled-components";
import { likeComment } from "../../../api/likeComment";
import { deleteComment } from "../../../api/deleteComment";

export default function CommentCard(props) {
  const { comment, setReload } = props;
  //console.log(comment);

  // 좋아요
  function clickLike() {
    like({
      reply_seq: Number(comment?.reply_seq),
    });
  }

  // 좋아요 정보 Post 전송
  const { mutate: like } = useMutation(likeComment, {
    onSuccess: (response) => {
      console.log(response);
    },
    onError: () => {
      console.log("error");
    },
  });

  // 댓글 삭제
  function delComment() {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteReply({ comment: thisArticleSeq });
    }
  }

  // 삭제 POST
  const { mutate: deleteReply } = useMutation(deleteComment, {
    onSuccess: (response) => {
      console.log(response);
      //queryClient.invalidateQueries("");
    },
    onError: (response) => {
      console.log(response);
      console.log("error");
    },
  });
  return (
    <Wrapper>
      <ProfileContainer>
        <NameContainer>
          <img src={comment?.profile_image_url} alt="프사" className="profile-img" />
          <p className="nickname">{comment?.nickname}</p>
          <p className="id">@아이디</p>
          <img src="" alt="티어" className="tier-img" />
        </NameContainer>

        {comment?._reply_writer && (
          <CloseContainer className="close">
            <span className="material-symbols-rounded">close</span>{" "}
          </CloseContainer>
        )}
      </ProfileContainer>
      <TextContainer>
        <p>{comment?.reply_text}</p>
      </TextContainer>
      <FooterContainer>
        <Like>
          {comment?._clicked_like ? (
            <span
              className="material-symbols-rounded active"
              onClick={() => {
                clickLike();
              }}>
              favorite
            </span>
          ) : (
            <span
              className="material-symbols-rounded"
              onClick={() => {
                clickLike();
              }}>
              favorite
            </span>
          )}
          <p>{comment?.reply_like_cnt}</p>
        </Like>

        <Comment>
          <span className="material-symbols-rounded">comment</span>
          <p>{comment?.reply_like_cnt}</p>
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
  .close {
    border-radius: 3rem;
    height: 3rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .close:hover {
    background-color: ${({ theme }) => theme.colors.lightgrey_1};
  }
`;

const CloseContainer = styled.div`
  span {
    text-align: center;
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
    font-size: 1.4rem;
    margin-left: 1rem;
  }
  span.material-symbols-rounded:hover {
    color: ${({ theme }) => theme.colors.red};
  }
  span.active.material-symbols-rounded {
    color: ${({ theme }) => theme.colors.red};
  }
`;
const Comment = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 1.4rem;
    margin-left: 1rem;
  }
`;
