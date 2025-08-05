import React, { useState } from "react";
// import { useCart } from "../../contexts/CartContext";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "../../store/cart/slice";
import OrderForm from "./OrderForm";
import OrderSummary from "./OrderSummary";
import EmptyCart from "./EmptyCart";
import "./styles.css";
import axios from "axios";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  // const { cart, getCartTotal, getCartCount, clearCart } = useCart();

  const createOrderAPI = async (orderData) => {
    // try {
    //   const response = await axios.post("/api/orders", orderData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       // 'Authorization': `Bearer ${token}`,
    //     },
    //   });
    //   return { ...response.data, fromAPI: true };
    // } catch (error) {
    //   throw new Error("failed to place order");
    // }
    return { orderId: orderData.orderId, fromAPI: false };
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Lebanon",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    // if (!formData.state.trim()) newErrors.state = "State is required";
    // if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    setErrors(newErrors);
    console.log("Validation errors:", newErrors); // Add this line
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Add this line
  };

  const handlePlaceOrder = async () => {
    console.log("Place Order button clicked!");
    if (!validateForm()) return;
    console.log("Form validation passed!");

    setIsSubmitting(true);

    try {
      // Create complete order object with all necessary data
      const orderData = {
        // Order metadata
        orderId: `ORD-${Date.now()}`,
        orderDate: new Date().toISOString(),
        status: "pending",

        // Customer information
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: {
            street: formData.streetAddress,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          },
        },

        // Order items
        items: cart.map((item) => ({
          id: item.id,
          productId: item.productId,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          color: item.color,
          size: item.size,
          totalPrice: item.price * item.quantity,
        })),

        // Order totals
        totals: {
          subtotal: cartTotal,
          shipping: 0, // Free shipping
          total: cartTotal,
          itemCount: cart.reduce((count, item) => count + item.quantity, 0),
        },

        // Payment information (for future use)
        payment: {
          method: "cash_on_delivery", // Default for now
          status: "pending",
        },

        // Shipping information
        shipping: {
          method: "standard",
          cost: 0,
          estimatedDelivery: "3-5 business days",
        },
      };

      let result;
      try {
        result = await createOrderAPI(orderData);
        console.log("order placed successfully", result);
      } catch (apiError) {
        console.warn("API failed, using localStorage fallback:", apiError);

        const existingOrders = JSON.parse(
          localStorage.getItem("orders") || "[]"
        );
        const updatedOrders = [...existingOrders, orderData];
        localStorage.setItem("orders", JSON.stringify(updatedOrders));

        result = { orderId: orderData.orderId, success: true };
      }

      // Get existing orders from localStorage
      // const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");

      // Add new order to the array
      // const updatedOrders = [...existingOrders, orderData];

      // Save back to localStorage
      // localStorage.setItem("orders", JSON.stringify(updatedOrders));

      // Clear the cart after successful order
      dispatch(clearCart());

      // Show success message
      const message = result.fromAPI
        ? `Order placed successfully via API! Order ID: ${
            result.orderId || orderData.orderId
          }`
        : `Order placed successfully (offline mode)! Order ID: ${
            result.orderId || orderData.orderId
          }`;
      alert(message);

      // Navigate to orders page or home
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container order-placement">
      <div className=" container order-header">
        <div className="back-cart" onClick={() => navigate("/cart")}>
          <BsArrowLeftCircle />
        </div>
        <h1>Place Your Order</h1>
      </div>
      <div className="order-content container">
        <OrderForm
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
        />
        <OrderSummary
          onPlaceOrder={handlePlaceOrder}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default PlaceOrderPage;
