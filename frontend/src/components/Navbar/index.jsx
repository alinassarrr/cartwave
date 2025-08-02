import { useUser } from "../../contexts/UserContext/index.jsx";
import { useCart } from "../../contexts/CartContext";
import InputField from "../InputField";
import { Link } from "react-router-dom";
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
            <span>Bell icon</span>
            <span>{user?.name}</span>
          </>
        ) : (
          <>
            <InputField type="text" placeholder="Search Product..." />
            <ul className="nav-icons">
              <li>
                <Link to="/cart">
                  <NavIcon Icon={BsCartFill} count={getCartCount()} />
                </Link>
              </li>
              <li>
                <Link to="/notifications">
                  <NavIcon Icon={BsBellFill} count={0} />
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <BsPersonCircle size={18} />
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
