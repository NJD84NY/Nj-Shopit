import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from '../../redux/api/productsApi';
import Loader from '../layout/Loader';
import AdminLayout from '../layout/AdminLayout';

const ListProducts = () => {
  const { data, error, isLoading } = useGetAdminProductsQuery();

  const [
    deleteProduct,
    { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  ] = useDeleteProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success('Product Deleted');
    }
  }, [error, deleteError, isSuccess]);

  const deleteProductHandler = (id) => {
    deleteProduct(id);
  };

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Stock',
      selector: (row) => row.stock,
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
    data?.products?.map((product) => ({
      id: product?._id,
      name: `${product?.name?.substring(0, 20)}...`,
      stock: product?.stock,
      actions: (
        <>
          <Link
            to={`/admin/products/${product?._id}`}
            className='btn btn-outline-primary'
          >
            <i className='fa fa-pencil'></i>
          </Link>
          <Link
            to={`/admin/products/${product?._id}/upload_images`}
            className='btn btn-outline-success ms-2'
          >
            <i className='fa fa-image'></i>
          </Link>
          <button
            className='btn btn-outline-danger ms-2'
            onClick={() => deleteProductHandler(product?._id)}
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
      <DataTable
        title={`${data?.products?.length} Products`}
        columns={columns}
        data={rows}
        className='px-3'
        striped
        highlightOnHover
        pagination
      />
    </AdminLayout>
  );
};
export default ListProducts;
