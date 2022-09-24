import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useGetUsersQuery } from "../app/services/usersApi";
import CustomModal from "../components/controls/CustomModal";
import DashboardLayout from "../layouts/DashboardLayout";
import { userColumns } from "../table/columns/userColumns";
import Tables from "../table/tables/Tables";
import AddUser from "./additional-pages/AddUser";

const Users = () => {
  // States
  const [open, setOpen] = useState(false);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sort = 1;

  // Redux element
  const { userInfo } = useSelector((state) => state.auth);

  const pathname =
    userInfo?.users?.role === "admin"
      ? `user/all?sort=${sort}&page=${pageIndex}&limit=${pageSize}`
      : `user?sort=${sort}&page=${pageIndex}&limit=${pageSize}`;
  const { isLoading, isError, error, data: usersData } = useGetUsersQuery(
    pathname
  );

  // console.log(usersData);

  // table elements
  const columns = useMemo(() => userColumns, []);
  const pagination = useMemo(() => ({ pageIndex, pageSize }), [
    pageIndex,
    pageSize,
  ]);
  const data = useMemo(() => (usersData ? usersData?.users : []), [usersData]);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: pagination,
      columnVisibility:
        userInfo?.users?.role === "admin"
          ? { phone: false }
          : {
              phone: true,
              companyName: false,
              companyPhone: false,
              approved: false,
            },
    },
    pageCount: Math.ceil(usersData?.totalUser / pageSize) ?? 1,
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DashboardLayout>
      {/* Table */}
      <Tables
        table={table}
        title="User list"
        isButton={true}
        btnText="Add User"
        setOpen={setOpen}
        loading={isLoading}
        isError={isError}
        error={error}
        isDisabled={userInfo?.users?.role === "admin" && true}
      />

      {/* Others */}
      <CustomModal open={open} onClose={setOpen}>
        <AddUser setOpen={setOpen} />
      </CustomModal>
    </DashboardLayout>
  );
};

export default Users;
