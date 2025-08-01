import { useUser } from "../../contexts/UserContext/index.jsx";
import InputField from "../InputField";
import { Link } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
    const { user } = useUser();

    return (
        <nav className="navbar">
            <div className="logo">CartWave</div>

            <ul className="nav-links">
                {user?.role === 'admin' ? (
                    <>
                    <li><Link to="/admin/dashboard">Dashboard</Link></li>
                    <li><Link to="/admin/orders">Orders</Link></li>
                    <li><Link to="/admin/products">Products</Link></li>
                    <li><Link to="/admin/analytics">Analytics</Link></li>
                    </>
                ) : (
                    <>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/categories">Category</Link></li>
                    </>
                )}
            </ul>

            <div className="nav-right">
                {user?.role === 'admin' ? (
                    <>
                    <span>Bell icon</span>
                    <span>{user?.name}</span>
                    </>
                ) : (
                    <>
                    <InputField type="text" placeholder="Search Product..."/>
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