// Node
import { Request, Response } from "express";

// Services
import OrderService from "../services/orderService";

// Types
import { CreateOrderSchema, GetOrderShema, RemoveFromOrderShema, CreatePaymentSchema, CreatePaidOrder } from "../types/ZodSchemas";


class OrderController{

    async createOrder(req:Request, res:Response) {
        try {
            // Делаем валидацию в runtime через ZOD
            console.log('OrderDATA: ', req.body)
            if(CreateOrderSchema.safeParse(req.body).success){

                const result = await OrderService.createOrder(req.body)
                res.status(200).json({message: 'Товар успешно добавлен в заказ!', result});

            } else{
                res.status(400).json({ message: 'Invalid createOrder-object!' });
            }
        }

        catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

    async getOrder(req:Request, res:Response) {
        try {
            // Делаем валидацию в runtime через ZOD
            if(GetOrderShema.safeParse(req.body).success){
    
                const result = await OrderService.getOrder(req.body)
                res.status(200).json({message: 'Товары успешно получены из заказа!', result});

            } else{
                res.status(400).json({ message: 'Invalid getOrder string!' });
            }

        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

    async removeFromOrder(req:Request, res:Response) {
        try {
            // Делаем валидацию в runtime через ZOD
            if(RemoveFromOrderShema.safeParse(req.body).success){
    
                const result = await OrderService.removeFromOrder(req.body)
                res.status(200).json({message: 'Товар успешно удалён из заказа!', result});

            } else{
                res.status(400).json({ message: 'Invalid removeOrder object!' });
            }

        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

    async createPayment(req:Request, res:Response) {
        try {
            // Делаем валидацию в runtime через ZOD
            if(CreatePaymentSchema.safeParse(req.body).success){
    
                const result = await OrderService.createPayment(req.body)
                res.status(200).json({message: 'Доп.данные для оплаты переданы УСПЕШНО!', result});

            } else{
                res.status(400).json({ message: 'Invalid createPayment object!' });
            }

        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }


    async createPaidOrder(req:Request, res:Response) {
        try {
            // Делаем валидацию в runtime через ZOD
            console.log('PaidOrderDATA: ', req.body)
            if(CreatePaidOrder.safeParse(req.body).success){

                const result = await OrderService.createPaidOrder(req.body)
                res.status(200).json({message: '--- Заказ успешно оплачен и добавлен в ОПЛАЧЕННЫЕ ЗАКАЗЫ! ---', result});

            } else{
                res.status(400).json({ message: 'Invalid createPaidOrder-object!' });
            }
        }

        catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

    async getPaidOrder(req:Request, res:Response) {
        try {
            // Делаем валидацию в runtime через ZOD
            if(GetOrderShema.safeParse(req.body).success){

                const result = await OrderService.getPaidOrder(req.body)
                res.status(200).json({message: '--- Товары успешно получены из ОПЛАЧЕННЫХ ЗАКАЗОВ! ---', result});

            } else{
                res.status(400).json({ message: 'Invalid getPaidOrder-string!' });
            }
        }

        catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

}

export default new OrderController();