export const stockColumns = [
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => <span>{row?.original?.productName}</span>,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => <span>{row?.original?.department?.name}</span>,
  },

  {
    accessorKey: "quantity",
    header: <div style={{ textAlign: "center" }}>In Stock</div>,
    cell: ({ row }) => (
      <div style={{ textAlign: "center" }}>
        {row.original?.quantity === 0 ? (
          <>
            <div className="form__error">{row.original?.quantity}</div>
            <span className="form__error">
              Your product quantity is finished.
            </span>
          </>
        ) : (
          <div>{row.original?.quantity}</div>
        )}
        {row.original?.quantity > 0 && row.original?.quantity < 5 && (
          <span className="form__error" style={{ color: "#ed6c02" }}>
            Your product quantity is very low.
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "sold_amount",
    header: "Sold",
    cell: ({ row }) => <span>{row.original?.sold_amount}</span>,
  },

  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => (
      <span>{row.original?.quantity + row.original?.sold_amount}</span>
    ),
  },
];
