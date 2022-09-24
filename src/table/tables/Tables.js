import AddIcon from "@mui/icons-material/Add";
import { Box, Pagination, Skeleton } from "@mui/material";
import { flexRender } from "@tanstack/react-table";
import React, { useState } from "react";
import CustomButton from "../../components/controls/CustomButton";
import CustomModal from "../../components/controls/CustomModal";
import CustomSearchBox from "../../components/controls/CustomSearchBox";
import AddBulkProduct from "../../pages/additional-pages/AddBulkProduct";
import TableLoader from "../components/TableLoader";

const Tables = ({
  table,
  setOpen,
  title,
  isButton,
  btnText,
  loading,
  bulkProducts,
  isDisabled,
  paginations,
}) => {
  // States
  const [openModal, setOpenModal] = useState(false);
  return (
    <section className="table__section">
      {/* Table Header */}
      <div className="table__head">
        <div className="table__header">
          <h3 className="header__title">{title}</h3>
          <Box display="flex" gap={1}>
            {isButton && (
              <CustomButton
                text={btnText}
                color="primary"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
                disabled={isDisabled}
              />
            )}
            {bulkProducts && (
              <>
                <CustomButton
                  text="Add Bulk Product"
                  color="primary"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenModal(true)}
                />
                <CustomModal open={openModal} onClose={setOpenModal}>
                  <AddBulkProduct setOpenModal={setOpenModal} />
                </CustomModal>
              </>
            )}
          </Box>
        </div>

        <div className="table__search">
          {/* <div></div> */}
          <CustomSearchBox placeholder="Search...." />
          {/* <DateFilters /> */}
        </div>
      </div>

      {/* Main Table*/}
      {loading ? (
        <TableLoader />
      ) : (
        <div className="table__container">
          <table>
            <thead>
              {table?.getHeaderGroups()?.map((headerGroup) => (
                <tr key={headerGroup?.id}>
                  {headerGroup?.headers?.map((header) => (
                    <th key={header?.id} colSpan={header?.colSpan}>
                      {header?.isPlaceholder
                        ? null
                        : flexRender(
                            header?.column?.columnDef?.header,
                            header?.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table?.getRowModel()?.rows?.map((row) => (
                <tr key={row?.id}>
                  {row?.getVisibleCells()?.map((cell) => (
                    <td key={cell?.id}>
                      {flexRender(
                        cell?.column?.columnDef?.cell,
                        cell?.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Table footer */}
      {loading ? (
        <Box
          display="flex"
          justifyContent="space-between"
          gap={5}
          marginTop="5px"
        >
          <Skeleton
            variant="rounded"
            animation="wave"
            width="100%"
            height={28}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            width="100%"
            height={28}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            width="100%"
            height={28}
          />
        </Box>
      ) : (
        <div className="table__pagination">
          <Pagination
            count={table?.getPageCount()}
            onChange={(event, value) => table?.setPageIndex(value - 1)}
          />

          <span>
            <select
              value={table?.getState()?.pagination?.pageSize}
              onChange={(e) => table?.setPageSize(Number(e.target.value))}
            >
              {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </span>

          <span className="pagination__text">
            Showing{" "}
            <strong>{table?.getState()?.pagination?.pageIndex + 1} </strong>
            of <strong>{table?.getPageCount()}</strong>
          </span>
        </div>
      )}
    </section>
  );
};

export default Tables;
