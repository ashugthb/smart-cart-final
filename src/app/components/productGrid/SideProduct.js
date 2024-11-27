import React from "react";
import styles from "./ProductGrid.module.css"; // Modular CSS for SideProduct

const SideProduct = ({ product }) => {
  return (
    <div className={`${styles.sideProduct} group`}>
      <div className={`${styles.imageWrapper} overflow-hidden`}>
        <img
          src={product.image}
          alt={product.name}
          className={`${styles.image} rounded-lg`}
        />
      </div>
      <div className={`${styles.info}`}>
        <span className={styles.name}>{product.name}</span>
        <span className={styles.price}>{product.price}</span>
      </div>
    </div>
  );
};

export default SideProduct;
