"use client"; // Ensure this is a Client Component for navigation

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for App Router
import styles from "./NavBar.module.css";

const NavBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      router.push(`/product/${trimmedSearchTerm}`); // Navigate to the product page
    } else {
      alert("Please enter a valid product ID");
    }
  };

  const handleHomeRout = () => {
    router.push(`/`);
  };

  const handleAddProduct = () => {
    router.push(`/addProduct`);
  };

  const handleLogin = () => {
    if (isLoggedIn) {
      // Handle logout logic
      setIsLoggedIn(false); // Update state
      alert("You have been logged out!");
    } else {
      // Navigate to login page
      router.push(`/login`);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon}></div>
        <span className={styles.logoText} onClick={handleHomeRout}>
          SMART CART
        </span>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <span className={styles.navLink}>All</span>
        </li>
        <li>
          <span className={styles.navLink}>Shirts</span>
        </li>
        <li>
          <span className={styles.navLink} onClick={handleAddProduct}>
            Add Products
          </span>
        </li>
      </ul>
      <div className={styles.searchCart}>
        {/* Wrap input and button in a form for "Enter" functionality */}
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            🔍
          </button>
        </form>
        <button className={styles.cartButton}>🛒</button>
        <button className={styles.authButton} onClick={handleLogin}>
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
