// netlify/functions/getProducts.js

const { faker } = require('@faker-js/faker');

// Generate mock products
const generateProducts = (count) => {
    const colors = ['red', 'blue', 'green', 'purple', 'orange'];
    const colorImages = {
        red: 'https://picsum.photos/200/300?random=1',
        blue: 'https://picsum.photos/200/300?random=2',
        green: 'https://picsum.photos/200/300?random=3',
        purple: 'https://picsum.photos/200/300?random=4',
        orange: 'https://picsum.photos/200/300?random=5',
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
            image: colorImagesForProduct.red,  // Default image (first color)
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
