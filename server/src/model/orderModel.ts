import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: String, required: true },
    email: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true },
    paymentId: { type: String, default: "YOOKASSA_DEFAULT_ID", required: true },
    
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 0, required: true }
    }],
    
    address: { type: String },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
export default Order