import React from "react";
import "./styles.css";
import { BsCartFill } from "react-icons/bs";
const NavIcon = ({ Icon, count, active }) => {
  return (
    <div className="nav-icon">
      <Icon size={24} color={active ? "#00cccc" : "white"} />
      {count > 0 && <span className="icon-badge">{count}</span>}
    </div>
  );
};

export default NavIcon;
