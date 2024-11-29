import Product from "../model/productModel"
import {TProductQueryParams} from "../types/types"

class ProductService{

    async getAllProductsByCategories(){
        return await Product.find().sort({
            'category.id': 1 // поиск по ВЛОЖЕННЫМ полям должна использовать точечную нотацию(dot notation)
        })
    }

    async getFilteredProducts(params :TProductQueryParams){

        const {minPrice, maxPrice, countryId, vegan, sort} = params
        console.log('PARAMS: ', params)


        const queryParamsObj:TProductQueryParams = {}
        

        if(vegan === 'true'){
            queryParamsObj.vegan = true
        }
        if(countryId){
            queryParamsObj['country.id'] = { $in: countryId.split(',').map(Number) }; // поиск по любому значению из массива (приходит строка, тут делаем из неё массив)
        }
        if(minPrice && maxPrice){
            queryParamsObj.price = {
                $gte: Number(minPrice),
                $lte: Number(maxPrice)
            };
        }

        console.log('queryParamsObj: ', queryParamsObj)

        if(sort === 'increase'){
            return await Product.aggregate([
                { $match: queryParamsObj },
                { $sort: { 'category.id': 1, price: 1 } }
            ]);
        }
        if(sort === 'decrease'){
            return await Product.aggregate([
                { $match: queryParamsObj },
                { $sort: { 'category.id': 1, price: -1 } }
            ]);
        }
        if(sort === 'categories'){
            return await Product.find(queryParamsObj).sort({
                'category.id': 1
            })
        }

        return await Product.find(queryParamsObj).sort({
            'category.id': 1
        })
    }


    async getOneProduct(id:string){
        return await Product.find({
            _id: id
        })
    }


    async getSearchedProducts(inputText:string){
        
        const regex = new RegExp(inputText, 'i'); // регулярка, которая позволяет искать подстроки независимо от регистра

        // Поиск товаров по одному из указанных полей
        return await Product.find({
            $or: [
                { name: regex },
                { 'category.name': regex },
                { brand: regex }
            ]
        }).select('_id name discountPrice photos');
    }


    // async getPriceRangeFilteredProducts(min:string, max:string){
    //     return await Product.find({
    //         price: {$gte: Number(min), $lte: Number(max)}
    //     })
    // }

    // async getProductsFilteredByDecreasingPrice(){
    //     return await Product.find().sort({price: -1})
    // }

    // async getProductsFilteredByVegan(){
    //     return await Product.find({
    //         vegan: true
    //     })
    // }
    
    // async getProductsFilteredByCountry(countryId:string){
    //     return await Product.find({
    //         'country.id': countryId
    //     })
    // }

}

export default new ProductService();