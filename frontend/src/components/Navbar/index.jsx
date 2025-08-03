import { useUser } from "../../contexts/UserContext/index.jsx";
import InputField from "../InputField";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import "./styles.css";

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="navbar container">
      <div className="logo">CartWave</div>

      <ul className="nav-links">
        {user?.role === "admin" ? (
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
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/categories">Category</Link>
            </li>
          </>
        )}
      </ul>

      <div className="nav-right">
        {user?.role === "admin" ? (
          <>
            <Link to="/admin/notifications" className="nav-icon">
              <FaBell />
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
            <span>Cart</span>
            <span>Notification</span>
            <span>Profile</span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
