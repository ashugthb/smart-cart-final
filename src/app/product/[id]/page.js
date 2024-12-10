"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Use useParams to get route params
import QRCode from "react-qr-code"; // Import the QR code generator
import styles from "./ProductPage.module.css";
import NavBar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";

const ProductPage = () => {
  const params = useParams(); // Get params from the route
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
      id: "83 AC 94 13",
    },
    2: {
      name: "Hand Bag",
      price: "$25.00 USD",
      colors: {
        Black: "/images/bag-1-dark.png",
        White: "/images/bag-1-light.png",
      },
      id: "05 3C E0 00",
    },
  };

  useEffect(() => {
    if (params?.id) {
      // Find the product based on its unique ID
      const decodedId = decodeURIComponent(params.id);
      const productData = Object.values(productImages).find(
        (item) => item.id ===decodedId
      );
      
      console.log(decodedId)

      if (productData) {
        setProduct(productData); // Set the found product
        setSelectedColor("Black"); // Default color
        setSelectedImage(productData.colors["Black"]); // Default image
      } else {
        setProduct(null); // Product not found
      }
    }
  }, [params]);

  if (!product) {
    return <div>Product not found. Please check the product ID.</div>;
  }

  const colors = Object.keys(product.colors);
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  // Generate QR Code value
  const qrCodeValue = JSON.stringify({
    productName: product.name,
    price: product.price,
    selectedColor,
    selectedSize,
  });

  return (
    <>
      <NavBar />
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

            {/* QR Code Section */}
            <div className={styles.qrCodeSection}>
              <h2 className={styles.qrCodeLabel}>Share Product</h2>
              <QRCode value={qrCodeValue} size={150} level={"H"} />
              <div className={styles.productDetails}>
                <h3>Product Details</h3>
                <p>
                  <strong>Name:</strong> {product.name}
                </p>
                <p>
                  <strong>Price:</strong> {product.price}
                </p>
                <p>
                  <strong>Selected Color:</strong> {selectedColor}
                </p>
                <p>
                  <strong>Selected Size:</strong> {selectedSize}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
