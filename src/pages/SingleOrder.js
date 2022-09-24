import { CircularProgress } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pdf from "react-to-pdf";
import { useGetSaleReportByIdQuery } from "../app/services/reportsApi";
import logo from "../assets/main-logo.png";
import CustomButton from "../components/controls/CustomButton";
import Header from "../components/Header";

const SingleOrder = () => {
  const { id } = useParams();

  // Redux element
  const { isLoading, data: reportData } = useGetSaleReportByIdQuery(id);

  const navigate = useNavigate();

  // pdf generate
  const ref = React.createRef();

  return (
    <>
      <Header />
      <section className="sos__section section">
        <CustomButton
          text="Go Back"
          color="primary"
          onClick={() => navigate(-1)}
        />

        {isLoading && (
          <div className="sol__loading">
            <CircularProgress color="warning" size={30} />
          </div>
        )}

        {reportData?.saleReports?.map((order) => (
          <div className="sos__container" ref={ref} key={order?._id}>
            <div className="sos__grid">
              <div className="grid__data">
                <span>
                  <strong>SOLD BY</strong>
                </span>
                <span>{order?.shop?.name}</span>
                <span>{order?.shop?.companyPhone}</span>
                <span>{order?.shop?.streetAddress}</span>
                {/* <span>{order?.shop?.state_province_region}</span> */}
                {/* <span>{shop?.country}</span> */}
                {/* <span>
                <strong>REP: {shop?.name}</strong>
              </span> */}
                {/* <span>
                <strong>ARAFAT</strong>
              </span> */}
              </div>

              <div className="grid__data">
                <span>
                  <strong>SOLD TO</strong>
                </span>
                <span>{order?.user?.name}</span>
                {/* <span>{userShop?.streetAddress}</span>
                <span>{userShop?.country}</span>
                <span>PH: {userShop?.companyPhone}</span>
                <span>Email: {userShop?.email}</span> */}
              </div>

              <div className="grid__data">
                <span className="order">
                  <strong>Order #</strong>
                  {order?._id}
                </span>
                {/* <span>
                <strong>ETIN #</strong>394 5165 41
              </span>
              <span>
                <strong>RESALE #</strong>0011111111
              </span>
              <span>
                <strong>TOBACCO #</strong>321 6564 41
              </span> */}
              </div>

              <div className="nav__logo">
                <img src={logo} alt="logo" />
              </div>
            </div>

            <div className="sos__flex">
              <h1>
                Invoice <span className="invoice__order">#{order?._id}</span>
              </h1>

              <div className="flex__data">
                <span>
                  <strong>Issue Date</strong>
                </span>
                <span>{format(new Date(order?.createdAt), "dd/MM/yyyy ")}</span>
              </div>

              <div className="flex__data">
                <span>
                  <strong>Due Date</strong>
                </span>
                <span>{format(new Date(order?.updatedAt), "dd/MM/yyyy ")}</span>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Cost</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {order?.items?.map((item) => (
                  <tr key={item?._id}>
                    <td>{item?.productName}</td>
                    <td>${item?.price}</td>
                    <td>{item?.quantity}</td>
                    <td>${item?.price * item?.quantity}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan="3">Subtotal</td>
                  <td>${order?.net_total}</td>
                </tr>
                <tr>
                  <td colSpan="3">Tax</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td colSpan="3">
                    <strong>Invoice Total</strong>
                  </td>
                  <td>
                    <strong>${order?.net_total}</strong>
                  </td>
                </tr>
                <tr>
                  <td colSpan="3">Receive Amount</td>
                  <td>${order?.paid_amount}</td>
                </tr>
                <tr>
                  <td colspan="3">Return Amount</td>
                  <td>${order?.return_amount?.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}

        <div className="sos__flex">
          <Pdf targetRef={ref} filename={`${id}.pdf`}>
            {({ toPdf }) => (
              <CustomButton
                defaultColor="info"
                text="Download PDF"
                onClick={toPdf}
              />
            )}
          </Pdf>
        </div>
      </section>
    </>
  );
};

export default SingleOrder;
