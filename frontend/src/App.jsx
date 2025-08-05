import { Route, Routes } from "react-router-dom";
import "./Styles/App.css";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AdminLayout from "./Layouts/AdminLayout";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";
import OrdersManagementPage from "./pages/Admin/OrdersManagementPage";
import AdminProductsPage from "./pages/Admin/AdminProductsPage";
import CustomersPage from "./pages/Admin/CustomersPage";
import AnalyticsPage from "./pages/Admin/AnalyticsPage";
import AdminSettingsPage from "./pages/Admin/AdminSettingsPage";
import UserLayout from "./Layouts/UserLayout";
import AdminOrderDetailsPage from "./pages/Admin/AdminOrderDetailsPage";
import AdminCreateProduct from "./pages/Admin/AdminCreateProduct";
import Test from "./pages/Test";
import AdminEditProduct from "./components/AdminEditProduct";
import AdminCustomerPage from "./pages/Admin/AdminCustomerPage";
import AdminNotificationsPage from "./pages/Admin/AdminNotificationPage";
import UserProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ProductDetailsPage from "./pages/ProductDetialsPage";
import ProfilePage from "./pages/ProfilePage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import NotificationPage from "./pages/NotificationPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index path="dashboard" element={<AdminDashboardPage />} />
        <Route path="orders" element={<OrdersManagementPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="/admin/products/:id/edit" element={<AdminEditProduct />} />
        <Route path="/admin/products/create" element={<AdminCreateProduct />} />
        <Route path="/admin/customers" element={<AdminCustomerPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="notifications" element={<AdminNotificationsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route path="orders/:orderId" element={<AdminOrderDetailsPage />} />
      </Route>

      <Route element={<UserLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<UserProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/orders" element={<PlaceOrderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notification" element={<NotificationPage />} />
      </Route>
    </Routes>
  );
}

export default App;
