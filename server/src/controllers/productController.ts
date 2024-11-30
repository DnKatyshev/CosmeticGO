// Libraries
import { Request, Response } from "express";

// Services
import ProductService from "../services/productService";

// Types
import {ProductQueryParamsShema, OneProductIdShema, CatalogInputTextShema} from "../types/ZodSchemas";


class ProductController{

    async getAllProductsOrFilteredProducts(req:Request, res:Response) {
        try {
            // Делаем валидацию в runtime через ZOD
            if(ProductQueryParamsShema.safeParse(req.query).success){
    
                const result = await ProductService.getFilteredProducts(req.query)
                res.status(200).json({
                    result
                });

            } else{
                const result = await ProductService.getAllProductsByCategories()
                res.status(200).json({
                    result
                });
            }

        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

    async getOneProduct(req:Request, res:Response) {
        try {
            const {productId} = req.params
            // Делаем валидацию в runtime через ZOD
            if(OneProductIdShema.safeParse(productId).success){
    
                const result = await ProductService.getOneProduct(productId)
                res.status(200).json({
                    result
                });

            } else{
                res.status(400).json({ message: 'Invalid Product-ID!' });
            }

        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

    async getSearchedProducts(req:Request, res:Response) {
        try {
            const {inputText} = req.query  

            if(inputText === ''){
                const result = await ProductService.getSearchedProducts('Консиллеры')
                res.status(200).json({
                    result
                });
            } else {
                // Делаем валидацию в runtime через ZOD
                if(typeof inputText === 'string' && CatalogInputTextShema.safeParse(inputText).success){
        
                    const result = await ProductService.getSearchedProducts(inputText)
                    res.status(200).json({
                        result
                    });
    
                } else{
                    res.status(400).json({ message: 'Invalid Product-ID!' });
                }
            }
        

        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

}

export default new ProductController();