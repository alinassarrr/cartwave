import React from "react";
import "./styles.css";
import { BsCartFill } from "react-icons/bs";
const NavIcon = ({ Icon, count }) => {
  return (
    <div className="nav-icon">
      <Icon size={18} />
      {count > 0 && <span className="icon-badge">{count}</span>}
    </div>
  );
};

export default NavIcon;
