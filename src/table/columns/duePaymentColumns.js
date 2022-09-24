export const duePaymentColumns = [
  {
    accessorKey: "orderId",
    header: "Order Id",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => <span>Panding</span>,
  },
  //   {
  //     accessorKey: "quantity",
  //     header: "Quantity",
  //   },
  {
    accessorKey: "pay",
    header: "Pay",
    cell: ({ row }) => <span>$3000</span>,
  },
  {
    accessorKey: "due",
    header: "Due",
    cell: ({ row }) => <span>$2000</span>,
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => <span>$5000</span>,
  },
];
