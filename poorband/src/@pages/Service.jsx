import React from "react";
import Home from "../@components/Home";
import MenuBar from "../@components/MenuBar";
import SideBar from "../@components/SideBar";
import Statistics from "../@components/Statistics";
import Profile from "../@components/Profile";
import Notifications from "../@components/Notifications";
import SearchResults from "../@components/SearchResults";

export default function Service() {
  return (
    <>
      <div>Service</div>
      <MenuBar />
      {/* menu 값에 따라 가운데 내용 바뀌기 */}
      <Home />
      <Statistics />
      <Notifications />
      <Profile />
      <SearchResults />
      {/* 가운데 끝 */}
      <SideBar />
    </>
  );
}
