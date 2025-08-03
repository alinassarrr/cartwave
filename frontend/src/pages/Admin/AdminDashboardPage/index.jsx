import DashboardOverview from "../../../components/DashboardOverview";
import RecentOrders from "../../../components/RecentOrders";
import LowStockProducts from "../../../components/LowStockProducts";
import "./styles.css";

const AdminDashboardPage = () => {
  return (
    <div className="dashboard-page">
      <DashboardOverview />
      <div className="dashboard-bottom-section">
        <RecentOrders />
        <LowStockProducts />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
