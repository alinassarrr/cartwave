import { useUser } from "../../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./styles.css";
import { CartProvider } from "../../contexts/CartContext";

const UserLayout = () => {
  const { user } = useUser();

  if (!user || user.role !== "user") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <CartProvider>
      <div className="user-layout">
        <Navbar />
        <div className="user-content">
          <Outlet />
        </div>
      </div>
    </CartProvider>
  );
};

export default UserLayout;
