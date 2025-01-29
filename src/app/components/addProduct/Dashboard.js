"use client"
import React, { useState } from 'react';
import styles from './Dashboard.module.css';  // Ensure the CSS path is correct

const Dashboard = () => {
  // Initialize product state with default values
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    colors: [{ colorName: '', imageUrl: '' }],
    sizes: [],
  });

  // Handle generic input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  // Handle changes in color details (both color name and associated image URL)
  const handleColorChange = (index, field, value) => {
    const newColors = [...product.colors];
    newColors[index] = { ...newColors[index], [field]: value };
    setProduct({ ...product, colors: newColors });
  };

  // Add a new color field
  const handleAddColor = () => {
    setProduct(prev => ({
      ...prev,
      colors: [...prev.colors, { colorName: '', imageUrl: '' }]
    }));
  };

  // Toggle selection of sizes
  const handleSizeChange = (size) => {
    const newSizes = product.sizes.includes(size)
      ? product.sizes.filter(s => s !== size)
      : [...product.sizes, size];
    setProduct(prev => ({ ...prev, sizes: newSizes }));
  };

  // Submit the product to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/add-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });

      if (response.ok) {
        const data = await response.json();
        alert('Product added successfully: ' + data.productId);
        setProduct({ name: '', price: '', description: '', colors: [{ colorName: '', imageUrl: '' }], sizes: [] });
      } else {
        const errorData = await response.json();
        alert('Failed to add product: ' + errorData.error);
      }
    } catch (error) {
      console.error('Failed to submit product:', error);
      alert('Error submitting product');
    }
  };

  // Define available sizes
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Add New Product</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Product Name:</label>
          <input className={styles.input} type="text" id="name" name="name" value={product.name} onChange={handleInputChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="price">Price (USD):</label>
          <input className={styles.input} type="number" id="price" name="price" value={product.price} onChange={handleInputChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea className={styles.input} id="description" name="description" value={product.description} onChange={handleInputChange} required />
        </div>
        {product.colors.map((color, index) => (
          <div key={index} className={styles.formGroup}>
            <label>Color Name:</label>
            <input className={styles.input} type="text" value={color.colorName} onChange={e => handleColorChange(index, 'colorName', e.target.value)} required />
            <label>Image URL:</label>
            <input className={styles.input} type="text" value={color.imageUrl} onChange={e => handleColorChange(index, 'imageUrl', e.target.value)} required />
          </div>
        ))}
        <button type="button" onClick={handleAddColor} className={styles.addButton}>Add Another Color</button>
        <div className={styles.formGroup}>
          <label>Sizes:</label>
          {availableSizes.map(size => (
            <button key={size} type="button" onClick={() => handleSizeChange(size)} className={product.sizes.includes(size) ? styles.selectedSize : styles.size}>
              {size}
            </button>
          ))}
        </div>
        <button type="submit" className={styles.submitButton}>Add Product</button>
      </form>
    </div>
  );
};

export default Dashboard;
