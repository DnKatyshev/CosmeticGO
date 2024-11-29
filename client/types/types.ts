import { z } from 'zod'


export const ProductsDataSchema = z.array(z.object({
    _id: z.string(),
    name: z.string(),
    price: z.number(),
    discountPrice: z.number(),
    category: z.object({
        name: z.string(),
        id: z.number()
    }),
    brand: z.string(),
    volume: z.number().optional(),
    weight: z.number().optional(),
    availability: z.boolean(),
    rating: z.number(),
    ingredients: z.string(),
    description: z.string(),
    vegan: z.boolean(),
    photos: z.array(z.string()),
    reviews: z.array(z.string()).optional(),
    country: z.object({
        name: z.string(),
        id: z.number()
    }).optional()
}))
export type TProductsData = z.infer<typeof ProductsDataSchema>


export const SearchedProductsSchema = z.array(z.object({
    _id: z.string(),
    name: z.string(),
    discountPrice: z.number(),
    photos: z.array(z.string()),
}))
export type TSearchedProductsSchema = z.infer<typeof SearchedProductsSchema>


export const ProfileSchema = z.object({
    username: z.string(),
    password: z.string().optional(),
    email: z.string().email(),
    address: z.string().optional(),
    image: z.string().optional(),

    verifyCode: z.string().optional(),
    verified: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    discountCard: z.boolean(),
    role: z.enum(['user', 'admin']),
    reviews: z.array(z.string()).optional(),
})
export type TProfileSchema = z.infer<typeof ProfileSchema>


export const UserReviewSchema = z.object({
    product_id: z.object({
        _id: z.string(),
        name: z.string(),
        price: z.number(),
        discountPrice: z.number(),
        category: z.object({
            name: z.string(),
            id: z.number()
        }),
        brand: z.string(),
        volume: z.number().optional(),
        weight: z.number().optional(),
        availability: z.boolean(),
        rating: z.number(),
        ingredients: z.string(),
        description: z.string(),
        vegan: z.boolean(),
        photos: z.array(z.string()),
        reviews: z.array(z.string()).optional(),
        country: z.object({
            name: z.string(),
            id: z.number()
        }).optional()
    }),
    username: z.string(),
    text: z.string(),
    rating: z.number(),
})
export type TUserReviewSchema = z.infer<typeof UserReviewSchema>


// YOOKASSA-PAYMENT
export interface PaymentData {
    id: string;
    status: string;
    amount: Amount;
    description: string;
    recipient: Recipient;
    created_at: string;
    confirmation: Confirmation;
    test: boolean;
    paid: boolean;
    refundable: boolean;
    metadata: Metadata;
  }
  
  export interface Amount {
    value: string;
    currency: string;
  }
  
  export interface Recipient {
    account_id: string;
    gateway_id: string;
  }
  
  export interface Confirmation {
    type: string;
    confirmation_url: string;
  }
  
  export interface Metadata {
    order_id: string;
  }
  
  export type PaymentCallbackData = {
    type: string;
    event: string;
    object: {
      id: string;
      status: string;
      amount: { value: string; currency: 'RUB' };
      income_amount: { value: string; currency: 'RUB' };
      description: string;
      recipient: { account_id: string; gateway_id: string };
      payment_method: {
        type: string;
        id: string;
        saved: boolean;
        title: string;
      };
      captured_at: string;
      created_at: string;
      test: boolean;
      refunded_amount: { value: string; currency: 'RUB' };
      paid: boolean;
      refundable: true;
      metadata: { order_id: string };
      authorization_details: {
        rrn: string;
        auth_code: string;
      };
    };
  };