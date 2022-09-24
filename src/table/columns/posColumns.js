export const posColumns = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => <span>Product name</span>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>$254</span>,
  },

  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <span>4</span>,
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => <span>$1016</span>,
  },
];
