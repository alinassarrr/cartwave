import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { BsArrowLeftCircle } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

import "./styles.css";
import Counter from "../../components/CartItemCard/Counter";
const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 1,
    title: "Premium Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and premium sound quality.",
    longDescription:
      "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort design. Perfect for work, travel, or everyday use.",
    price: 129.99,
    originalPrice: 159.99,
    category: "Audio",
    brand: "SoundWave",
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    images: [
      "/img/itemcard/items.png",
      "/img/itemcard/items2.png",
      "/img/itemcard/items.png",
      "/img/itemcard/items.png",
    ],
    variants: {
      color: [
        { name: "Red", value: "red" },
        { name: "Black", value: "black" },
        { name: "Blue", value: "blue" },
      ],
      size: [
        { name: "Small", value: "S" },
        { name: "Medium", value: "M" },
        { name: "Large", value: "L" },
      ],
    },
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Quick charge (10 min = 5 hours)",
      "Touch controls",
      "Built-in microphone",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 ohms",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0, 3.5mm jack",
    },
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      color: product.variants?.color?.[0] || null,
      size: product.variants?.size?.[0] || null,
    };
    console.log("Adding :", cartItem);
    addToCart(cartItem);
  };
  const handleQuantityChange = (q) => {
    setQuantity(q);
  };
  return (
    <section className="container product-details">
      <section
        className="back-cart"
        onClick={() => {
          navigate("/products");
        }}
      >
        <BsArrowLeftCircle />
        <p>Go back Shopping</p>
      </section>
      <section className="product-content">
        <div className="product-images">
          <div className="selected">
            <img src={product.images[selectedImage]} alt="Product Page" />
          </div>
          <div className="all-images">
            {product.images.map((img, index) => (
              <div className="thumbnail" key={index}>
                <img
                  src={img}
                  onClick={() => setSelectedImage(index)}
                  className={
                    selectedImage === index ? "thumbnail active" : "thumbnail"
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className="product-details">
          <h2>{product.title}</h2>
          <div className="rating">
            <div className="stars">
              {Array.from({ length: Math.floor(product.rating) }).map((i) => (
                <FaStar key={i} color="gold" />
              ))}
            </div>
            <p>({product.rating})</p>
          </div>
          <div className="product-price">
            <p>${product.price}</p>
          </div>
          <div className="product-desc">
            <p>{product.longDescription}</p>
          </div>
          {/* color */}
          {product.variants.color && (
            <div className="variant-section">
              <h3>Color</h3>
              <div className="color-options">
                {product.variants.color.map((color) => (
                  <button
                    key={color.value}
                    className={`color-option ${
                      selectedColor?.value === color.value ? "selected" : ""
                    } `}
                    style={{
                      backgroundColor: color.value,
                    }}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* size */}
          {product.variants.size && (
            <div className="variant-section">
              <h3>Size</h3>
              <div className="color-options">
                {product.variants.size.map((size) => (
                  <button
                    key={size.value}
                    className={`color-option ${
                      selectedSize?.value === size.value ? "selected" : ""
                    } `}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.value}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="quantity">
            <p>Quantity</p>
            <Counter initial={quantity} onChange={handleQuantityChange} />
          </div>
          {/* Add to Cart */}
          <div className="add-to-cart-section">
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProductDetailsPage;
