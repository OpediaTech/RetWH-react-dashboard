import { flexRender } from "@tanstack/react-table";
import React from "react";
import TableLoader from "../components/TableLoader";

const PosTable = ({ table, loading }) => {
  return (
    <section className="posTable__section">
      {/* Table header */}
      {/* <div className="posTable__search">
        <CustomSearchBox placeholder="Search product...." />
      </div> */}

      {/* Main Table*/}
      {loading ? (
        <TableLoader />
      ) : (
        <div className="posTable__container">
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
      <div className="posTable__footer">
        <div className="footer__price">
          <label>Sub total</label>
          <input type="text" disabled value={500} />
        </div>
        <div className="footer__price">
          <label>Tax</label>
          <input type="text" disabled value={500} />
        </div>
        <div className="footer__price">
          <label>Discount</label>
          <input type="text" disabled value={500} />
        </div>
        <div className="footer__price">
          <label>Net total</label>
          <input type="text" disabled value={500} />
        </div>
      </div>
    </section>
  );
};

export default PosTable;
