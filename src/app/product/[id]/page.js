"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Use useParams to get route params
import styles from "./ProductPage.module.css";
import NavBar from "@/app/components/navbar/Navbar";

const ProductPage = () => {
  const params = useParams(); // Get params as a Promise
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedImage, setSelectedImage] = useState("");
  const [product, setProduct] = useState(null);

  // Mocked product data
  const productImages = {
    1: {
      name: "Circles T-Shirt Black",
      price: "$20.00 USD",
      colors: {
        Black: "/images/t-shirt-black.png",
        White: "/images/t-shirt-white.png",
        Blue: "/images/t-shirt-blue.png",
      },
    },
    2: {
      name: "Hand Bag",
      price: "$25.00 USD",
      colors: {
        Black: "/images/bag-1-dark.png",
        White: "/images/bag-1-light.png",
      },
    },
  };

  useEffect(() => {
    // Ensure params are fetched and available
    if (params && params.id && productImages[params.id]) {
      const id = params.id;
      setProduct(productImages[id]);
      setSelectedColor("Black"); // Default color
      setSelectedImage(productImages[id].colors["Black"]); // Default image
    }
  }, [params]);

  if (!product) {
    return <div>Loading product...</div>;
  }

  const colors = Object.keys(product.colors);
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  return (
    <>
      <NavBar/>
    
    <div className={styles.productPage}>
    
      <div className={styles.container}>
        {/* Left Section: Product Image */}
        <div className={styles.leftSection}>
          <div className={styles.mainImageWrapper}>
            <img
              src={selectedImage}
              alt={product.name}
              width={200}
              height={120}
              className={styles.mainImage}
            />
          </div>
          <div className={styles.thumbnailWrapper}>
            {colors.map((color) => (
              <button
                key={color}
                className={`${styles.thumbnailButton} ${
                  selectedColor === color ? styles.selectedThumbnail : ""
                }`}
                onClick={() => {
                  setSelectedColor(color);
                  setSelectedImage(product.colors[color]);
                }}
              >
                <img
                  src={product.colors[color]}
                  alt={`${color} ${product.name}`}
                  className={styles.thumbnailImage}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className={styles.rightSection}>
          {/* Product Name and Price */}
          <div className={styles.productInfo}>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.productPrice}>{product.price}</p>
          </div>

          {/* Color Selection */}
          <div className={styles.optionGroup}>
            <h2 className={styles.optionLabel}>COLOR</h2>
            <div className={styles.options}>
              {colors.map((color) => (
                <button
                  key={color}
                  className={`${styles.optionButton} ${
                    selectedColor === color ? styles.selectedOption : ""
                  }`}
                  onClick={() => {
                    setSelectedColor(color);
                    setSelectedImage(product.colors[color]);
                  }}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className={styles.optionGroup}>
            <h2 className={styles.optionLabel}>SIZE</h2>
            <div className={styles.options}>
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`${styles.optionButton} ${
                    selectedSize === size ? styles.selectedOption : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Product Description */}
          <p className={styles.productDescription}>
            60% combed ringspun cotton / 40% polyester jersey tee.
          </p>

          {/* Add to Cart Button */}
          <button className={styles.addToCartButton}>+ Add To Cart</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductPage;
