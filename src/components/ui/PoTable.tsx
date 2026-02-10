import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export interface PoTableColumn {
  header: string;
  accessorKey?: string;
  className?: string;
  columns?: PoTableColumn[]; // For grouped headers
  render?: (row: any) => React.ReactNode;
}

interface PoTableProps {
  data: any[];
  columns: PoTableColumn[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  };
}

const PoTable: React.FC<PoTableProps> = ({ data, columns, pagination }) => {
  // Helper to flatten columns for body rendering
  const getLeafColumns = (cols: PoTableColumn[]): PoTableColumn[] => {
    let leaves: PoTableColumn[] = [];
    cols.forEach((col) => {
      if (col.columns && col.columns.length > 0) {
        leaves = [...leaves, ...getLeafColumns(col.columns)];
      } else {
        leaves.push(col);
      }
    });
    return leaves;
  };

  const leafColumns = getLeafColumns(columns);
  const hasGroupedHeaders = columns.some(
    (col) => col.columns && col.columns.length > 0,
  );

  return (
    <>
      {/* Table Container */}
      <div className="flex-1 overflow-auto border border-gray-200 rounded-xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-main sticky top-0 z-10 shadow-sm">
            {/* First Header Row */}
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  scope="col"
                  rowSpan={col.columns ? 1 : hasGroupedHeaders ? 2 : 1}
                  colSpan={col.columns ? col.columns.length : 1}
                  className={`px-6 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider bg-main border-r border-gray-200 last:border-r-0 ${
                    col.className || ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
            {/* Second Header Row (only if grouped headers exist) */}
            {hasGroupedHeaders && (
              <tr>
                {columns.map((col) =>
                  col.columns
                    ? col.columns.map((subCol, subIndex) => (
                        <th
                          key={`${col.header}-${subIndex}`}
                          className={`px-6 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider bg-main border-r border-gray-200 last:border-r-0 ${
                            subCol.className || ""
                          }`}
                        >
                          {subCol.header}
                        </th>
                      ))
                    : null,
                )}
              </tr>
            )}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {leafColumns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-6 py-4 whitespace-nowrap text-sm border-r border-gray-100 last:border-r-0 ${
                        col.className || "text-gray-900"
                      }`}
                    >
                      {col.render
                        ? col.render(row)
                        : col.accessorKey
                          ? row[col.accessorKey]
                          : null}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={leafColumns.length}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 mt-auto rounded-b-xl shadow-sm">
          <div className="flex items-center text-sm text-gray-500">
            <span>Rows per page:</span>
            <select
              value={pagination.rowsPerPage}
              onChange={pagination.onRowsPerPageChange}
              className="ml-2 border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              {[10, 20, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                pagination.onPageChange(Math.max(1, pagination.currentPage - 1))
              }
              disabled={pagination.currentPage === 1}
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <BiChevronLeft size={20} />
            </button>
            <span className="text-sm text-gray-700">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() =>
                pagination.onPageChange(
                  Math.min(pagination.totalPages, pagination.currentPage + 1),
                )
              }
              disabled={pagination.currentPage === pagination.totalPages}
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <BiChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PoTable;
