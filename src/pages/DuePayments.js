import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useMemo } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { duePaymentColumns } from "../table/columns/duePaymentColumns";
import Tables from "../table/tables/Tables";

const DuePayments = () => {
  // table elements
  const columns = useMemo(() => duePaymentColumns, []);
  const data = useMemo(() => [], []);

  const table = useReactTable({
    data,
    columns,
    pageCount: 1,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <DashboardLayout>
      {/* Table */}
      <Tables table={table} title="Due Payments" />

      {/* Others */}
    </DashboardLayout>
  );
};

export default DuePayments;
