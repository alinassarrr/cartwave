import { useUser } from "../../contexts/UserContext/index.jsx";
import { useCart } from "../../contexts/CartContext";
import InputField from "../InputField";
import { Link, NavLink } from "react-router-dom";
import { BsBellFill, BsCartFill, BsPersonCircle } from "react-icons/bs";
import "./styles.css";
import NavIcon from "../NavIcon/index.jsx";

const Navbar = () => {
  const { user } = useUser();
  const { getCartCount } = useCart();

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
        {user?.role === "admin" ? (
          <>
            <span>Bell icon</span>
            <span>{user?.name}</span>
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
                      count={getCartCount()}
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
