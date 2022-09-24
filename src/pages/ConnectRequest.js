import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { useGetRequestsQuery } from "../app/services/requestApi";
import AdminConnectForm from "../components/AdminConnectForm";
import CustomModal from "../components/controls/CustomModal";
import DashboardLayout from "../layouts/DashboardLayout";
import { requestColumns } from "../table/columns/requestColumns";
import Tables from "../table/tables/Tables";

const ConnectRequest = () => {
  // States
  const [open, setOpen] = useState(false);

  // Redux element
  const { isLoading, data: requestsData } = useGetRequestsQuery();

  // console.log(requestsData);

  // table elements
  const columns = useMemo(() => requestColumns, []);
  const data = useMemo(() => (requestsData ? requestsData?.requests : []), [
    requestsData,
  ]);

  const table = useReactTable({
    data,
    columns,
    pageCount: 1,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <DashboardLayout>
      {/* Table */}
      <Tables
        table={table}
        title="Connect request list"
        isButton={true}
        btnText="Create Connect"
        setOpen={setOpen}
        loading={isLoading}
      />

      {/* Others */}
      <CustomModal open={open} onClose={setOpen}>
        <AdminConnectForm setOpen={setOpen} />
      </CustomModal>
    </DashboardLayout>
  );
};

export default ConnectRequest;
