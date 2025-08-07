import RevenueOverviewGraph from "../../../components/RevenueOverviewGraph";
import OrdersPerHourGraph from "../../../components/OrdersPerHourGraph";
import AnalyticsPageOverview from "../../../components/AnalyticsPageOverview";
import "./styles.css";

const AnalyticsPage = () => {
  return (
    <div className="analytics-page">
      <AnalyticsPageOverview />
      <div className="graph-section">
        <RevenueOverviewGraph />
        <OrdersPerHourGraph />
      </div>
    </div>
  );
};

export default AnalyticsPage;
