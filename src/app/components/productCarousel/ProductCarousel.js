"use client"; // Ensures this is a Client Component

import React from "react";
import styles from "./ProductCarousel.module.css";

const ProductCarousel = () => {
  const products = [
    {
      id: 1,
      name: "Acme Hoodie",
      price: "$50.00 USD",
      image: "/images/baby-cap-black.png",
    },
    {
      id: 2,
      name: "Acme Baby Onesie",
      price: "$10.00 USD",
      image: "/images/baby-onesie-beige-1.png",
    },
    {
      id: 3,
      name: "Acme Baby Cap",
      price: "$10.00 USD",
      image: "/images/hoodie.png",
    },
    {
      id: 4,
      name: "Acme Mug",
      price: "$15.00 USD",
      image: "/images/mug.avif",
    },
  ];

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carousel}>
        {products.map((product) => (
          <div key={product.id} className={styles.product}>
            <img src={product.image} alt={product.name} className={styles.image} />
            <div className={styles.info}>
              <span className={styles.name}>{product.name}</span>
              <span className={styles.price}>{product.price}</span>
            </div>
          </div>
        ))}
        {/* Duplicate the products to create a seamless scrolling effect */}
        {products.map((product) => (
          <div key={`${product.id}-duplicate`} className={styles.product}>
            <img src={product.image} alt={product.name} className={styles.image} />
            <div className={styles.info}>
              <span className={styles.name}>{product.name}</span>
              <span className={styles.price}>{product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
