import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useMemo } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { demoRequestColumns } from "../table/columns/demoRequestColumns";
import Tables from "../table/tables/Tables";

const DemoRequest = () => {
  // table elements
  const columns = useMemo(() => demoRequestColumns, []);
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
      <Tables table={table} title="Demo request" />

      {/* Others */}
      {/* <CustomModal open={open} onClose={setOpen}>
        <AddUser setOpen={setOpen} />
      </CustomModal> */}
    </DashboardLayout>
  );
};

export default DemoRequest;
