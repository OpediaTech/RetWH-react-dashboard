import ProductAction from "../actions/ProductAction";

export const productColumns = [
  {
    header: "Product Details",
    columns: [
      {
        accessorKey: "productName",
        header: "Name",
        // cell: ({ row }) => <span>{row.original?.title?.substring(0, 55)}</span>,
      },
      {
        accessorKey: "sku",
        header: "SKU",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "modifier",
        header: "Modifier",
      },
      {
        accessorKey: "Buying Price",
        header: "buying_price",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
    ],
  },
  {
    header: "Prices",
    columns: [
      {
        accessorKey: "basic",
        header: "Basic",
        cell: ({ row }) => <span>{row?.original?.prices?.basic}</span>,
      },
      {
        accessorKey: "standard",
        header: "Standard",
        cell: ({ row }) => <span>{row?.original?.prices?.standard}</span>,
      },
      {
        accessorKey: "premium",
        header: "Premium",
        cell: ({ row }) => <span>{row?.original?.prices?.premium}</span>,
      },
    ],
  },
  {
    header: "Product Offers (Basic)",
    columns: [
      {
        accessorKey: "basicPrice",
        header: "Price",
        cell: ({ row }) => (
          <span>{row?.original?.productOffer?.basic?.[0]?.price}</span>
        ),
      },
      {
        accessorKey: "basicQuantity",
        header: "Quantity",
        cell: ({ row }) => (
          <span>{row?.original?.productOffer?.basic?.[0]?.quantity}</span>
        ),
      },
    ],
  },
  {
    header: "Product Offers (Standard)",
    columns: [
      {
        accessorKey: "standardPrice",
        header: "Price",
        cell: ({ row }) => (
          <span>{row?.original?.productOffer?.standard?.[0]?.price}</span>
        ),
      },
      {
        accessorKey: "standardQuantity",
        header: "Quantity",
        cell: ({ row }) => (
          <span>{row?.original?.productOffer?.standard?.[0]?.quantity}</span>
        ),
      },
    ],
  },
  {
    header: "Product Offers (Premium)",
    columns: [
      {
        accessorKey: "premiumPrice",
        header: "Price",
        cell: ({ row }) => (
          <span>{row?.original?.productOffer?.premium?.[0]?.price}</span>
        ),
      },
      {
        accessorKey: "premiumQuantity",
        header: "Quantity",
        cell: ({ row }) => (
          <span>{row?.original?.productOffer?.premium?.[0]?.quantity}</span>
        ),
      },
    ],
  },
  {
    header: "Others",
    columns: [
      {
        accessorKey: "action",
        header: <div style={{ textAlign: "center" }}>Action</div>,
        cell: ({ row }) => <ProductAction row={row} />,
      },
    ],
  },
];
