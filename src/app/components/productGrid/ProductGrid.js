'use client'
import React from "react";
import { useRouter } from 'next/navigation'// Correct module for App Router
import styles from "./ProductGrid.module.css";

const ProductGrid = () => {
  const router = useRouter();

  const products = [
    {
      id: 1,
      name: "Circles T-Shirt",
      price: "$20.00 USD",
      image: "/images/t-shirt-1.png",
    },
    {
      id: 2,
      name: "Drawstring Bag",
      price: "$12.00 USD",
      image: "/images/bag-1-dark.png",
    },
    {
      id: 3,
      name: "Cup",
      price: "$15.00 USD",
      image: "/images/cup-black.png",
    },
  ];

  // Handler to navigate to the product page
  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className={styles.productGridWrapper}>
      <div className={styles.gridContainer}>
        {/* Main Product */}
        <div
          className={`${styles.mainProduct} group`}
          onClick={() => handleProductClick(products[0].id)}
        >
          <div className={`${styles.imageWrapper}`}>
            <img
              src={products[0].image}
              alt={products[0].name}
              height={120}
              width={300}
              className={styles.image}
            />
          </div>
          <div className={styles.info}>
            <span className={styles.name}>{products[0].name}</span>
            <span className={styles.price}>{products[0].price}</span>
          </div>
        </div>

        {/* Side Products */}
        <div className={styles.sideProducts}>
          {products.slice(1).map((product) => (
            <div
              key={product.id}
              className={`${styles.sideProduct} group`}
              onClick={() => handleProductClick(product.id)}
            >
              <div className={`${styles.imageWrapper}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.image}
                />
              </div>
              <div className={styles.info}>
                <span className={styles.name}>{product.name}</span>
                <span className={styles.price}>{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;