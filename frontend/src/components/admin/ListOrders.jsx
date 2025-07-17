import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import Loader from '../layout/Loader';
import AdminLayout from '../layout/AdminLayout';
import {
  useDeleteOrderMutation,
  useGetAdminOrdersQuery,
} from '../../redux/api/orderApi';

const ListOrders = () => {
  const { data, error, isLoading } = useGetAdminOrdersQuery();

  const [
    deleteOrder,
    { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  ] = useDeleteOrderMutation();

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

  const deleteOrderHandler = (id) => {
    deleteOrder(id);
  };

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Payment Status',
      selector: (row) => row.paymentStatus,
      sortable: true,
    },
    {
      name: 'Order Status',
      selector: (row) => row.orderStatus,
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
    data?.orders?.map((order) => ({
      id: order?._id,
      paymentStatus: order?.paymentInfo?.status.toUpperCase(),
      orderStatus: order?.orderStatus,
      actions: (
        <>
          <Link
            to={`/admin/orders/${order?._id}`}
            className='btn btn-outline-primary'
          >
            <i className='fa fa-pencil'></i>
          </Link>

          <button
            className='btn btn-outline-danger ms-2'
            onClick={() => deleteOrderHandler(order?._id)}
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
        title={`${data?.orders?.length} Orders`}
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
export default ListOrders;
