import dbConnect from '../../lib/dbConnect';
import Product from '../../../src/app/models/products';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const { name, price, description, colors, sizes } = req.body;
            const newProduct = new Product({
                name,
                price,
                description,
                colors,
                sizes
            });
            await newProduct.save();
            res.status(201).json({ message: 'Product added successfully', productId: newProduct._id });
        } catch (error) {
            res.status(400).json({ message: 'Error adding product', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
