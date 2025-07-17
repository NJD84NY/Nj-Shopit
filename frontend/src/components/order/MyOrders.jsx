import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';

import { useMyOrdersQuery } from '../../redux/api/orderApi';
import Loader from '../layout/Loader';
import { clearCart } from '../../redux/features/cartSlice';

const MyOrders = () => {
  const { data, error, isLoading } = useMyOrdersQuery();

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderSuccess = searchParams.get('order_success');

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (orderSuccess) {
      dispatch(clearCart());
      navigate('/me/orders');
    }
  }, [error, orderSuccess]);

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: 'Payment Status',
      selector: (row) => row.status,
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
      amount: `$${order?.totalPrice}`,
      status: order?.paymentInfo?.status?.toUpperCase(),
      orderStatus: order?.orderStatus,
      actions: (
        <>
          <Link to={`/me/order/${order?._id}`} className='btn btn-primary'>
            <i className='fa fa-eye'></i>
          </Link>
          <Link
            to={`/invoice/order/${order?._id}`}
            className='btn btn-success ms-2'
          >
            <i className='fa fa-print'></i>
          </Link>
        </>
      ),
    })) || [];

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1 className='my-5'>{data?.orders?.length} orders</h1>
      <DataTable
        columns={columns}
        data={rows}
        className='px-3'
        striped
        highlightOnHover
        pagination
      />
    </div>
  );
};
export default MyOrders;
