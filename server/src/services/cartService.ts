import Cart from "../model/cartModel";
import {TAddToCart, TGetCart, TRemoveFromCart} from "../types/types"

class CartService{

    async addToCart(cartData:TAddToCart){

        const {productId, user, quantity} = cartData

        // Проверяем - существует ли такая корзина User-a, если нет - создаём
        let cart = await Cart.findOneAndUpdate(
            { user },
            { updatedAt: Date.now() },
            { new: true }
        )
        if(!cart){
            const cartOptions = {
                user,
                products: [],
                totalPrice: 0
            }
            cart = await new Cart(cartOptions).save(); // Сохраняем новый объект корзины в БД      
        }

        // Проверяем - есть ли товар уже в корзине
        const productIndex = cart.products.findIndex((item:any) => item.product.toString() === productId);

        // Если ЕСТЬ - просто увеличваем его кол-во, если ещё НЕТ - добавляем новый товар в корзину
        if (productIndex !== -1) {
            console.log('Товар уже есть в корзине!')
            await Cart.findOneAndUpdate(
                { user, "products.product": productId },
                { $inc: { "products.$.quantity": quantity } },
                { new: true }
            );

        } else {
            console.log('Это новый товар!')
            await Cart.findOneAndUpdate(
                { user },
                { $push: { products: { product: productId, quantity } } },
                { new: true }
            );
        }

        // Получаем актуальную корзину из БД после обновлений ( с данными о products через их id-шники )
        cart = await Cart.findOne({ user }).populate('products.product');

        if (!cart) {
            throw new Error('Cart not found');
        }

        // Рассчитываем общую стоимость и записываем в корзину
        const totalPrice = cart.products.reduce((total:number, item:any) => {
            const productPrice = item.product.price; // Получаем price из документов Product
            return total + productPrice * item.quantity;
        }, 0);

        console.log('TOTAL-price: ', totalPrice)

        await Cart.findOneAndUpdate(
            { user },
            { totalPrice },
            { new: true }
        )

        if (!cart) {
            throw new Error('Cart not found');
        }
        //@ts-expect-error
        cart?.totalPrice = totalPrice

        return await cart.save()
    }


    async getCart(data:TGetCart){

        const {user} = data

        return await Cart.findOne({user}).populate('products.product')
    }


    async removeFromCart(data:TRemoveFromCart){

        const {productId, user, quantity} = data

        let cart:any;
        cart = await Cart.findOneAndUpdate(
            { user },
            { updatedAt: Date.now() },
            { new: true }
        )

        const productIndex = cart.products.findIndex((item:any) => item.product.toString() === productId);
        const isQuantityEquelsOne = cart.products[productIndex].quantity === 1
        const productQuantity = cart.products[productIndex].quantity

        // Удаление ОДНОГО элемента по кнопке, когда quantity элемента = 1 - удаляем документ с этим элементом из БД
        if(isQuantityEquelsOne && quantity === -1){
            cart = await Cart.findOneAndUpdate(
                { user, "products.product": productId },
                { $pull: { "products": { product: productId } } },
                { new: true }
            );
            console.log('Удаление ОДНОГО элемента по кнопке, когда quantity элемента = 1 - удаляем документ с этим элементом из БД')
        }

        // Удаление элементов ПОЛНОСТЬЮ
        else if(quantity === productQuantity){
            cart = await Cart.findOneAndUpdate(
                { user, "products.product": productId },
                { $pull: { "products": { product: productId } } },
                { new: true }
            );
            console.log('Удаление элементов ПОЛНОСТЬЮ')
        }

        // Удаление ОДНОГО элемента по кнопке, когда quantity элемента > 1 - просто уменьшаем quantity документа на 1
        else {
            cart = await Cart.findOneAndUpdate(
                { user, "products.product": productId },
                { $inc: { "products.$.quantity": quantity } },
                { new: true }
            );
            console.log('Удаление ОДНОГО элемента по кнопке, когда quantity элемента > 1 - просто уменьшаем quantity документа на 1')
        }

        cart = await Cart.findOne({ user }).populate('products.product');
        
        const totalPrice = cart.products.reduce((total:number, item:any) => {
            const productPrice = item.product.price; // Получаем новый totalPrice после удаления продуктов
            return total + productPrice * item.quantity;
        }, 0);
        console.log('totalPrice: ', totalPrice)
        cart = await Cart.findOneAndUpdate(
            { user },
            { totalPrice },
            { new: true }
        )
        console.log('CARTremoveFromCart: ', cart, totalPrice)


        return await cart.save()
    }

}

export default new CartService();