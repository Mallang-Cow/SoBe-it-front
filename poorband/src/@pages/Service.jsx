import { styled } from "styled-components";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../@components/Home/Home";
import MenuBar from "../@components/MenuBar";
import SideBar from "../@components/SideBar/SideBar";
import Statistics from "../@components/Statistics/Statistics";
import Profile from "../@components/Profile/Profile";
import Notifications from "../@components/Notifications/Notifications";
import SearchResults from "../@components/Search/SearchResults";

export default function Service() {
  return (
    <>
      <ServiceWrapper>
        <MenuBarWrapper>
          <BrowserRouter>
            <MenuBar></MenuBar>
            <Routes>
              <Route path="/" exact component={Home} />
              <Route path="/statistics" component={Statistics} />
              <Route path="/notifications" component={Notifications} />
            </Routes>
          </BrowserRouter>
        </MenuBarWrapper>

        {/* menu 값에 따라 가운데 내용 바뀌기 */}

        <CenterWrapper>
          <Home />
          <Statistics />
          <Notifications />
          <Profile />
          <SearchResults />
        </CenterWrapper>

        <SideBarWrapper>
          <SideBar />
        </SideBarWrapper>
      </ServiceWrapper>
    </>
  );
}

const ServiceWrapper = styled.div`
  background-color: skyblue;
  display: flex;
  justify-content: center;
`;

const MenuBarWrapper = styled.nav`
  background-color: blue;
  width: 20.6rem;
  height: 100vh;
  position: sticky;
  top: 0;
`;

const CenterWrapper = styled.section`
  width: 69.9rem;
  background-color: pink;
`;

const SideBarWrapper = styled.aside`
  background-color: purple;
  width: 28.2rem;
  height: 100vh;
  position: sticky;
  top: 0;
`;
