import { Typography } from "@mui/material";
import { blue, pink, purple } from "@mui/material/colors";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";
import ReportAction from "../actions/ReportAction";
import PaymentStatus from "../components/PaymentStatus";
import ShippingStatus from "../components/ShippingStatus";

const shippingStatus = ["Pending", "Confirmed", "Shipped", "Delivered"];
const paymentStatus = ["Pending", "Paid", "Cancelled"];

export const reportColumns = [
  {
    accessorKey: "_id",
    header: "Order Id",
    cell: ({ row }) => (
      <div style={{ textTransform: "uppercase" }}>
        <NavLink
          style={{ color: "#07669b" }}
          to={`/single-order/${row.original?._id}`}
        >
          {row.original?._id}
        </NavLink>
      </div>
    ),
  },
  {
    accessorKey: "user",
    header: "Customer",
    cell: ({ row }) => <span>{row.original?.user?.name}</span>,
  },
  {
    accessorKey: "shop",
    header: "Shop",
    cell: ({ row }) => <span>{row.original?.shop?.name}</span>,
  },

  {
    accessorKey: "payment_method",
    header: <div style={{ textAlign: "center" }}>Payment Method</div>,
    cell: ({ row }) => (
      <Typography
        variant="span"
        style={{
          textTransform: "capitalize",
          display: "flex",
          justifyContent: "center",
        }}
        color={
          row?.original?.payment_method === "check"
            ? blue[500]
            : row?.original?.payment_method === "card"
            ? pink[700]
            : row?.original?.payment_method === "cash" && purple[500]
        }
      >
        <span>
          {row?.original?.payment_method ? row?.original?.payment_method : ""}
        </span>
      </Typography>
    ),
  },

  {
    accessorKey: "payment_status",
    header: <div style={{ textAlign: "center" }}>Payment Status</div>,
    cell: ({ row }) => (
      <PaymentStatus row={row} status={paymentStatus} report={true} />
    ),
  },

  {
    accessorKey: "shipping_status",
    header: <div style={{ textAlign: "center" }}>Shipping Status</div>,
    cell: ({ row }) => (
      <ShippingStatus row={row} status={shippingStatus} report={true} />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) =>
      format(new Date(row?.original?.createdAt), "hh:mm a - MM/dd/yyyy"),
  },
  {
    accessorKey: "items",
    header: <div style={{ textAlign: "center" }}>Quantity</div>,
    cell: ({ row }) => (
      <div style={{ textAlign: "center" }}>{row.original?.items?.length}</div>
    ),
  },
  {
    accessorKey: "net_total",
    header: <div style={{ textAlign: "center" }}>Total Amount</div>,
    cell: ({ row }) => (
      <div style={{ textAlign: "center" }}>
        ${row.original?.net_total?.toFixed(2)}
      </div>
    ),
  },

  {
    accessorKey: "paid_amount",
    header: <div style={{ textAlign: "center" }}>Paid Amount</div>,
    cell: ({ row }) => (
      <div style={{ textAlign: "center" }}>
        ${row.original?.paid_amount?.toFixed(2)}
      </div>
    ),
  },

  {
    accessorKey: "return_amount",
    header: <div style={{ textAlign: "center" }}>Return Amount</div>,
    cell: ({ row }) => (
      <div style={{ textAlign: "center" }}>
        ${row.original?.return_amount?.toFixed(2)}
      </div>
    ),
  },

  {
    accessorKey: "due_amount",
    header: <div style={{ textAlign: "center" }}>Due Amount</div>,
    cell: ({ row }) => (
      <div style={{ textAlign: "center" }}>
        ${row.original?.due_amount?.toFixed(2)}
      </div>
    ),
  },

  {
    accessorKey: "action",
    header: <div style={{ textAlign: "center" }}>Action</div>,
    cell: ({ row }) => <ReportAction row={row} />,
  },
];
