import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import UserAction from "../actions/UserAction";

export const userColumns = [
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
    accessorKey: "phone",
    header: "Phone",
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
    accessorKey: "approved",
    header: <div style={{ textAlign: "center" }}>Active</div>,
    cell: ({ row }) => (
      <div style={{ textAlign: "center" }}>
        {row?.original?.approved ? (
          <CheckCircleOutlineIcon color="success" />
        ) : (
          <HighlightOffIcon color="error" />
        )}
      </div>
    ),
  },

  {
    accessorKey: "action",
    header: <div style={{ textAlign: "center" }}>Action</div>,
    cell: ({ row }) => <UserAction row={row} />,
  },
];
