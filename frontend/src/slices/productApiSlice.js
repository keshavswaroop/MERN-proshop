import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      keepUnusedDataFor: 5, // this is used to retrive the data from the cache. If the same data is queried within 5 seconds, we get the data feom the cache.
    }),
    getProductDetails: builder.query({
      query: (p_id) => ({
        url: ` ${PRODUCT_URL}/${p_id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productApiSlice; // here the name by which we call the builder (gere getProducts) gets prefixed with use and suffixed with Query
