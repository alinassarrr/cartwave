import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SectionHeader from "../SectionHeader";
import AdminOrderItemsList from "../AdminOrderItemsList";
import CustomerInfoBox from "../CustomerInfoBox";
import ShippingAddressBox from "../ShippingAddressBox";
import OrderTotalBox from "../OrderTotalBox";
import "./styles.css";

const AdminOrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // axios.get(`/api/admin/orders/${orderId}`)
    //   .then(res => {
    //     setOrder(res.data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     console.error("Failed to fetch order details", err);
    //     setLoading(false);
    //   });

    const timeout = setTimeout(() => {
      setOrder({
        id: orderId,
        date: "Jan 26, 2025",
        time: "10:30 AM",
        items: [
          {
            name: "Wireless Bluetooth Headphones",
            sku: "WH-001",
            quantity: 1,
            price: 199.99,
            image: "",
          },
          {
            name: "USB",
            sku: "WH-001",
            quantity: 1,
            price: 29.99,
            image: "",
          },
        ],
        customer: {
          name: "Salem Beyrouti",
          email: "salem.beyrouti11@hotmail.com",
          phone: "+961 71929497",
          totalOrders: 12,
        },
        address: {
          line1: "123 Main Street",
          line2: "Apartment #8",
          city: "Koura",
          postal: "12223",
          country: "Lebanon",
        },
        subtotal: 239.97,
        shipping: 9.99,
        tax: 19.2,
      });
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [orderId]);

  if (loading || !order) return <div>Loading order...</div>;

  return (
    <div className="order-details">
      <SectionHeader
        title={`Order #${order.id}`}
        subtitle={`Placed on ${order.date} at ${order.time}`}
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
          />
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
