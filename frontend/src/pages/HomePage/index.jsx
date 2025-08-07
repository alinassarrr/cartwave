import React from "react";
import { useNavigate } from "react-router-dom";
import { BsTruck, BsGraphUp, BsHeart } from "react-icons/bs";
import "./styles.css";

const HomePage = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      description: "Latest gadgets and tech",
    },
    {
      id: 2,
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      description: "Trendy clothing & accessories",
    },
    {
      id: 3,
      name: "Home & Garden",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      description: "Everything for your home",
    },
    {
      id: 4,
      name: "Sports",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      description: "Sports equipment & gear",
    },
  ];

  const features = [
    {
      icon: <BsTruck />,
      title: "Free Shipping",
      description: "Free shipping all over Lebanon",
    },
    {
      icon: <BsGraphUp />,
      title: "Real-time Data",
      description: "Live inventory and order tracking",
    },
    {
      icon: <BsHeart />,
      title: "User Experience",
      description: "Smooth and intuitive shopping",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Customer",
      text: "Amazing platform! Fast delivery and great customer service.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Customer",
      text: "Best e-commerce experience I've had. Highly recommended!",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Blogger",
      text: "Love the variety and quality of products available here.",
      rating: 5,
    },
  ];

  const handleCategoryClick = () => {
    navigate("/products");
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Ride the Wave of Smarter Shopping</h1>
              <p>
                From browsing to delivery, CartWave moves faster. With live
                order tracking, smart stock updates, and admin insights.
              </p>
              <button
                className="cta-button"
                onClick={() => navigate("/products")}
              >
                Shop Now
              </button>
            </div>
            <div className="hero-image">
              <img src="public/img/itemcard/2.jpeg" alt="Shopping" />
            </div>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-card"
                onClick={handleCategoryClick}
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                </div>
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose CartWave?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2>What Our Community Says</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <p>"{testimonial.text}"</p>
                </div>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>CartWave</h3>
              <p>
                Your trusted online shopping destination for quality products
                and exceptional service.
              </p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="/products">Products</a>
                </li>
                <li>
                  <a href="/cart">Cart</a>
                </li>
                <li>
                  <a href="/profile">Profile</a>
                </li>
                <li>
                  <a href="/notification">Notifications</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <ul>
                <li>Email: support@cartwave.com</li>
                <li>Phone: 03 123 345</li>
                <li>Address: BDD Beirut</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 CartWave. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
