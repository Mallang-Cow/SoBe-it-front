import React from "react";
import { Link } from "react-router-dom";

import MenubarItem from "./MenubarItem";

function MenuBar() {
  const menus = [
    { name: "Home", path: "/" },
    { name: "Statistics", path: "/statistics" },
    { name: "Notifications", path: "/notifications" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="menubar">
      {menus.map((menu, index) => {
        return (
          <Link to={menu.path} key={index}>
            <MenubarItem menu={menu} />
          </Link>
        );
      })}
    </div>
  );
}

export default MenuBar;
