import { Chip } from "@mui/material";
import DepartmentAction from "../actions/DepartmentAction";

export const departmentColumns = [
  {
    accessorKey: "_id",
    header: "Department Id",
  },
  {
    accessorKey: "dept_name",
    header: "Department Name",
  },
  {
    accessorKey: "tax_stage",
    header: "Tax Stage",
  },
  {
    accessorKey: "shop",
    header: "Shop",
    cell: ({ row }) => <span>{row.original?.shop?.name}</span>,
  },
  {
    accessorKey: "active",
    header: <div style={{ textAlign: "center" }}>Status</div>,
    cell: ({ row }) => (
      <div style={{ textAlign: "center" }}>
        <Chip
          variant="outlined"
          color={row?.original?.active ? "success" : "error"}
          size="small"
          label={row?.original?.active ? "Active" : "Deactive"}
        />
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: <div style={{ textAlign: "center" }}>Action</div>,
    cell: ({ row }) => <DepartmentAction row={row} />,
  },
];
