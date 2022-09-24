import ViewAction from "../actions/ViewAction";

export const mailColumns = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: (props) => <span>Lorem ipsum dolor Lorem ipsum dolor sit....</span>,
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <ViewAction row={row} view={true} />,
  },
];
