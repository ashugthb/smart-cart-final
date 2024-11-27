// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // For fetching the ID from the route
// import styles from "../product/[id]/ProductPage.module.css"

// const ProductPage = () => {
//   const router = useRouter();
//   const [selectedColor, setSelectedColor] = useState("Black");
//   const [selectedSize, setSelectedSize] = useState("M");
//   const [selectedImage, setSelectedImage] = useState("/images/t-shirt-black.png");

//   // Mocked product data based on product ID
//   const productImages = {
//     1: {
//       name: "Circles T-Shirt Black",
//       price: "$20.00 USD",
//       colors: {
//         Black: "/images/t-shirt-black.png",
//         White: "/images/t-shirt-white.png",
//         Blue: "/images/t-shirt-blue.png",
//       },
//     },
//     2: {
//       name: "Stripes T-Shirt White",
//       price: "$25.00 USD",
//       colors: {
//         Black: "/images/stripes-t-shirt-black.png",
//         White: "/images/stripes-t-shirt-white.png",
//         Blue: "/images/stripes-t-shirt-blue.png",
//       },
//     },
//   };

//   const [product, setProduct] = useState(productImages[1]); // Default product

//   useEffect(() => {
//     // Fetch the product ID from the route
//     const id = router.query.id || 1; // Default to ID 1 if not present
//     setProduct(productImages[id]);
//     setSelectedColor("Black"); // Reset color to default when changing products
//     setSelectedImage(productImages[id].colors["Black"]); // Default to Black color
//   }, [router.query.id]); // Trigger when route changes

//   const colors = Object.keys(product.colors);
//   const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

//   return (
//     <div className={styles.productPage}>
//       <div className={styles.container}>
//         {/* Left Section: Product Image */}
//         <div className={styles.leftSection}>
//           <div className={styles.mainImageWrapper}>
//             <img
//               src={selectedImage}
//               alt={product.name}
//               width={200}
//               height={120}
//               className={styles.mainImage}
//             />
//           </div>
//           <div className={styles.thumbnailWrapper}>
//             {colors.map((color) => (
//               <button
//                 key={color}
//                 className={`${styles.thumbnailButton} ${
//                   selectedColor === color ? styles.selectedThumbnail : ""
//                 }`}
//                 onClick={() => {
//                   setSelectedColor(color);
//                   setSelectedImage(product.colors[color]);
//                 }}
//               >
//                 <img
//                   src={product.colors[color]}
//                   alt={`${color} ${product.name}`}
//                   className={styles.thumbnailImage}
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Right Section: Product Details */}
//         <div className={styles.rightSection}>
//           {/* Product Name and Price */}
//           <div className={styles.productInfo}>
//             <h1 className={styles.productName}>{product.name}</h1>
//             <p className={styles.productPrice}>{product.price}</p>
//           </div>

//           {/* Color Selection */}
//           <div className={styles.optionGroup}>
//             <h2 className={styles.optionLabel}>COLOR</h2>
//             <div className={styles.options}>
//               {colors.map((color) => (
//                 <button
//                   key={color}
//                   className={`${styles.optionButton} ${
//                     selectedColor === color ? styles.selectedOption : ""
//                   }`}
//                   onClick={() => {
//                     setSelectedColor(color);
//                     setSelectedImage(product.colors[color]);
//                   }}
//                 >
//                   {color}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Size Selection */}
//           <div className={styles.optionGroup}>
//             <h2 className={styles.optionLabel}>SIZE</h2>
//             <div className={styles.options}>
//               {sizes.map((size) => (
//                 <button
//                   key={size}
//                   className={`${styles.optionButton} ${
//                     selectedSize === size ? styles.selectedOption : ""
//                   }`}
//                   onClick={() => setSelectedSize(size)}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Description */}
//           <p className={styles.productDescription}>
//             60% combed ringspun cotton / 40% polyester jersey tee.
//           </p>

//           {/* Add to Cart Button */}
//           <button className={styles.addToCartButton}>+ Add To Cart</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
