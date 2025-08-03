import "./styles.css";
import ItemCard from "../../components/ItemCard";
import Pagination from "../../components/Pagination";
import Filter from "../../components/Filter";

const ProductsPage = () => {
  // sample data
  const products = [
    {
      id: 1,
      img: "/img/itemcard/items.png",
      title: "Premium Wireless Headphones",
      description:
        "High-quality wireless headphones with noise cancellation and premium sound quality.",
      price: 129.99,
    },
    {
      id: 2,
      img: "/img/itemcard/items2.png",
      title: "Smart Fitness Watch",
      description:
        "Advanced fitness tracking with heart rate monitor and GPS capabilities.",
      price: 199.99,
    },
    {
      id: 3,
      img: "/img/itemcard/items2.png",
      title: "Portable Bluetooth Speaker",
      description:
        "Waterproof portable speaker with 20-hour battery life and crystal clear sound.",
      price: 79.99,
    },
    {
      id: 4,
      img: "/img/itemcard/items2.png",
      title: "Wireless Charging Pad",
      description:
        "Fast wireless charging pad compatible with all Qi-enabled devices.",
      price: 49.99,
    },
    {
      id: 5,
      img: "/img/itemcard/items.png",
      title: "Gaming Mouse",
      description:
        "High-precision gaming mouse with customizable RGB lighting and programmable buttons.",
      price: 89.99,
    },
    {
      id: 6,
      img: "/img/itemcard/items2.png",
      title: "Mechanical Keyboard",
      description:
        "Premium mechanical keyboard with tactile switches and backlit keys.",
      price: 149.99,
    },
    {
      id: 7,
      img: "/img/itemcard/items2.png",
      title: "USB-C Hub",
      description:
        "Multi-port USB-C hub with HDMI, USB, and SD card slots for enhanced connectivity.",
      price: 39.99,
    },
    {
      id: 8,
      img: "/img/itemcard/items2.png",
      title: "Wireless Earbuds",
      description:
        "True wireless earbuds with active noise cancellation and 30-hour battery life.",
      price: 159.99,
    },
  ];
  if (products.length === 0) {
    return (
      <div className="container cart-page">
        <div className="empty">
          <h2>No products yet to show</h2>
          <p>Try visitng this page later</p>
        </div>
      </div>
    );
  }
  return (
    <div className="container products">
      <Filter />
      <section className="items-list">
        {products.map((product) => (
          <ItemCard
            key={product.id}
            id={product.id}
            img={product.img}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </section>
      <Pagination />
    </div>
  );
};

export default ProductsPage;
