import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: { type: String, required: true },
    products: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 0, required: true }
    }],
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart