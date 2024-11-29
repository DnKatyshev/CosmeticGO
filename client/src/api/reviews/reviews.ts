/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Swagger Petstore - OpenAPI 3.0
 * OpenAPI spec version: 1.0.11
 */
import { useMutation } from "@tanstack/react-query";
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import type { Review } from ".././products-model";

/**
 * Create a new review by product
 * @summary Create a new review
 */
export type createReviewResponse = {
  data: void;
  status: number;
};

export const getCreateReviewUrl = () => {
  return `http://localhost:8000/server-side/create-review`;
};

export const createReview = async (
  review: Review,
  options?: RequestInit,
): Promise<createReviewResponse> => {
  const res = await fetch(getCreateReviewUrl(), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(review),
  });
  const data = await res.json();

  return { status: res.status, data };
};

export const getCreateReviewMutationOptions = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createReview>>,
    TError,
    { data: Review },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationOptions<
  Awaited<ReturnType<typeof createReview>>,
  TError,
  { data: Review },
  TContext
> => {
  const { mutation: mutationOptions, fetch: fetchOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof createReview>>,
    { data: Review }
  > = (props) => {
    const { data } = props ?? {};

    return createReview(data, fetchOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type CreateReviewMutationResult = NonNullable<
  Awaited<ReturnType<typeof createReview>>
>;
export type CreateReviewMutationBody = Review;
export type CreateReviewMutationError = void;

/**
 * @summary Create a new review
 */
export const useCreateReview = <TError = void, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createReview>>,
    TError,
    { data: Review },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationResult<
  Awaited<ReturnType<typeof createReview>>,
  TError,
  { data: Review },
  TContext
> => {
  const mutationOptions = getCreateReviewMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Get all reviews for 1 product by product's "reviews"-field (array of IDs)
 * @summary Get all reviews
 */
export type getReviewsResponse = {
  data: Review[];
  status: number;
};

export const getGetReviewsUrl = () => {
  return `http://localhost:8000/server-side/get-reviews`;
};

export const getReviews = async (
  getReviewsBody: string[],
  options?: RequestInit,
): Promise<getReviewsResponse> => {
  const res = await fetch(getGetReviewsUrl(), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(getReviewsBody),
  });
  const data = await res.json();

  return { status: res.status, data };
};

export const getGetReviewsMutationOptions = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof getReviews>>,
    TError,
    { data: string[] },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationOptions<
  Awaited<ReturnType<typeof getReviews>>,
  TError,
  { data: string[] },
  TContext
> => {
  const { mutation: mutationOptions, fetch: fetchOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof getReviews>>,
    { data: string[] }
  > = (props) => {
    const { data } = props ?? {};

    return getReviews(data, fetchOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type GetReviewsMutationResult = NonNullable<
  Awaited<ReturnType<typeof getReviews>>
>;
export type GetReviewsMutationBody = string[];
export type GetReviewsMutationError = void;

/**
 * @summary Get all reviews
 */
export const useGetReviews = <TError = void, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof getReviews>>,
    TError,
    { data: string[] },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationResult<
  Awaited<ReturnType<typeof getReviews>>,
  TError,
  { data: string[] },
  TContext
> => {
  const mutationOptions = getGetReviewsMutationOptions(options);

  return useMutation(mutationOptions);
};
