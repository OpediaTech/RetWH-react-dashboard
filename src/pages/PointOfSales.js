import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { Button, IconButton } from "@mui/material";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { posData } from "../assets/data/posData";
import CustomButton from "../components/controls/CustomButton";
import PosBillings from "../components/PosBillings";
import { posColumns } from "../table/columns/posColumns";
import PosTable from "../table/tables/PosTable";

const PointOfSales = () => {
  // navigate
  const navigate = useNavigate();

  // table elements
  const columns = useMemo(() => posColumns, []);
  const data = useMemo(() => posData, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {/* <Header /> */}
      <section className="pos__section">
        <div className="pos__header">
          <div className="container">
            <h3 className="header__title">Point of Sales</h3>
            <div className="header__group">
              <div className="header__btn">
                <Button
                  variant="contained"
                  onClick={() => navigate(-1)}
                  size="small"
                  startIcon={<ArrowBackIcon size="small" />}
                >
                  Go Back
                </Button>
              </div>
              <div className="header__btn">
                <Button
                  variant="contained"
                  onClick={() => navigate("/dashboard")}
                  size="small"
                >
                  Home
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="pos__container">
            <div className="pos__queryProducts">
              <form>
                <span className="form__search">
                  <input
                    className="search__control"
                    type="text"
                    placeholder="Enter product"
                  />

                  <IconButton size="small">
                    <QrCodeScannerIcon />
                  </IconButton>
                </span>

                <div className="form__grid">
                  <span className="form__group">
                    <input
                      className="form__control"
                      type="text"
                      placeholder="Qunatity"
                    />
                  </span>

                  <span className="form__group">
                    <input
                      className="form__control"
                      type="text"
                      placeholder="Price"
                    />
                  </span>
                </div>

                <div className="btn__group">
                  <CustomButton
                    className="tax__btn"
                    text="TAX"
                    size="large"
                    color="primary"
                  />
                  <CustomButton
                    className="tax__btn"
                    text="Non-TAX"
                    size="large"
                    color="primary"
                  />
                </div>
              </form>

              {/* Pos product table */}
              <div className="pos__tables">
                <PosTable table={table} />
              </div>
            </div>

            {/* Pos Bills */}
            <div className="pos__billings">
              <PosBillings />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PointOfSales;
