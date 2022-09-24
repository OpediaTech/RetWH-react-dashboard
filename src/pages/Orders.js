import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { format } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useGetSaleReportsQuery } from "../app/services/reportsApi";
import DashboardLayout from "../layouts/DashboardLayout";
import { orderColumns } from "../table/columns/orderColumns";
import OrdersTable from "../table/tables/OrdersTable";

const Orders = ({ dashboard }) => {
  // States
  const [value, onChange] = useState([new Date(), new Date()]);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sort = 1;

  const pathname = `sale/report?sort=${sort}&page=${pageIndex}&fromDate=${value?.[0]}&toDate=${value?.[1]}&limit=${pageSize}`;

  // Redux element
  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading, isFetching, data: reportsData } = useGetSaleReportsQuery(
    pathname
  );

  // table elements
  const columns = useMemo(() => orderColumns, []);
  const pagination = useMemo(() => ({ pageIndex, pageSize }), [
    pageIndex,
    pageSize,
  ]);
  const data = useMemo(() => (reportsData ? reportsData?.saleReports : []), [
    reportsData,
  ]);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: pagination,
      columnVisibility: userInfo?.users?.role === "retailer" && {
        action: false,
      },
    },

    pageCount: Math.ceil(reportsData?.totalReports / pageSize),
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  // download pdf
  const handleDownloadPDF = () => {
    const unit = "pt";
    const size = "A2"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(18);

    const title = "Orders report";
    const headers = [
      [
        "ORDER ID",
        "CUSTOMER",
        "SHOP",
        "PAYMENT METHOD",
        "PAYMENT STATUS",
        "SHIPPING STATUS",
        "DATE",
        "ITEMS",
        "TOTAL AMOUNT",
        "PAID AMOUNT",
        "RETURN AMOUNT",
        "DUE AMOUNT",
      ],
    ];

    const rows = reportsData?.saleReports?.map((report) => [
      report?._id,
      report?.user?.name,
      report?.shop?.name,
      report?.payment_method,
      report?.payment_status,
      report?.shipping_status,
      format(new Date(report?.createdAt), "hh:mm a - MM/dd/yyyy"),
      report?.items?.length,
      report?.net_total,
      report?.paid_amount,
      report?.return_amount,
      report?.due_amount,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: rows,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("orders.pdf");
  };

  return dashboard ? (
    <OrdersTable
      table={table}
      title="Sales Order"
      onChange={onChange}
      dates={value}
      loading={isLoading}
      onClick={handleDownloadPDF}
      isDisabled={reportsData?.saleReports?.length ? false : true}
    />
  ) : (
    <DashboardLayout>
      <OrdersTable
        table={table}
        title="Sales Order"
        onChange={onChange}
        dates={value}
        loading={isLoading}
        onClick={handleDownloadPDF}
        isDisabled={reportsData?.saleReports?.length ? false : true}
      />
    </DashboardLayout>
  );
};

export default Orders;
