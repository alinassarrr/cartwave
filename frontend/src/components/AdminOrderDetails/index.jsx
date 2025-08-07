import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SectionHeader from "../SectionHeader";
import AdminOrderItemsList from "../AdminOrderItemsList";
import CustomerInfoBox from "../CustomerInfoBox";
import ShippingAddressBox from "../ShippingAddressBox";
import { adminService } from "../../api/admin";
import OrderTotalBox from "../OrderTotalBox";
import "./styles.css";

const AdminOrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching order details for ID:", orderId);
        console.log("Order ID type:", typeof orderId);

        const response = await adminService.getOrderById(orderId);
        console.log("Order details response:", response);

        const data = response.data || response;
        console.log("Order details data:", data);
        console.log("Data structure:", JSON.stringify(data, null, 2));

        const transformedOrder = {
          id: data.id || orderId,
          orderNumber: data.order_number || `#${data.id}`,
          date: new Date(data.created_at).toLocaleDateString(),
          time: new Date(data.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: data.status,
          items:
            data.items?.map((item) => {
              console.log("Product data:", item.product);
              console.log("Image URL:", item.product?.image_url);

              // Handle different image URL formats
              let imageUrl = "";
              if (item.product?.image_url) {
                // If it's already a full URL, use it
                if (item.product.image_url.startsWith("http")) {
                  imageUrl = item.product.image_url;
                } else {
                  // If it's a relative path, construct the full URL
                  imageUrl = `http://localhost:8080/storage/${item.product.image_url}`;
                }
              }

              return {
                name: item.product?.name || "Unknown Product",
                sku: item.product?.sku || "N/A",
                quantity: item.quantity,
                price: item.price,
                image: imageUrl,
              };
            }) || [],
          customer: {
            name:
              `${data.user?.first_name || ""} ${
                data.user?.last_name || ""
              }`.trim() || "Unknown Customer",
            email: data.user?.email || "No email",
            phone: "No phone", // Phone field doesn't exist in users table
            totalOrders: data.user?.orders_count || 0,
          },
          address: {
            line1: "No address provided",
            line2: "",
            city: "",
            postal: "",
            country: "",
          },

          subtotal: data.total || 0,
          shipping: data.shipping_price || 0,
          tax: 0, // We don't have tax field in our schema
          total: data.total || 0,
        };

        setOrder(transformedOrder);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError(
          `Failed to load order details: ${err.message || "Unknown error"}`
        );
      } finally {
        setLoading(false);
      }
    };
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) return <div className="loading">Loading order details...</div>;

  if (error) return <div className="error">{error}</div>;

  if (!order) return <div className="error">Order not found</div>;

  return (
    <div className="order-details">
      <SectionHeader
        title={`Order ${order.orderNumber || `#${order.id}`}`}
        subtitle={`Placed on ${order.date} at ${order.time} • Status: ${order.status}`}
      />
      <div className="order-details-content">
        <div className="order-details-left">
          <AdminOrderItemsList items={order.items} />
        </div>
        <div className="order-details-right">
          <CustomerInfoBox customer={order.customer} />
          <ShippingAddressBox address={order.address} />
          <OrderTotalBox
            subtotal={order.subtotal}
            shipping={order.shipping}
            tax={order.tax}
            total={order.total}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
