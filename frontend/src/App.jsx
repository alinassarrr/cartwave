import { Route, Routes } from "react-router-dom";
import "./Styles/App.css";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AdminLayout from "./Layouts/AdminLayout";
import DashboardPage from "./pages/Admin/DashboardPage";
import OrdersPage from "./pages/Admin/OrdersPage";
import ProductsPage from "./pages/Admin/ProductsPage";
import CustomersPage from "./pages/Admin/CustomersPage";
import AnalyticsPage from "./pages/Admin/AnalyticsPage";
import SettingsPage from "./pages/Admin/SettingsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index path="dashboard" element={<DashboardPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* <Route element={<UserLayout />}> */}
      <Route path="/home" element={<HomePage />} />
      {/* </Route> */}
    </Routes>
  );
}

export default App;
