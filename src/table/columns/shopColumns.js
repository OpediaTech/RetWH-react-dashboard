// import ProductAction from "../actions/ProductAction";

import ShopAction from "../actions/ShopAction";

// Make some columns!
export const shopColumns = [
  {
    header: "Business Information",
    columns: [
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
        accessorKey: "companyEmail",
        header: "Company Email",
      },
      {
        accessorKey: "companyPhone",
        header: "Company Phone",
      },
      // {
      //   accessorKey: "FEIN#",
      //   header: "FEIN#",
      // },
    ],
  },
  {
    header: "Business Address",
    columns: [
      {
        accessorKey: "streetAddress",
        header: "Address",
      },
      {
        accessorKey: "city",
        header: "City",
      },
      {
        accessorKey: "state_province_region",
        header: "State / Region",
      },
      {
        accessorKey: "postalCode",
        header: "Zip Code / Postal Code",
      },
      {
        accessorKey: "country",
        header: "Country",
      },
      {
        accessorKey: "action",
        header: <div style={{ textAlign: "center" }}>Action</div>,
        cell: ({ row }) => <ShopAction row={row} />,
      },
    ],
  },
];
