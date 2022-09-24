import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { mailColumns } from "../table/columns/mailColumns";
import Tables from "../table/tables/Tables";

const Mail = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://fakestoreapi.com/users")
        .then((res) => res.json())
        .then((json) => setUsers(json));
    };
    fetchData();
  }, []);
  // table elements
  const columns = useMemo(() => mailColumns, []);
  const data = useMemo(() => users, [users]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <DashboardLayout>
      {/* Table */}
      <Tables table={table} title="Mails" />

      {/* Others */}
    </DashboardLayout>
  );
};

export default Mail;
