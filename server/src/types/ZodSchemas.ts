import { verify } from 'crypto'
import { z } from 'zod'

// PRODUCTS
export const ProductQueryParamsShema = z.object({
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
    vegan: z.coerce.boolean().optional(),
    countryId: z.coerce.number().optional(),
    sort: z.enum(['increase', 'decrease', 'categories']).optional()
})
export const OneProductIdShema = z.string()
export const CatalogInputTextShema = z.string()


// REVIEWS
export const CreateReviewSchema = z.object({
    product_id: z.string(),
    username: z.string(),
    text: z.string(),
    rating: z.coerce.number(),
})
export const GetReviewsSchema = z.object({
    reviewsIds: z.array(z.string()),
    withProductsFlag: z.boolean()
})


// USERS
export const UserSignUpSchema = z.object({
    username: z.string(),
    password: z.string().optional(),
    confirm: z.string().optional(),
    email: z.string().email(),

    verified: z.boolean().optional(),
    verifyCode: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    discountCard: z.boolean().optional(),
    role: z.enum(['user', 'admin']).optional(),
    reviews: z.array(z.string()).optional(),
})
export const VerifyCodeSchema = z.object({
    verifyCode: z.string(),
})
export const UserSignInSchema = z.object({
    username: z.string(),
    password: z.string().optional(),
    email: z.string().email().optional(),
})


// CART
export const AddToCartSchema = z.object({
    productId: z.string(),
    user: z.string(),
    quantity: z.number(),
})
export const GetCartShema = z.object({
    user: z.string(),
})
export const RemoveFromCartShema = z.object({
    productId: z.string(),
    user: z.string(),
    quantity: z.number()
})


// ORDER
export const CreateOrderSchema = z.object({
    user: z.string(),
    email: z.string().email(),
    productId: z.string(),
    quantity: z.number(),
})
export const GetOrderShema = z.object({
    user: z.string(),
})
export const RemoveFromOrderShema = z.object({
    productId: z.string(),
    user: z.string(),
})
export const CreatePaymentSchema = z.object({
    user: z.string(),
    address: z.string(),
    comment: z.string(),
})

export const CreatePaidOrder = z.object({
    user: z.string(),
    totalPrice: z.number(),
    yookassaId: z.string(),
})