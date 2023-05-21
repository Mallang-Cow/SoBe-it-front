import React from "react";

function MenubarItem({ menu }) {
  return (
    <div className="menubar-item">
      <p>{menu.name}</p>
    </div>
  );
}

export default MenubarItem;
