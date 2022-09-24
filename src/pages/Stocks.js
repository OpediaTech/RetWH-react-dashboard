import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useGetProductByShopIdQuery } from "../app/services/productsApi";
import DashboardLayout from "../layouts/DashboardLayout";
import { stockColumns } from "../table/columns/stockColumns";
import Tables from "../table/tables/Tables";

const Stocks = () => {
  // States
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 12,
  });
  const sort = 1;

  // Redux element
  const { userInfo } = useSelector((state) => state.auth);

  const pathname =
    userInfo?.users?.role === "admin"
      ? `product?sort=${sort}&page=${pageIndex}&limit=${pageSize}`
      : `product?sort=${sort}&page=${pageIndex}&limit=${pageSize}&shop=${userInfo?.users?.shop}`;

  const { isLoading, data: productsData } = useGetProductByShopIdQuery(
    pathname
  );

  // table elements
  const columns = useMemo(() => stockColumns, []);
  const pagination = useMemo(() => ({ pageIndex, pageSize }), [
    pageIndex,
    pageSize,
  ]);
  const data = useMemo(() => (productsData ? productsData?.products : []), [
    productsData,
  ]);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: pagination,
    },
    pageCount: Math.ceil(productsData?.totalProducts / pageSize),
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <DashboardLayout>
      {/* Table */}
      <Tables table={table} title="Stocks" loading={isLoading} />

      {/* Others */}
    </DashboardLayout>
  );
};

export default Stocks;
