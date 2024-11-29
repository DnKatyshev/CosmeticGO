/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Swagger Petstore - OpenAPI 3.0
 * OpenAPI spec version: 1.0.11
 */
import { faker } from "@faker-js/faker";
import { HttpResponse, delay, http } from "msw";
import type { Review } from ".././products-model";

export const getGetReviewsResponseMock = (): Review[] =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    product_id: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    rating: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    text: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    user_id: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    username: faker.helpers.arrayElement([faker.word.sample(), undefined]),
  }));

export const getCreateReviewMockHandler = (
  overrideResponse?:
    | void
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<void> | void),
) => {
  return http.post("*/create-review", async (info) => {
    await delay(1000);
    if (typeof overrideResponse === "function") {
      await overrideResponse(info);
    }
    return new HttpResponse(null, { status: 200 });
  });
};

export const getGetReviewsMockHandler = (
  overrideResponse?:
    | Review[]
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<Review[]> | Review[]),
) => {
  return http.post("*/get-reviews", async (info) => {
    await delay(1000);

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === "function"
            ? await overrideResponse(info)
            : overrideResponse
          : getGetReviewsResponseMock(),
      ),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  });
};
export const getReviewsMock = () => [
  getCreateReviewMockHandler(),
  getGetReviewsMockHandler(),
];
