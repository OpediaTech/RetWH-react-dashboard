import ViewAction from "../actions/ViewAction";

export const demoRequestColumns = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
    cell: (props) => <span>Avengers: Age of Ultron</span>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },

  {
    accessorKey: "role",
    header: "Role",
    cell: (props) => <span>Admin</span>,
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <ViewAction row={row} view={true} />,
  },
];
