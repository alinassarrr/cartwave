import { useUser } from "../../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./styles.css";

const UserLayout = () => {
  const { user } = useUser();

  if (!user || user.role !== "user") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="user-layout">
      <Navbar />
      <div className="user-content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
