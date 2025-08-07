import { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader";
import OverviewCard from "../OverviewCard";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { adminService } from "../../api/admin";
import "./styles.css";

const AdminProductOverview = () => {
  const navigate = useNavigate();
  const [overview, setOverview] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    categories: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductOverview = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching product overview...");

        const response = await adminService.getProductOverview();
        console.log("Product overview response:", response);

        const data = response.data || response;
        console.log("Product overview data:", data);

        setOverview({
          totalProducts: data.total_products || 0,
          lowStock: data.low_stock || 0,
          outOfStock: data.out_of_stock || 0,
          categories: data.categories || 0,
        });
      } catch (err) {
        console.error("Error fetching product overview:", err);
        setError(
          `Failed to load product overview: ${err.message || "Unknown error"}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProductOverview();
  }, []);

  return (
    <div className="admin-product-overview">
      <SectionHeader
        title="Product Management"
        subtitle="Manage your product catalog and inventory"
      />
      <Button
        text="+ Add Product"
        type="primary"
        onClick={() => navigate("/admin/products/create")}
      />

      <div className="overview-cards-grid">
        <OverviewCard title="Total Products" value={overview.totalProducts} />
        <OverviewCard title="Low Stock" value={overview.lowStock} />
        <OverviewCard title="Out of Stock" value={overview.outOfStock} />
        <OverviewCard title="Categories" value={overview.categories} />
      </div>
    </div>
  );
};

export default AdminProductOverview;
