// Node
import { Request, Response } from "express";

// Services
import CartService from "../services/cartService";

// Types
import { AddToCartSchema, GetCartShema, RemoveFromCartShema } from "../types/ZodSchemas";


class CartController{

    async addToCart(req:Request, res:Response) {
        try {
            // Делаем валидацию в runtime через ZOD
            console.log('CartDATA: ', req.body)
            if(AddToCartSchema.safeParse(req.body).success){

    
                const result = await CartService.addToCart(req.body)
                res.status(200).json({message: 'Товар успешно добавлен в корзину!', result});

            } else{
                res.status(400).json({ message: 'Invalid addToCart-object!' });
            }
        }

        catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

    async getCart(req:Request, res:Response) {
        try {
            // Делаем валидацию в runtime через ZOD
            if(GetCartShema.safeParse(req.body).success){
    
                const result = await CartService.getCart(req.body)
                res.status(200).json({message: 'Товары успешно получены из корзины!', result});

            } else{
                res.status(400).json({ message: 'Invalid get-cart string!' });
            }

        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

    async removeFromCart(req:Request, res:Response) {
        try {
            // Делаем валидацию в runtime через ZOD
            if(RemoveFromCartShema.safeParse(req.body).success){
    
                const result = await CartService.removeFromCart(req.body)
                res.status(200).json({message: 'Товар успешно удалён из корзины!', result});

            } else{
                res.status(400).json({ message: 'Invalid remove-cart object!' });
            }

        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

}

export default new CartController();