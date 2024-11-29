import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    username: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true },
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;