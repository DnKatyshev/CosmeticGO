/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Swagger Petstore - OpenAPI 3.0
 * OpenAPI spec version: 1.0.11
 */
import { faker } from "@faker-js/faker";
import { HttpResponse, delay, http } from "msw";
import type { Product, SearchedProduct } from ".././products-model";

export const getGetAllOrFilteredProductsResponseMock = (): Product[] =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    availability: faker.helpers.arrayElement([
      faker.datatype.boolean(),
      undefined,
    ]),
    brand: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    category: faker.helpers.arrayElement([
      {
        id: faker.number.int({ min: undefined, max: undefined }),
        name: faker.word.sample(),
      },
      undefined,
    ]),
    country: faker.helpers.arrayElement([
      {
        id: faker.number.int({ min: undefined, max: undefined }),
        name: faker.word.sample(),
      },
      undefined,
    ]),
    description: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    discountCardPrice: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    ingredients: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    photos: faker.helpers.arrayElement([
      Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => faker.word.sample()),
      undefined,
    ]),
    price: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    product_id: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    rating: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    reviews: faker.helpers.arrayElement([
      Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => ({
        productId: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        rating: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        text: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        userId: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
      })),
      undefined,
    ]),
    vegan: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    weight: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
  }));

export const getGetOneProductResponseMock = (): SearchedProduct[] =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    discountCardPrice: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    name: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    photos: faker.helpers.arrayElement([
      Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => faker.word.sample()),
      undefined,
    ]),
  }));

export const getGetSearchedProductsResponseMock = (): Product[] =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    availability: faker.helpers.arrayElement([
      faker.datatype.boolean(),
      undefined,
    ]),
    brand: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    category: faker.helpers.arrayElement([
      {
        id: faker.number.int({ min: undefined, max: undefined }),
        name: faker.word.sample(),
      },
      undefined,
    ]),
    country: faker.helpers.arrayElement([
      {
        id: faker.number.int({ min: undefined, max: undefined }),
        name: faker.word.sample(),
      },
      undefined,
    ]),
    description: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    discountCardPrice: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    ingredients: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    photos: faker.helpers.arrayElement([
      Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => faker.word.sample()),
      undefined,
    ]),
    price: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    product_id: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    rating: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    reviews: faker.helpers.arrayElement([
      Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => ({
        productId: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        rating: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        text: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        userId: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
      })),
      undefined,
    ]),
    vegan: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    weight: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
  }));

export const getGetAllOrFilteredProductsMockHandler = (
  overrideResponse?:
    | Product[]
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<Product[]> | Product[]),
) => {
  return http.get("*/products/filter", async (info) => {
    await delay(1000);

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === "function"
            ? await overrideResponse(info)
            : overrideResponse
          : getGetAllOrFilteredProductsResponseMock(),
      ),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  });
};

export const getGetOneProductMockHandler = (
  overrideResponse?:
    | SearchedProduct[]
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<SearchedProduct[]> | SearchedProduct[]),
) => {
  return http.get("*/product/:productId", async (info) => {
    await delay(1000);

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === "function"
            ? await overrideResponse(info)
            : overrideResponse
          : getGetOneProductResponseMock(),
      ),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  });
};

export const getGetSearchedProductsMockHandler = (
  overrideResponse?:
    | Product[]
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<Product[]> | Product[]),
) => {
  return http.get("*/products-search", async (info) => {
    await delay(1000);

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === "function"
            ? await overrideResponse(info)
            : overrideResponse
          : getGetSearchedProductsResponseMock(),
      ),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  });
};
export const getProductsMock = () => [
  getGetAllOrFilteredProductsMockHandler(),
  getGetOneProductMockHandler(),
  getGetSearchedProductsMockHandler(),
];
