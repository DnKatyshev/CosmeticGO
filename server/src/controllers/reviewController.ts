// Node
import { Request, Response } from "express";

// Services
import ReviewService from "../services/reviewService";

// Types
import { CreateReviewSchema, GetReviewsSchema } from "../types/ZodSchemas";


class ReviewController{

    async createReview(req:Request, res:Response) {
        try {
            // Делаем валидацию в runtime через ZOD
            if(CreateReviewSchema.safeParse(req.body).success){
    
                const result = await ReviewService.createReview(req.body)
                res.status(200).json({message: 'Отзыв успешно создан!', result});

            } else{
                res.status(400).json({ message: 'Invalid Review-object!' });
            }
        }

        catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

    async getReviews(req:Request, res:Response) {
        try {
            if(req.body === ''){
                res.status(200).json({message: 'Пока нет отзывов!'});
            } else {
                // Делаем валидацию в runtime через ZOD
                if(GetReviewsSchema.safeParse(req.body).success){
        
                    const result = await ReviewService.getReviewsByIds(req.body)
                    res.status(200).json({
                        result
                    });
    
                } else{
                    console.log('GetReviewZOD ERROR')
                    res.status(400).json({ message: 'Invalid ReviewsID-array!' });
                }
            }

        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }


    async patchReview(req:Request, res:Response) {
        try {

            if(req.body === ''){
                res.status(200).json({message: 'Пока нет отзывов!'});
            } else {
                // Делаем валидацию в runtime через ZOD
                if(GetReviewsSchema.safeParse(req.body).success){
        
                    const result = await ReviewService.getReviewsByIds(req.body)
                    res.status(200).json({
                        result
                    });
    
                } else{
                    res.status(400).json({ message: 'Invalid Reviews-ID!' });
                }
            }

        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

}

export default new ReviewController();