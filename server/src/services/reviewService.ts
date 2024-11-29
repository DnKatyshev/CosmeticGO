import mongoose from "mongoose";
import Review from "../model/reviewModel";
import Product from "../model/productModel";
import User from "../model/userModel";
import {TCreateReview, TGetReviews} from "../types/types"

class ReviewService{

    async createReview(reviewData:TCreateReview){

        // Сохраняем данные отзывы в модель Review
        const reviewDataWithObjectId = {
            ...reviewData,
            product_id: new mongoose.Types.ObjectId(reviewData.product_id),
        };
        const newReview = new Review(reviewDataWithObjectId);
        await newReview.save()


        console.log('reviewDataWithObjectId: ', reviewDataWithObjectId)


        // Сохраняем данные отзывы в модель Product / User
        const productId = reviewDataWithObjectId.product_id
        const username = reviewDataWithObjectId.username
        const newReviewId = newReview._id

        await Product.findByIdAndUpdate(productId, { $push: { reviews: newReviewId } }, { new: true });
        await User.findOneAndUpdate(
            { username },
            { $push: { reviews: newReviewId } },
            { new: true }
        );
    
    }

    async getReviewsByIds(data:TGetReviews){

        const {reviewsIds, withProductsFlag} = data

        console.log('GetReviewBODY: ', reviewsIds, withProductsFlag)
        
        if(withProductsFlag){
            return await Review.find({
                _id: { $in: reviewsIds }
            }).populate('product_id');

        } else {
            return await Review.find({
                _id: { $in: reviewsIds }
            })
        }
    }

}

export default new ReviewService();