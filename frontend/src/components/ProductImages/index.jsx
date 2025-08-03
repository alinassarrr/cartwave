import React, { useState } from "react";
import "./styles.css";

const ProductImages = ({ onChange }) => {
  const [images, setImages] = useState([]);

  const handleImageUpload = async (files) => {
    const promises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () =>
          resolve({ name: file.name, base64: reader.result });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    try {
      const base64Images = await Promise.all(promises);
      const updatedImages = [...images, ...base64Images];
      setImages(updatedImages);
      onChange?.(updatedImages);
    } catch (error) {
      console.error("Failed to read images:", error);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) handleImageUpload(files);
  };

  const handleBrowse = (e) => {
    const files = e.target.files;
    if (files.length) handleImageUpload(files);
  };

  return (
    <div className="product-images">
      <h3>Product Images</h3>
      <div
        className="image-drop-area"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleBrowse}
          hidden
          id="imageInput"
        />
        <label htmlFor="imageInput" className="upload-box">
          <span>ARROW</span>
          <p>
            Drop your images here, or <strong>Browse</strong>
          </p>
        </label>
      </div>

      <div className="image-preview">
        {images.map((img, idx) => (
          <img key={idx} src={img.base64} alt={`Product ${idx + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
