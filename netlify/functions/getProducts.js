// netlify/functions/getProducts.js

const { faker } = require('@faker-js/faker');

// Generate mock products
const generateProducts = (count) => {
    const colors = ['red', 'blue', 'green', 'purple', 'orange'];
    const colorImages = {
        red: 'https://images.unsplash.com/photo-1617150154344-0a04a989f375',
        blue: 'https://images.unsplash.com/photo-1555685812-87ab2c49a3ec',
        green: 'https://images.unsplash.com/photo-1548098453-478d21f6c788',
        purple: 'https://images.unsplash.com/photo-1578009409443-7b1190b0ca4d',
        orange: 'https://images.unsplash.com/photo-1537045033170-e08d759b861f',
    };

    const products = [];

    for (let i = 0; i < count; i++) {
        const randomColors = colors.sort(() => 0.5 - Math.random()).slice(0, 5);

        const colorImagesForProduct = randomColors.reduce((acc, color) => {
            acc[color] = colorImages[color];
            return acc;
        }, {});

        products.push({
            id: faker.string.uuid(),
            name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
            price: faker.commerce.price({ min: 10, max: 100, dec: 2 }),
            image: colorImagesForProduct.red,
            colors: colorImagesForProduct,
            sizes: ['S', 'M', 'L'],
        });
    }

    return products;
};

exports.handler = async function (event, context) {
    // Generate mock products
    const products = generateProducts(100);  // Generate 100 mock products

    return {
        statusCode: 200,
        body: JSON.stringify(products),  // Return the products as JSON
    };
};
