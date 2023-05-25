import React from "react";
import { styled } from "styled-components";

export default function ArticleModal() {
  return (
    <ModalWrapper>
      <Edit>
        <p>수정하기</p>
      </Edit>
      <Delete>
        <p>삭제하기</p>
      </Delete>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  width: 7rem;
  height: 6rem;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.medium};
  font-size: 1.4rem;
  border-radius: 1rem;
  ${({ theme }) => theme.shadows.card};
`;
const Edit = styled.button`
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
`;
const Delete = styled.button``;
