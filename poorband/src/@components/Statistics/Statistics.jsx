import React, { useState } from "react";
import ConsumptionCalendar from "./ConsumptionCalendar";
import ConsumptionList from "./ConsumptionList";
import ConsumptionGraph from "./ConsumptionGraph";
import { styled } from "styled-components";

export default function Statistics() {
  const [menu, setMenu] = useState("consumptionList");
  return (
    <Body>
      <HeaderWrapper>
        <Title>Statistics</Title>
        <MenuWrapper>
          {menu === "consumptionList" ? (
            <ActiveMenu>지출 내역</ActiveMenu>
          ) : (
            <Menu
              onClick={() => {
                setMenu("consumptionList");
              }}>
              지출 내역
            </Menu>
          )}
          {menu === "consumptionGraph" ? (
            <ActiveMenu>통계</ActiveMenu>
          ) : (
            <Menu
              onClick={() => {
                setMenu("consumptionGraph");
              }}>
              통계
            </Menu>
          )}
          {menu === "consumptionCalendar" ? (
            <ActiveMenu>달력</ActiveMenu>
          ) : (
            <Menu
              onClick={() => {
                setMenu("consumptionCalendar");
              }}>
              달력
            </Menu>
          )}
        </MenuWrapper>
      </HeaderWrapper>
      {menu === "consumptionList" && <ConsumptionList />}
      {menu === "consumptionGraph" && <ConsumptionGraph />}
      {menu === "consumptionCalendar" && <ConsumptionCalendar />}
    </Body>
  );
}
const Body = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`;
const HeaderWrapper = styled.header`
  background-color: white;

  ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 2.4rem;
`;
const Title = styled.p`
  padding: 4rem 3rem 0;
`;
const ActiveMenu = styled.div`
  width: 100%;
  text-align: center;
  padding: 1.5rem;
  ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.black};
  border-bottom: 3px solid ${({ theme }) => theme.colors.mainpurple};
`;
const Menu = styled.div`
  width: 100%;
  text-align: center;
  padding: 1.5rem;
  //${({ theme }) => theme.fonts.bold};
  font-family: "Spoqa Han Sans Neo";
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.lightgrey_2};
`;
const MenuWrapper = styled.menu`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 1.5rem;
  :hover {
    background-color: ${({ theme }) => theme.colors.lightpurple};
  }
`;
