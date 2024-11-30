import Product from "../model/productModel";
import { TProductQueryParams } from "../types/types";

class ProductService {
  // Получение всех продуктов с сортировкой по категориям
  async getAllProductsByCategories() {
    return await Product.find().sort({
      "category.id": 1, // Используем dot notation
    });
  }

  // Фильтрация продуктов
  async getFilteredProducts(params: TProductQueryParams) {
    const { minPrice, maxPrice, countryId, vegan, sort } = params;

    console.log("PARAMS: ", params);

    const queryParamsObj: Record<string, any> = {};

    // Исправление: Проверка на boolean | undefined
    if (vegan === true) {
      queryParamsObj.vegan = true;
    }

    // Исправление: Правильное имя поля (countryId вместо country.id)
    if (countryId) {
      if (typeof countryId === "string") {
        queryParamsObj["country.id"] = { $in: countryId.split(",").map(Number) }; // Преобразование строки в массив чисел
      } else {
        throw new Error("Invalid countryId format");
      }
    }

    // Проверка minPrice и maxPrice
    if (minPrice !== undefined && maxPrice !== undefined) {
      queryParamsObj.price = {
        $gte: Number(minPrice),
        $lte: Number(maxPrice),
      };
    }

    console.log("queryParamsObj: ", queryParamsObj);

    // Обработка сортировки
    if (sort === "increase") {
      return await Product.aggregate([
        { $match: queryParamsObj },
        { $sort: { "category.id": 1, price: 1 } },
      ]);
    }
    if (sort === "decrease") {
      return await Product.aggregate([
        { $match: queryParamsObj },
        { $sort: { "category.id": 1, price: -1 } },
      ]);
    }
    if (sort === "categories") {
      return await Product.find(queryParamsObj).sort({
        "category.id": 1,
      });
    }

    // Сортировка по умолчанию
    return await Product.find(queryParamsObj).sort({
      "category.id": 1,
    });
  }

  // Получение одного продукта по ID
  async getOneProduct(id: string) {
    return await Product.findById(id); // Используем findById вместо find для уникальных идентификаторов
  }

  // Поиск продуктов
  async getSearchedProducts(inputText: string) {
    const regex = new RegExp(inputText, "i"); // Регулярка для поиска независимо от регистра

    return await Product.find({
      $or: [
        { name: regex },
        { "category.name": regex },
        { brand: regex },
      ],
    }).select("_id name discountPrice photos");
  }
}

export default new ProductService();
