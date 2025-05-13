// netlify/functions/getProducts.js

const { faker } = require('@faker-js/faker');

// 1️⃣ generate once at startup
const COLORS = ['red', 'blue', 'green', 'purple', 'orange'];
// const COLOR_IMAGES = {
//     red: 'https://picsum.photos/200/300?random=1',
//     blue: 'https://picsum.photos/200/300?random=2',
//     green: 'https://picsum.photos/200/300?random=3',
//     purple: 'https://picsum.photos/200/300?random=4',
//     orange: 'https://picsum.photos/200/300?random=5',
// };

function randomImageUrl() {
    return `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`;
}

function generateProducts(count) {
    return Array.from({ length: count }).map(() => {
        // shuffle a copy of COLORS so our module-level array isn’t mutated
        const shuffled = [...COLORS].sort(() => 0.5 - Math.random());
        const pickCount = Math.floor(3 + Math.random() * 3); // 3–5 colors
        const chosen = shuffled.slice(0, pickCount);

        // build a { colorName: imageUrl, … } map
        const colors = chosen.reduce((acc, color) => {
            acc[color] = randomImageUrl();
            return acc;
        }, {});

        return {
            id: faker.string.uuid(),
            name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
            price: parseFloat(faker.commerce.price({ min: 10, max: 100, dec: 2 })),
            colors,                // now a proper object of urls
            sizes: ['S', 'M', 'L'],
        };
    });
}

// keep the same 100 products in memory until the Lambda container recycles
const PRODUCTS = generateProducts(100);

exports.handler = async function (event) {
    const { id } = event.queryStringParameters || {};

    if (id) {
        const product = PRODUCTS.find((p) => p.id === id);
        if (!product) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: `No product with id ${id}` }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(product),
        };
    }

    // no id → return the full list
    return {
        statusCode: 200,
        body: JSON.stringify(PRODUCTS),
    };
};

netlify / functions / getProducts.js

// const { faker } = require('@faker-js/faker');

// // Generate mock products
// const generateProducts = (count) => {
//     const colors = ['red', 'blue', 'green', 'purple', 'orange'];
//     const colorImages = {
//         red: 'https://picsum.photos/200/300?random=1',
//         blue: 'https://picsum.photos/200/300?random=2',
//         green: 'https://picsum.photos/200/300?random=3',
//         purple: 'https://picsum.photos/200/300?random=4',
//         orange: 'https://picsum.photos/200/300?random=5',
//     };

//     const products = [];

//     for (let i = 0; i < count; i++) {
//         const randomColors = colors.sort(() => 0.5 - Math.random()).slice(0, 5);

//         const colorImagesForProduct = randomColors.reduce((acc, color) => {
//             acc[color] = colorImages[color];
//             return acc;
//         }, {});

//         products.push({
//             id: faker.string.uuid(),
//             name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
//             price: faker.commerce.price({ min: 10, max: 100, dec: 2 }),
//             image: colorImagesForProduct.red,  // Default image (first color)
//             colors: colorImagesForProduct,
//             sizes: ['S', 'M', 'L'],
//         });
//     }

//     return products;
// };

// exports.handler = async function (event, context) {
//     // Generate mock products
//     const products = generateProducts(100);  // Generate 100 mock products

//     return {
//         statusCode: 200,
//         body: JSON.stringify(products),  // Return the products as JSON
//     };
// };
