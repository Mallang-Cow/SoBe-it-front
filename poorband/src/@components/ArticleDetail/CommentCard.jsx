import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { styled } from "styled-components";
import { likeComment } from "../../../api/likeComment";
import { deleteComment } from "../../../api/deleteComment";
import { TIER } from "../../../core/tierImage";

export default function CommentCard(props) {
  const { comment, setReload } = props;
  const [nowTime] = useState(new Date());
  const [time, setTime] = useState(["", 0]);

  // 시간 구하기
  useEffect(() => {
    const replyDate = new Date(comment?.written_date);
    if (replyDate.getFullYear() != nowTime.getFullYear())
      setTime(["year", nowTime.getFullYear() - replyDate.getFullYear()]); // 연도차이
    if (replyDate.getMonth() != nowTime.getMonth())
      setTime(["month", nowTime.getMonth() - replyDate.getMonth()]); // 달 차이
    else if (replyDate.getDate() != nowTime.getDate())
      setTime(["date", nowTime.getDate() - replyDate.getDate()]); // 일 차이
    else if (replyDate.getHours() != nowTime.getHours())
      setTime(["hours", nowTime.getHours() - replyDate.getHours()]); // 시간 차이
    else if (replyDate.getMinutes() != nowTime.getMinutes())
      setTime(["minutes", nowTime.getMinutes() - replyDate.getMinutes()]); // 분 차이
    else setTime(["seconds", nowTime.getSeconds() - replyDate.getSeconds()]); // 초 차이
  }, []);

  // 좋아요
  function clickLike() {
    like({
      replySeq: Number(comment?.reply_seq),
    });
  }

  // 좋아요 정보 Post 전송
  const { mutate: like } = useMutation(likeComment, {
    onSuccess: (response) => {
      setReload(true);
    },
    onError: () => {
      console.log("error");
    },
  });

  // 댓글 삭제
  function delComment() {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteReply({ articleSeq: Number(comment?.reply_seq) });
    }
  }

  // 삭제 POST
  const { mutate: deleteReply } = useMutation(deleteComment, {
    onSuccess: (response) => {
      setReload(true);
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
          <LinkContainer>
            <img src={comment?.profile_image_url} alt="프사" className="profile-img" />
            <p className="nickname">{comment?.nickname}</p>
            <p className="id">@아이디</p>
          </LinkContainer>
          <img src={TIER[comment?.user_tier]} alt="티어" className="tier-img" />
          {time && (
            <TimeContainer>
              • {time[1]}
              {time[0] === "year" && "년"}
              {time[0] === "month" && "월"}
              {time[0] === "date" && "일"}
              {time[0] === "hours" && "시간"}
              {time[0] === "minutes" && "분"}
              {time[0] === "seconds" && "초"} 전
            </TimeContainer>
          )}
        </NameContainer>

        {comment?._reply_writer && (
          <CloseContainer className="close">
            <span
              className="material-symbols-rounded"
              onClick={() => {
                delComment();
              }}>
              close
            </span>
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
        {/* 
        <Comment>
          <span className="material-symbols-rounded">comment</span>
          <p>{comment?.reply_like_cnt}</p>
        </Comment> */}
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
  align-items: center;
`;
const LinkContainer = styled.div`
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

const TimeContainer = styled.p`
  font: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.darkgrey_1};
  margin-left: 1rem;
`;
