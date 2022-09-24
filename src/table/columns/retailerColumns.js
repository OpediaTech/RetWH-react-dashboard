import RetailerAction from "../actions/RetailerAction";

export const retailerColumns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
  },
  {
    accessorKey: "companyPhone",
    header: "Company Phone",
  },
  {
    accessorKey: "role",
    header: "Role",
  },

  {
    accessorKey: "action",
    header: <div style={{ textAlign: "center" }}>Action</div>,
    cell: ({ row }) => <RetailerAction row={row} />,
  },
];
