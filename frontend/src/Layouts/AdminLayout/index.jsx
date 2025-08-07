// import { useUser } from "../../contexts/UserContext";
import { useSelector } from "react-redux";
import { selectUser, selectIsAuthenticated } from "../../store/auth/slice";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import Navbar from "../../components/Navbar";
import "./styles.css";

const AdminLayout = () => {
  // const { user } = useUser();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!user || !isAuthenticated || !user.admin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-body">
        <AdminSidebar />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
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
