import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Main Footer Section */}
      <div className={styles.mainFooter}>
        <div className={styles.footerContainer}>
          {/* Left Section */}
          <div className={styles.logoSection}>
            <div className={styles.logo}></div>
            <span className={styles.logoText}>SMART CART</span>
          </div>

          {/* Center Section */}
          <div className={styles.linkSection}>
            <a href="#" className={styles.link}>
              Home
            </a>
            <a href="#" className={styles.link}>
              About
            </a>
            <a href="#" className={styles.link}>
              Terms & Conditions
            </a>
            <a href="#" className={styles.link}>
              Shipping & Return Policy
            </a>
            <a href="#" className={styles.link}>
              Privacy Policy
            </a>
            <a href="#" className={styles.link}>
              FAQ
            </a>
          </div>

          {/* Right Section */}
          <div className={styles.buttonSection}>
            <button className={styles.deployButton}>
              <span className={styles.deployText}>Deploy</span>
              <div className={styles.deployIcon}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className={styles.bottomFooter}>
        <div className={styles.bottomContainer}>
          <span className={styles.bottomText}>
            © 2023-2024 ACME, Inc. All rights reserved.
          </span>
          <a href="#" className={styles.bottomLink}>
            View the source
          </a>
          <div className={styles.createdBy}>
            <span>Created by</span>
            <div className={styles.vercelIcon}></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
