import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetDepartmentByShopQuery,
  useGetDepartmentsQuery,
} from "../app/services/departmentsApi";
import CustomModal from "../components/controls/CustomModal";
import DashboardLayout from "../layouts/DashboardLayout";
import { departmentColumns } from "../table/columns/departmentColumns";
import Tables from "../table/tables/Tables";
import AddDepartment from "./additional-pages/AddDepartment";

const Departments = () => {
  // States
  const [open, setOpen] = useState(false);

  // Redux element
  const { userInfo } = useSelector((state) => state.auth);

  const { isLoading, data: departmentsData } = useGetDepartmentsQuery();

  const {
    isLoading: loading,
    data: departmentDataByShop,
  } = useGetDepartmentByShopQuery(userInfo?.users?.shop);

  // console.log(departmentDataByShop);

  // table elements
  const columns = useMemo(() => departmentColumns, []);
  const data = useMemo(
    () =>
      userInfo?.users?.role === "admin"
        ? departmentsData?.departments
        : departmentDataByShop
        ? departmentDataByShop?.departments
        : [],
    [departmentsData, departmentDataByShop, userInfo]
  );

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
        title="Department list"
        isButton={true}
        btnText="Add Department"
        setOpen={setOpen}
        loading={isLoading && loading}
      />

      {/* Others */}
      <CustomModal open={open} onClose={setOpen}>
        <AddDepartment setOpen={setOpen} />
      </CustomModal>
    </DashboardLayout>
  );
};

export default Departments;
