import { Link } from "react-router-dom";
// import {
//   FiBox,
//   FiBarChart2,
//   FiPackage,
//   FiUsers,
//   FiSettings,
// } from "react-icons/fi";
import "./styles.css";
// import { AiOutlineSetting } from "react-icons/ai";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to="/admin/dashboard">
            {/* <AiOutlineSetting size={18} /> */}
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/orders">
            {/* <FiPackage size={18} /> */}
            <span>Orders</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/products">
            {/* <FiBox size={18} /> */}
            <span>Products</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/customers">
            {/* <FiUsers size={18} /> */}
            <span>Customers</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/analytics">
            {/* <FiBarChart2 size={18} /> */}
            <span>Analytics</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/settings">
            {/* <FiSettings size={18} /> */}
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
