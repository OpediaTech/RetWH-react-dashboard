import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import React from "react";

const ReportInvoice = ({ row, setOpen }) => {
  return (
    <section className="reportInvoice__section">
      <div className="reportInvoice__container">
        <h2 className="reportInvoice__title">Sales Report</h2>

        <div className="reportInvoice__users">
          <div>
            <h2 className="reportInvoice__user">
              User: {row?.original?.user?.name}
            </h2>
            <h2 className="reportInvoice__user">
              Order Id: {row?.original?._id}
            </h2>
          </div>
          {/* <h2 className="reportInvoice__invoice">Invoice</h2> */}
        </div>

        <div className="reportInvoice__table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {row?.original?.items?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.productName}</td>
                  <td>{item?.quantity}</td>
                  <td>${item?.price}</td>
                  <td>${item?.total}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>Subtotal</td>
                <td>${row?.original?.net_total}</td>
              </tr>
              <tr>
                <td colSpan={3}>Tax</td>
                <td>0%</td>
              </tr>
              <tr>
                <td colSpan={3}>Total</td>
                <td>${row?.original?.net_total}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Modal Close Button */}
        <div className="reportInvoice__close">
          <IconButton aria-label="close" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </section>
  );
};

export default ReportInvoice;
