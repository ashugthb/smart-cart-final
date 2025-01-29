export default function Products() {
    const products = [];

    function generateID(index) {
        const base = "00 00 00";
        let hex = (index + 1).toString(16).toUpperCase();
        return base.substr(0, base.length - hex.length) + hex;
    }

    for (let i = 0; i < 1000; i++) {
        products.push({
            id: generateID(i),
            name: `Product ${i + 1}`,
            price: `$${(Math.floor(Math.random() * 20) + 10).toFixed(2)} USD`,
            image: `/images/product-${i % 3 + 1}.png`,
        });
    }
    return products
}

