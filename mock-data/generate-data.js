import { faker } from '@faker-js/faker';
import fs from 'fs';

const generateProducts = (count) => {
    // Predefined color set
    const colors = ['red', 'blue', 'green', 'purple', 'orange']; // 5 colors
    const products = [];

    // Use this set to simulate colored image URLs (you can change this to use actual APIs for real-time fetching)
    const colorImages = {
        red: 'https://images.unsplash.com/photo-1617150154344-0a04a989f375',   // red color image
        blue: 'https://images.unsplash.com/photo-1555685812-87ab2c49a3ec',  // blue color image
        green: 'https://images.unsplash.com/photo-1548098453-478d21f6c788', // green color image
        purple: 'https://images.unsplash.com/photo-1578009409443-7b1190b0ca4d',  // purple color image
        orange: 'https://images.unsplash.com/photo-1537045033170-e08d759b861f', // orange color image
    };

    for (let i = 0; i < count; i++) {
        // Randomly shuffle colors for each product
        const randomColors = colors.sort(() => 0.5 - Math.random()).slice(0, 5);

        const colorImagesForProduct = randomColors.reduce((acc, color) => {
            acc[color] = colorImages[color]; // Use the pre-defined color images
            return acc;
        }, {});

        products.push({
            id: faker.string.uuid(),
            name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
            price: faker.commerce.price({ min: 10, max: 100, dec: 2 }),
            image: colorImagesForProduct.red, // Default to one color image for the product
            colors: colorImagesForProduct, // Attach all color options
            sizes: ['S', 'M', 'L'],
        });
    }

    return { products };
};

// Generate 1000 products
const data = generateProducts(1000);
fs.writeFileSync('./mock-data/db.json', JSON.stringify(data, null, 2)); // Save data in db.json
console.log('Mock data generated!');
