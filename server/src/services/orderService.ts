import Order from "../model/orderModel"
import PaidOrder from "../model/paidOrderModel"
import Cart from "../model/cartModel"
import Product from "../model/productModel"
import { TCreateOrder, TGetOrder, TRemoveFromOrder, TCreatePayment, TCreatePaidOrder } from "../types/types"

class OrderService{

    async createOrder(orderData:TCreateOrder){

        const {user, email, productId, quantity} = orderData

        // Проверяем - существует ли ЗАКАЗ, если нет - создаём
        let order = await Order.findOneAndUpdate(
            { user },
            { updatedAt: Date.now() },
            { new: true }
        )
        if(!order){
            const orderOptions = {
                user,
                email,
                products: [],
                totalPrice: 0,
                status: 'PRE-PENDING'
            }
            order = await new Order(orderOptions).save(); // Сохраняем новый объект корзины в БД      
        }

        // Проверяем - есть ли товар уже в ЗАКАЗЕ
        const productIndex = order.products.findIndex((item: any) => item.product.toString() === productId);

        // Если ЕСТЬ - просто увеличваем его кол-во, если ещё НЕТ - добавляем новый товар в ЗАКАЗ
        if (productIndex !== -1) {
            console.log('Товар уже был добавлен в ЗАКАЗ!')
            await Order.findOneAndUpdate(
                { user, "products.product": productId },
                { $inc: { "products.$.quantity": quantity } },
                { new: true }
            );

        } else {
            console.log('Добавляем новый товар в заказ!')
            await Order.findOneAndUpdate(
                { user },
                { $push: { products: { product: productId, quantity } } },
                { new: true }
            );
        }

        // Получаем актуальную корзину из БД после обновлений ( с данными о products через их id-шники )
        order = await Order.findOne({ user }).populate('products.product');

        if (!order) {
            throw new Error('Order not found');
        }

        // Рассчитываем общую стоимость и записываем в корзину
        const totalPrice = order.products.reduce((total:number, item:any) => {
            const productPrice = item.product.price; // Получаем price из документов Product
            return total + productPrice * item.quantity;
        }, 0);

        console.log('TOTAL-price: ', totalPrice)

        await Order.findOneAndUpdate(
            { user },
            { totalPrice },
            { new: true }
        )

        if (!order) {
            throw new Error('Order not found');
        }
        order.totalPrice = totalPrice

        return await order.save()
    }


    async getOrder(data:TGetOrder){

        const {user} = data

        return await Order.findOne({user}).populate('products.product')
    }


    async removeFromOrder(data:TRemoveFromOrder){

        const {user, productId} = data

        let order:any;

        order = await Order.findOneAndUpdate(
            { user, "products.product": productId },
            { $pull: { "products": { product: productId } }, updatedAt: Date.now() },
            { new: true }
        );
        console.log('Удаление товара из ЗАКАЗА')

        if (order.products.length === 0) {
            await Order.findOneAndUpdate(
                { user },
                { status: "EMPTY-ORDER" },
                { new: true }
            );
        }

        // Вичисляем totalPrice
        order = await Order.findOne({ user }).populate('products.product');
        
        const totalPrice = order.products.reduce((total:number, item:any) => {
            const productPrice = item.product.price; // Получаем новый totalPrice после удаления продуктов
            return total + productPrice * item.quantity;
        }, 0);
        console.log('totalPrice: ', totalPrice)
        order = await Order.findOneAndUpdate(
            { user },
            { totalPrice },
            { new: true }
        )

        return await order.save()
    }


    async createPayment(data:TCreatePayment){

        const {user, address, comment} = data
        const order = await Order.findOneAndUpdate(
            { user },
            { status: "PENDING", address, comment, updatedAt: Date.now() },
            { new: true }
        );

        if (!order) {
            throw new Error('Order not found');
        }
        
        return await order.save()
    }


    async createPaidOrder(paidOrderData: TCreatePaidOrder) {
        const { user, totalPrice, yookassaId } = paidOrderData;
    
        // Найти пользователя в Cart и Order, извлечь продукты
        const cart = await Cart.findOne({ user });
        const order = await Order.findOneAndUpdate(
            { user },
            { status: "SUCCESS" },
            { new: true }
        );
    
        if (!cart || !order) {
            throw new Error('Не найдены данные корзины или заказа');
        }

        
        // Очистить массив products/totalPrice в Cart и Order
        await Cart.updateOne(
            { user }, 
            { 
                $set: { products: [] }, 
                $inc: { totalPrice: -totalPrice }, 
            }

        );
        await Order.updateOne(
            { user }, 
            { 
                $set: { products: [] }, 
                $inc: { totalPrice: -totalPrice }, 
            }

        );

        
        // Добавить данные в PaidOrder
        const orderProducts = order.products;

        const newOrder = orderProducts.map((product) => ({
            product: product.product,
            quantity: product.quantity,
        }));
    
        let paidOrder:any;
        paidOrder = await PaidOrder.findOneAndUpdate(
            { user },
            {
                $push: { products: newOrder }, // Добавляем новый массив как отдельный заказ
                $set: { paymentId: yookassaId }, // Обновляем общую цену и ID платежа},
                $inc: { totalPrice }, 
            },
            { new: true }
        );
    
        if (!paidOrder) {
            // Если документ не найден, создаем новый
            paidOrder = new PaidOrder({
                user,
                totalPrice,
                paymentId: yookassaId,
                products: [newOrder], // Создаем новый массив продуктов
            });
            await paidOrder.save();
        }


        console.log('===PaidOrder:=== ', paidOrder.products[0][0])

    
        return paidOrder;
    }


    async getPaidOrder(data: TGetOrder) {

        const { user } = data;
    
        // Находим заказ по пользователю
        const paidOrder: any = await PaidOrder.findOne({ user }).lean();
    
        // Заполняем информацию о продуктах
        paidOrder.products = await Promise.all(
            paidOrder.products.map(async (order: any[]) => {
                return Promise.all(
                    order.map(async (item) => {
                        const productDetails = await Product.findById(item.product).lean();
                        return { ...item, product: productDetails };
                    })
                );
            })
        );
    
        return paidOrder;
    }
    
    
    

}

export default new OrderService();