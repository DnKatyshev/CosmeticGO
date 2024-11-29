import mongoose from "mongoose";

const paidOrderSchema = new mongoose.Schema({
    user: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    paymentId: { type: String, default: "YOOKASSA_DEFAULT_ID", required: true },
    
    // products теперь массив массивов
    products: [
        [
            {
                product: { type: mongoose.Schema.Types.ObjectId, required: true },
                quantity: { type: Number, default: 0, required: true },
            }
        ]
    ],
});

const PaidOrder = mongoose.model('PaidOrder', paidOrderSchema, 'paidOrders');
export default PaidOrder