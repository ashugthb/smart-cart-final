const { faker } = await import('@faker-js/faker');
const fs = await import('fs');

const generateProducts = (count) => {
    const products = [];
    for (let i = 0; i < count; i++) {
        products.push({
            id: faker.string.uuid(),
            name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
            price: faker.commerce.price({ min: 10, max: 100, dec: 2 }),
            colors: {
                Black: `https://picsum.photos/200/300?random=${i}&grayscale`,
                Blue: `https://picsum.photos/200/300?random=${i}&blue`,
            },
            sizes: ['S', 'M', 'L'],
        });
    }
    return { products };
};

// Generate 1000 products
const data = generateProducts(1000);
fs.writeFileSync('./db.json', JSON.stringify(data));
console.log('Mock data generated!');