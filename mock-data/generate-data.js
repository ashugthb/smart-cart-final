import { faker } from '@faker-js/faker';
import fs from 'fs';

const generateProducts = (count) => {
    // Predefined color set
    const colors = ['red', 'blue', 'green', 'purple', 'orange']; // 5 colors
    const products = [];

    // Use Lorem Picsum for random image URLs
    const getRandomImage = () => `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 1000)}`;

    for (let i = 0; i < count; i++) {
        // Randomly shuffle colors for each product
        const randomColors = colors.sort(() => 0.5 - Math.random()).slice(0, 5);

        const colorImagesForProduct = randomColors.reduce((acc, color) => {
            acc[color] = getRandomImage(); // Assign a random image for each color
            return acc;
        }, {});

        products.push({
            id: faker.string.uuid(),
            name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
            price: faker.commerce.price({ min: 10, max: 100, dec: 2 }),
            image: colorImagesForProduct.red, // Default to the red color image for the product
            colors: colorImagesForProduct, // Attach all color options with random images
            sizes: ['S', 'M', 'L'],
        });
    }

    return { products };
};

// Generate 1000 products
const data = generateProducts(1000);
fs.writeFileSync('./db.json', JSON.stringify(data, null, 2)); // Save data in db.json
console.log('Mock data generated!');
