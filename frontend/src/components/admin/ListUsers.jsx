import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import Loader from '../layout/Loader';
import AdminLayout from '../layout/AdminLayout';
import {
  useDeleteUserMutation,
  useGetAdminUsersQuery,
} from '../../redux/api/userApi';

const ListUsers = () => {
  const { data, error, isLoading } = useGetAdminUsersQuery();

  const [
    deleteUser,
    { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success('User Deleted');
    }
  }, [error, deleteError, isSuccess]);

  const deleteUserHandler = (id) => {
    deleteUser(id);
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
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Role',
      selector: (row) => row.role,
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
    data?.users?.map((user) => ({
      id: user?._id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
      actions: (
        <>
          <Link
            to={`/admin/users/${user?._id}`}
            className='btn btn-outline-primary'
          >
            <i className='fa fa-pencil'></i>
          </Link>

          <button
            className='btn btn-outline-danger ms-2'
            onClick={() => deleteUserHandler(user?._id)}
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
        title={`${data?.users?.length} Users`}
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
export default ListUsers;
