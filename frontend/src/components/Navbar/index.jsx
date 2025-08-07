// import { useUser } from "../../contexts/UserContext/index.jsx";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser, selectIsAuthenticated } from "../../store/auth/slice.js";
// import { useCart } from "../../contexts/CartContext";
import { selectCartCount } from "../../store/cart/slice.js";
import InputField from "../InputField";
import { FaBell } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { BsBellFill, BsCartFill, BsPersonCircle } from "react-icons/bs";
import { adminService } from "../../api/admin";
import "./styles.css";
import NavIcon from "../NavIcon/index.jsx";

const Navbar = () => {
  // const { user } = useUser();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cartCount = useSelector(selectCartCount);
  const [notificationCount, setNotificationCount] = useState(0);
  // const { getCartCount } = useCart();

  useEffect(() => {
    if (user?.admin) {
      fetchNotificationCount();
    }
  }, [user]);

  const fetchNotificationCount = async () => {
    try {
      const response = await adminService.getNotifications();
      const unreadCount = (response.data || []).filter(
        (n) => !n.is_read
      ).length;
      setNotificationCount(unreadCount);
    } catch (error) {
      console.error("Error fetching notification count:", error);
    }
  };

  return (
    <nav className="navbar container">
      <div className="logo">CartWave</div>

      <ul className="nav-links">
        {user?.admin ? (
          <>
            <li>
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link to="/admin/products">Products</Link>
            </li>
            <li>
              <Link to="/admin/analytics">Analytics</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Wave Deals
              </NavLink>
            </li>
          </>
        )}
      </ul>

      <div className="nav-right">
        {user?.admin ? (
          <>
            <Link to="/admin/notifications" className="nav-icon">
              <FaBell />
              {notificationCount > 0 && (
                <span className="notification-badge">{notificationCount}</span>
              )}
            </Link>
            <Link to="/admin/settings" className="nav-user">
              <img
                src={user.profilePic || "/default-profile.png"}
                alt="profile"
                className="nav-profile-pic"
              />
              <span>{user?.name}</span>
            </Link>
          </>
        ) : (
          <>
            <InputField type="text" placeholder="Search Product..." />
            <ul className="nav-icons">
              <li>
                <NavLink to="/cart">
                  {({ isActive }) => (
                    <NavIcon
                      Icon={BsCartFill}
                      count={cartCount}
                      active={isActive}
                    />
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/notification">
                  {({ isActive }) => (
                    <NavIcon Icon={BsBellFill} active={isActive} />
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile">
                  {({ isActive }) => (
                    <NavIcon Icon={BsPersonCircle} active={isActive} />
                  )}
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
