import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DataTable from 'react-data-table-component';

import AdminLayout from '../layout/AdminLayout';
import {
  useDeleteReviewMutation,
  useLazyGetProductReviewsQuery,
} from '../../redux/api/productsApi';
import Loader from '../layout/Loader';

const ProductReviews = () => {
  const [productId, setProductId] = useState('');

  const [getProductReviews, { data, isLoading, error }] =
    useLazyGetProductReviewsQuery();

  const [
    deleteReview,
    { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  ] = useDeleteReviewMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success('Rreview Deleted');
    }
  }, [error, deleteError, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    getProductReviews(productId);
  };

  const deleteReviewHandler = (id) => {
    deleteReview({ productId, id });
  };

  const columns = [
    {
      name: 'Review ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Rating',
      selector: (row) => row.rating,
      sortable: true,
    },
    {
      name: 'Comment',
      selector: (row) => row.comment,
      sortable: true,
    },
    {
      name: 'User',
      selector: (row) => row.user,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => row.actions,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const rows =
    data?.reviews?.map((review) => ({
      id: review?._id,
      rating: review?.rating,
      comment: review?.comment,
      user: review?.user?.name,
      actions: (
        <>
          <button
            className='btn btn-outline-danger ms-2'
            onClick={() => deleteReviewHandler(review?._id)}
            disabled={isDeleteLoading}
          >
            <i className='fa fa-trash'></i>
          </button>
        </>
      ),
    })) || [];

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <div className='row justify-content-center my-5'>
        <div className='col-6'>
          <form onSubmit={submitHandler}>
            <div className='mb-3'>
              <label htmlFor='productId_field' className='form-label'>
                Enter Product ID
              </label>
              <input
                type='text'
                id='productId_field'
                className='form-control'
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <button
              id='search_button'
              type='submit'
              className='btn btn-primary w-100 py-2'
            >
              SEARCH
            </button>
          </form>
        </div>
      </div>
      {data?.reviews?.length > 0 ? (
        <DataTable
          title={`${data?.reviews?.length} Review(s)`}
          columns={columns}
          data={rows}
          className='px-3'
          striped
          highlightOnHover
          pagination
        />
      ) : (
        <p className='mt-5 text-center'>No Reviews</p>
      )}
    </AdminLayout>
  );
};
export default ProductReviews;
