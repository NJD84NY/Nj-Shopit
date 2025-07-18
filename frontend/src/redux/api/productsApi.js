import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/nj1' }),
  tagTypes: ['Product', 'AdminProducts', 'Reviews'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        // we can return STRING just like '/products' instead of this OBJECT
        url: '/products',
        params: {
          page: params?.page,
          keyword: params?.keyword,
          category: params?.category,
          'price[gte]': params.min,
          'price[lte]': params.max,
          'ratings[gte]': params?.ratings,
        },
      }),
    }),
    getProductDetails: builder.query({
      query: (id) => `/products/${id}`, // return String like this(what i said above)
      providesTags: ['Product'],
    }),
    submitReview: builder.mutation({
      query(body) {
        return {
          url: '/reviews',
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Product'],
    }),
    canUserReview: builder.query({
      query: (productId) => `/can_review/?productId=${productId}`,
    }),
    getAdminProducts: builder.query({
      query: () => '/admin/products',
      providesTags: ['AdminProducts'],
    }),
    createProduct: builder.mutation({
      query(body) {
        return {
          url: '/admin/products',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['AdminProducts'],
    }),
    updateProduct: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['AdminProducts', 'Product'],
    }),
    uploadProductImages: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}/upload_images`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Product'],
    }),
    deleteProductImage: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}/delete_image`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query(id) {
        return {
          url: `/admin/products/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['AdminProducts'],
    }),
    getProductReviews: builder.query({
      query: (productId) => `/reviews?id=${productId}`,
      providesTags: ['Reviews'],
    }),
    deleteReview: builder.mutation({
      query({ productId, id }) {
        return {
          url: `/admin/reviews?productId=${productId}&id=${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Reviews'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useSubmitReviewMutation,
  useCanUserReviewQuery,
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImagesMutation,
  useDeleteProductImageMutation,
  useDeleteProductMutation,
  useLazyGetProductReviewsQuery,
  useDeleteReviewMutation,
} = productApi;
