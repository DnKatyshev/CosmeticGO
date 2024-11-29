import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountCardPrice: { type: Number },
    category: {
        name: { type: String, required: true },
        id: { type: Number, required: true }
    },
    brand: { type: String, required: true },
    country: {
        name: { type: String, required: true },
        id: { type: Number, required: true }
    },
    weight: { type: Number },
    availability: { type: Boolean, default: true },
    rating: { type: Number },
    ingredients: { type: String },
    description: { type: String },
    vegan: { type: Boolean },
    photos: [{ type: String, required: true }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] // ссылка на отзывы
});

const Product = mongoose.model('Product', productSchema);
export default Product;