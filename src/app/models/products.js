import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    colors: [{
        colorName: { type: String, required: true },
        imageUrl: { type: String, required: true }
    }],
    sizes: [{ type: String, required: true }]
});

// Optional: Add methods if needed
productSchema.methods.getPriceTag = function () {
    return `${this.price} USD`;
};

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
