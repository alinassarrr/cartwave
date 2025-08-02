import { useUser } from "../../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import Navbar from "../../components/Navbar";
import "./styles.css";

const AdminLayout = () => {
  const { user } = useUser();

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-layout">
      <Navbar />
      {user.role === "admin" ? (
        <div className="admin-body">
          <AdminSidebar />
          <div className="admin-content">
            <Outlet />
          </div>
        </div>
      ) : (
        <div classname="user-layout">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default AdminLayout;

// import { Outlet } from "react-router-dom";

// const AdminLayout = () => {
//   return (
//     <div>
//       <h2>Admin Layout Loaded</h2>
//       <Outlet />
//     </div>
//   );
// };

// export default AdminLayout;
