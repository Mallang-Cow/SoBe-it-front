import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { writeComment } from "../../../api/writeComment";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { nowUserState } from "../../recoil/nowUserInfo";
import { TIER } from "../../../core/tierImage";
import { profileImg } from "../../../core/defaultImg";

export default function CommentForm(props) {
  const { articleSeq, setReload } = props;
  const [data, setData] = useState();
  const [text, setText] = useState("");
  const [nowUser] = useRecoilState(nowUserState);
  const [clicked, setClicked] = useState(0);

  const textRef = useRef(null);

  // 글 작성
  function clickSubmit() {
    console.log(textRef.current.value);
    if (textRef.current.value === "") {
      alert("댓글을 작성해주세요.");
    } else {
      setData({ article_seq: articleSeq, reply_text: text, parent_reply_seq: 0, is_updated: 0 });
    }
  }

  useEffect(() => {
    data && writeReply(data);
  }, [data]);

  // 작성 POST
  const { mutate: writeReply } = useMutation(writeComment, {
    onSuccess: (response) => {
      console.log(response);
      setReload(true);
      setText("");
      setClicked(0);
    },
    onError: (response) => {
      console.log(response);
      console.log("error");
    },
  });

  function getText(e) {
    setText(e.target.value);
  }

  const onErrorImg = (e) => {
    e.target.src = profileImg;
  };

  return (
    <Wrapper>
      <ProfileContainer>
        <img src={nowUser?.profileImgUrl || profileImg} alt="프사" className="profile-img" onError={onErrorImg} />
        <p className="nickname">{nowUser?.nickname}</p>
        <p className="id">@{nowUser?.userId}</p>
        <img src={TIER[nowUser?.userTier]} alt="티어" className="tier-img" />
      </ProfileContainer>
      <textarea type="text" placeholder="댓글을 작성하세요." onChange={getText} value={text} ref={textRef} />
      <ButtonContainer>
        <button
          onClick={() => {
            clickSubmit();
          }}>
          작성하기
        </button>
      </ButtonContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
  ${({ theme }) => theme.shadows.card};
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 2rem;

  textarea {
    width: 100%;
    height: 7rem;
    border: none;
    padding: 1.5rem 0.5rem;
    resize: none;
    ${({ theme }) => theme.fonts.medium};
    font-size: 1.6rem;
  }
  textarea:focus {
    outline: none;
  }
  textarea::placeholder {
    color: ${({ theme }) => theme.colors.lightgrey_2};
    ${({ theme }) => theme.fonts.bold};
  }
`;
const ProfileContainer = styled.div`
  display: flex;
  justify-content: start;
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
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;

  button {
    border-radius: 3rem;
    height: 3rem;
    width: 8rem;
    ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.mainpurple};
    font-size: 1.4rem;
  }
  button:focus {
    outline: none;
  }
  button:hover {
    background-color: ${({ theme }) => theme.colors.darkpurple_2};
  }
`;
