import { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader";
import OverviewCard from "../OverviewCard";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const AdminProductOverview = () => {
  const navigate = useNavigate();
  const [overview, setOverview] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    categories: 0,
  });

  useEffect(() => {
    // axios.get("/api/admin/product-overview")
    //   .then(res => setOverview(res.data))
    //   .catch(err => console.error("Failed to fetch product overview", err));
    setOverview({
      totalProducts: 150,
      lowStock: 9,
      outOfStock: 5,
      categories: 7,
    });
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
