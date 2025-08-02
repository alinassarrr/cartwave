import React from "react";
import "./styles.css";
import { FaCartArrowDown } from "react-icons/fa";

const ItemCard = ({ img, title, description, price }) => {
  return (
    <div className="item-card">
      <div className="image-wrapper">
        <img src={img} alt="Product" />
      </div>
      <div className="cardinfo-wrapper">
        <p className="card-title">Item Title</p>
        <p className="card-desc">
          Desc Lorem ipsum dolor sit amet, consectetur adipisicing Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Quisquam deserunt
          explicabo asperiores, corrupti mollitia illo velit? Consequuntur saepe
          itaque repellendus, velit inventore, tempore tenetur ea delectus,
          libero obcaecati maiores consectetur?
        </p>
        <div className="price-add">
          <p className="price">$29.99</p>

          <button
            className="add-to-cart"
            onClick={() => console.log("clicked")}
          >
            <FaCartArrowDown />
            <p>Add</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
