import { z } from 'zod'
import { ProductQueryParamsShema, CreateReviewSchema, GetReviewsSchema, UserSignUpSchema, UserSignInSchema, AddToCartSchema, RemoveFromCartShema, CreateOrderSchema, CreatePaymentSchema, CreatePaidOrder } from "./ZodSchemas";

export type TProductQueryParams = z.infer<typeof ProductQueryParamsShema>


export type TCreateReview = z.infer<typeof CreateReviewSchema>
export type TGetReviews = z.infer<typeof GetReviewsSchema>


export type TSignUpUser = z.infer<typeof UserSignUpSchema>
export type TSignInUser = z.infer<typeof UserSignInSchema>


export type TAddToCart = z.infer<typeof AddToCartSchema>
export type TGetCart = {
    user: string
}
export type TRemoveFromCart = z.infer<typeof RemoveFromCartShema>


export type TCreateOrder = z.infer<typeof CreateOrderSchema>
export type TGetOrder = {
    user: string
}
export type TRemoveFromOrder = {
    user: string,
    productId: string
}
export type TCreatePayment = z.infer<typeof CreatePaymentSchema>

export type TCreatePaidOrder = z.infer<typeof CreatePaidOrder>