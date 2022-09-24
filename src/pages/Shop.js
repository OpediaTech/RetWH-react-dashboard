import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetShopsByAdminQuery,
  useGetShopsByEmailQuery,
} from "../app/services/shopsApi";
import CustomModal from "../components/controls/CustomModal";
import DashboardLayout from "../layouts/DashboardLayout";
import { shopColumns } from "../table/columns/shopColumns";
import Tables from "../table/tables/Tables";
import AddShop from "./additional-pages/AddShop";

const Shop = () => {
  // States
  const [open, setOpen] = useState(false);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sort = 1;

  const pathname = `shop?sort=${sort}&page=${pageIndex}&limit=${pageSize}`;

  // Redux element
  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading, data: shopsData } = useGetShopsByAdminQuery(pathname);

  const {
    isLoading: loading,
    data: shopsDataByEmail,
  } = useGetShopsByEmailQuery(userInfo?.users?.email);

  // console.log(shopsDataByEmail);
  // table elements
  const columns = useMemo(() => shopColumns, []);
  const pagination = useMemo(() => ({ pageIndex, pageSize }), [
    pageIndex,
    pageSize,
  ]);
  const data = useMemo(
    () =>
      userInfo?.users?.role === "admin"
        ? shopsData?.shops
        : shopsDataByEmail
        ? shopsDataByEmail?.shops
        : [],
    [shopsData, userInfo, shopsDataByEmail]
  );

  // const data = useMemo(() => (shopsData ? shopsData?.shops : []), [shopsData]);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: pagination,
    },
    pageCount: Math.ceil(shopsData?.totalShops / pageSize) ?? 1,
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DashboardLayout>
      {/* Table */}
      <Tables
        table={table}
        title="Shop list"
        isButton={true}
        btnText="Add Shop"
        setOpen={setOpen}
        loading={isLoading && loading}
      />

      {/* Others */}
      <CustomModal open={open} onClose={setOpen}>
        <AddShop setOpen={setOpen} />
      </CustomModal>
    </DashboardLayout>
  );
};

export default Shop;
