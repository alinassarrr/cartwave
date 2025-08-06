// import { useUser } from "../../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./styles.css";
import { CartProvider } from "../../contexts/CartContext";
import { useSelector } from "react-redux";
import { selectUser, selectIsAuthenticated } from "../../store/auth/slice";

const UserLayout = () => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // const { user } = useUser();

  if (!user || !isAuthenticated) {
    return <Navigate to="/" replace />;
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
