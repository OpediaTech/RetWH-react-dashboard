import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useGetRequestsQuery } from "../app/services/requestApi";
import { useGetUserByRoleQuery } from "../app/services/usersApi";
import DashboardLayout from "../layouts/DashboardLayout";
import { retailerColumns } from "../table/columns/retailerColumns";
import Tables from "../table/tables/Tables";

const Retailers = () => {
  // States
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sort = 1;
  const role = "retailer";

  // Redux element
  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading: requestLoading } = useGetRequestsQuery();

  const pathname = `user/all?sort=${sort}&page=${pageIndex}&role=${role}&limit=${pageSize}`;

  const { isLoading, isError, error, data: usersData } = useGetUserByRoleQuery(
    pathname
  );

  // table elements
  const columns = useMemo(() => retailerColumns, []);
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
      columnVisibility: userInfo?.users?.role === "admin" && { action: false },
    },
    pageCount: Math.ceil(usersData?.totalUser / pageSize),
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DashboardLayout>
      {/* Table */}
      <Tables
        table={table}
        title="Retailers"
        loading={isLoading && requestLoading}
        isError={isError}
        error={error}
      />
    </DashboardLayout>
  );
};

export default Retailers;
