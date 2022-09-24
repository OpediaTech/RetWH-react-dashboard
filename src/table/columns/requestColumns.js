import RequestStatus from "../components/RequestStatus";

export const requestColumns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span>{row?.original?.user?.name}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row?.original?.user?.email}</span>,
  },
  {
    accessorKey: "subscription",
    header: "Subscription",
  },
  {
    accessorKey: "approved",
    header: "Request Status",
    cell: ({ row }) => <RequestStatus row={row} />,
  },

  // {
  //   accessorKey: "action",
  //   header: <div style={{ textAlign: "center" }}>Action</div>,
  //   cell: ({ row }) => <RequestAction row={row} />,
  // },
];
