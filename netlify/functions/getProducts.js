// netlify/functions/getProducts.js

const { faker } = require('@faker-js/faker');

// 1️⃣ Generate once at startup and re-use across invocations
const COLORS = ['red', 'blue', 'green', 'purple', 'orange'];
const COLOR_IMAGES = {
    red: 'https://picsum.photos/200/300?random=1',
    blue: 'https://picsum.photos/200/300?random=2',
    green: 'https://picsum.photos/200/300?random=3',
    purple: 'https://picsum.photos/200/300?random=4',
    orange: 'https://picsum.photos/200/300?random=5',
};

function generateProducts(count) {
    return Array.from({ length: count }).map(() => {
        // pick 3–5 random colors
        const shuffled = COLORS.sort(() => 0.5 - Math.random());
        const chosen = shuffled.slice(0, Math.floor(3 + Math.random() * 3));
        const colors = chosen.reduce((acc, c) => {
            acc[c] = COLOR_IMAGES[c];
            return acc;
        }, {});

        return {
            id: faker.string.uuid(),
            name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
            price: parseFloat(faker.commerce.price({ min: 10, max: 100, dec: 2 })),
            colors,                   // { red: '…', blue: '…', … }
            sizes: ['S', 'M', 'L'],
        };
    });
}

// keep the same 100 products in memory until the Lambda container recycles
const PRODUCTS = generateProducts(100);

exports.handler = async function (event) {
    const params = event.queryStringParameters || {};
    const { id } = params;

    if (id) {
        // 2️⃣ if an `id` was provided, return just that product
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

    // 3️⃣ no `id` => return the full array
    return {
        statusCode: 200,
        body: JSON.stringify(PRODUCTS),
    };
};
