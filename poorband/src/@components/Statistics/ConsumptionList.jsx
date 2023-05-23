import React, { useState } from "react";
import { styled } from "styled-components";

export default function ConsumptionList() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  function increaseMonth() {
    if (month < 11) {
      setMonth(month + 1);
    } else {
      setMonth(0);
      setYear(year + 1);
    }
  }
  function decreaseMonth() {
    if (month > 0) {
      setMonth(month - 1);
    } else {
      setMonth(11);
      setYear(year - 1);
    }
  }
  return (
    <>
      <Year>
        <p>{year}년</p>
      </Year>
      <HeaderWrapper>
        <Month>
          <span
            className="material-symbols-outlined"
            onClick={() => {
              decreaseMonth();
            }}>
            arrow_back_ios
          </span>
          <p>{month + 1}월</p>
          <span
            className="material-symbols-outlined"
            onClick={() => {
              increaseMonth();
            }}>
            arrow_forward_ios
          </span>
        </Month>
        <Amount>
          <p className="small">이번 달 지출 금액 </p>
          <p className="big">10,000원</p>
        </Amount>
      </HeaderWrapper>
      <Body>
        {/* 여기부터 반복 */}
        <Contents>
          <Head>
            <p className="date">23-05-11</p>
            <p className="price">23,000원</p>
          </Head>
          <Content>
            <Wrap>
              <Category>식비</Category>
              <Context>마라탕</Context>
            </Wrap>
            <Price>10,000원</Price>
          </Content>
          <Content>
            <Wrap>
              <Category>패션/미용</Category>
              <Context>아이라이너</Context>
            </Wrap>
            <Price>13,000원</Price>
          </Content>
        </Contents>
        {/* 여기까지 반복 */}
        <Contents>
          <Head>
            <p className="date">23-05-11</p>
            <p className="price">23,000원</p>
          </Head>
          <Content>
            <Wrap>
              <Category>식비</Category>
              <Context>마라탕</Context>
            </Wrap>
            <Price>10,000원</Price>
          </Content>
          <Content>
            <Wrap>
              <Category>패션/미용</Category>
              <Context>아이라이너</Context>
            </Wrap>
            <Price>13,000원</Price>
          </Content>
          <Content>
            <Wrap>
              <Category>패션/미용</Category>
              <Context>아이라이너</Context>
            </Wrap>
            <Price>13,000원</Price>
          </Content>
        </Contents>
      </Body>
    </>
  );
}

const HeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 3rem;
`;
const Year = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  p {
    color: ${({ theme }) => theme.colors.black};
    ${({ theme }) => theme.fonts.medium};
    font-size: 1.8rem;
    margin: 1.5rem 0;
  }
`;

const Month = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1.5rem;
  ${({ theme }) => theme.fonts.medium};
  span {
    color: ${({ theme }) => theme.colors.darkgrey_1};
  }
  font-size: 1.8rem;
  span:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;

const Amount = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 1rem;
  ${({ theme }) => theme.fonts.medium};
  p {
    margin: 0.3rem;
    color: ${({ theme }) => theme.colors.black};
  }
  .big {
    font-size: 2.3rem;
  }
  .small {
    font-size: 1.8rem;
  }
`;

const Body = styled.div`
  padding: 1rem 3rem;
`;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  padding: 1rem 0;
  margin-top: 2rem;
  p.date {
    ${({ theme }) => theme.fonts.medium};
  }
  p.price {
    ${({ theme }) => theme.fonts.bold};
  }
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkgrey_1};
`;
const Contents = styled.div``;
const Content = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_2};
`;
const Category = styled.div`
  ${({ theme }) => theme.fonts.medium};
  font-size: 1.6rem;
  width: 8rem;
  margin-right: 2rem;
`;
const Context = styled.div`
  ${({ theme }) => theme.fonts.regular};
  font-size: 1.6rem;
`;
const Price = styled.div`
  ${({ theme }) => theme.fonts.medium};
  font-size: 1.6rem;
`;
const Wrap = styled.div`
  display: flex;
`;
