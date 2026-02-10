import React, { useState, useEffect } from "react";
import { usePageHeader } from "../../app/context/PageHeaderContext";
import {
  BiHome,
  BiCheckCircle,
  BiDetail,
  BiChevronLeft,
  BiChevronRight,
  BiSearch,
  BiDownload,
} from "react-icons/bi";
import { Button, AutoComplete, DatePicker } from "ponyo-ui";
import PoConfirmDetail from "./PoConfirmDetail";
import { exportToExcel } from "../../components/ui/ExportExcel";

interface PoConfirmData {
  id: string;
  customer: string;
  shipToPlant: string;
  poNumber: string;
  revision: string;
  poOrderDate: string;
  poLine: string;
  partDescription: string;
  drawing: string;
  poQty: number;
  poRequireDate: string;
  apatShipDate: string;
  apatQty: number;
  apatOwner: string;
  apatRemark: string;
}

const customerOptions = [
  { label: "ASIAN HONDA MOTOR CO.,LTD.", value: "ASIAN HONDA" },
  { label: "ALLIANCE LAUNDRY", value: "ALLIANCE LAUNDRY" },
];

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "Confirmed", value: "Confirmed" },
];

const Poconfirm: React.FC = () => {
  const { setPageHeader } = usePageHeader();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  const [data, setData] = useState<PoConfirmData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<PoConfirmData | null>(null);

  const handleOpenModal = (row: PoConfirmData) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    setPageHeader("PO Confirm", [
      { label: "Home", href: "#", icon: <BiHome size={16} /> },
      { label: "PO Confirm", icon: <BiCheckCircle size={16} /> },
    ]);
    handleSearch();
  }, [setPageHeader]);

  const handleSearch = () => {
    // Mock Data
    const dummyData: PoConfirmData[] = Array.from({ length: 5 }, (_, i) => ({
      id: (i + 1).toString(),
      customer: `Customer ${String.fromCharCode(65 + i)}`,
      shipToPlant: `Plant ${i + 1}`,
      poNumber: `PO-2026-${1000 + i}`,
      revision: `R${i}`,
      poOrderDate: `2026-02-${10 + i}`,
      poLine: `${i + 1}`,
      partDescription: `Part Desc ${i + 1}`,
      drawing: `DWG-${2000 + i}`,
      poQty: (i + 1) * 100,
      poRequireDate: `2026-03-${10 + i}`,
      apatShipDate: `2026-03-${12 + i}`,
      apatQty: (i + 1) * 100,
      apatOwner: `Owner ${i + 1}`,
      apatRemark: i % 2 === 0 ? "Confirmed" : "Pending",
    }));
    setData(dummyData);
  };

  const handleExport = () => {
    // 1. Define Headers
    const headers = [
      [
        "Customer",
        "Ship To Plant",
        "PO Number",
        "Revision",
        "PO Order Date",
        "PO Line",
        "Part Description",
        "Drawing",
        "PO Qty",
        "PO Require Date",
        "APAT CONFIRM",
        "", // Merged
        "", // Merged
        "", // Merged
      ],
      [
        "", // Merged Customer
        "", // Merged Ship To Plant
        "", // Merged PO Number
        "", // Merged Revision
        "", // Merged PO Order Date
        "", // Merged PO Line
        "", // Merged Part Description
        "", // Merged Drawing
        "", // Merged PO Qty
        "", // Merged PO Require Date
        "Ship Date",
        "Qty",
        "Owner",
        "Remark",
      ],
    ];

    // 2. Map Data
    const rows = data.map((row) => [
      row.customer,
      row.shipToPlant,
      row.poNumber,
      row.revision,
      row.poOrderDate,
      row.poLine,
      row.partDescription,
      row.drawing,
      row.poQty,
      row.poRequireDate,
      row.apatShipDate,
      row.apatQty,
      row.apatOwner,
      row.apatRemark,
    ]);

    // 3. Define Merges
    const merges = [
      { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } }, // Customer
      { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } }, // Ship To Plant
      { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } }, // PO Number
      { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } }, // Revision
      { s: { r: 0, c: 4 }, e: { r: 1, c: 4 } }, // PO Order Date
      { s: { r: 0, c: 5 }, e: { r: 1, c: 5 } }, // PO Line
      { s: { r: 0, c: 6 }, e: { r: 1, c: 6 } }, // Part Description
      { s: { r: 0, c: 7 }, e: { r: 1, c: 7 } }, // Drawing
      { s: { r: 0, c: 8 }, e: { r: 1, c: 8 } }, // PO Qty
      { s: { r: 0, c: 9 }, e: { r: 1, c: 9 } }, // PO Require Date
      { s: { r: 0, c: 10 }, e: { r: 0, c: 13 } }, // APAT CONFIRM (Title spans 4 columns)
    ];

    // 4. Call Export Function
    exportToExcel({
      data: rows,
      fileName: "PO_Confirm",
      customHeaders: headers,
      merges: merges,
    });
  };

  return (
    <div className="px-6 py-2">
      {/* Search Filters */}
      <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {/* 1. From Date */}
          <div className="grid grid-cols-2 gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From PO Order Date
              </label>
              <DatePicker
                name="fromDate"
                placeholder="dd/mm/yyyy"
                value={fromDate}
                onChange={(val) => setFromDate(String(val || ""))}
              />
            </div>

            {/* 2. To Date */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To PO Order Date
              </label>
              <DatePicker
                name="toDate"
                placeholder="dd/mm/yyyy"
                value={toDate}
                onChange={(val) => setToDate(String(val || ""))}
              />
            </div>
          </div>

          {/* 3. Customer */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer
            </label>
            <AutoComplete
              name="customer"
              list={customerOptions}
              value={selectedCustomer?.value}
              onSelectItem={(item) => setSelectedCustomer(item)}
              placeholder="Select Customer"
            />
          </div>

          {/* 4. Status */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <AutoComplete
              name="status"
              list={statusOptions}
              value={selectedStatus?.value}
              onSelectItem={(item) => setSelectedStatus(item)}
              placeholder="Select Status"
            />
          </div>

          <div className="w-full flex flex-col">
            <label className="invisible block text-xs font-medium text-gray-500 mb-1">
              Search
            </label>
            <div className="flex flex-row gap-2">
              <Button
                variant="primary"
                onClick={handleSearch}
                className="w-1/2 justify-center"
                leftIcon={<BiSearch size={18} />}
              >
                Search
              </Button>
              <Button
                variant="secondary"
                onClick={handleExport}
                className="w-1/2 justify-center"
                leftIcon={<BiDownload size={18} />}
              >
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="border-collapse">
          <thead>
            <tr className="bg-[#008DD1] text-white text-sm font-bold uppercase tracking-wider">
              <th
                rowSpan={2}
                className="px-2 py-3 border-r border-white/20 text-center align-middle whitespace-nowrap min-w-[100px]"
              >
                Customer
              </th>
              <th
                rowSpan={2}
                className="px-2 py-3 border-r border-white/20 text-center align-middle whitespace-nowrap min-w-[120px]"
              >
                Ship To Plant
              </th>
              <th
                rowSpan={2}
                className="px-2 py-3 border-r border-white/20 text-center align-middle whitespace-nowrap min-w-[120px]"
              >
                PO Number
              </th>
              <th
                rowSpan={2}
                className="px-2 py-3 border-r border-white/20 text-center align-middle whitespace-nowrap min-w-[80px]"
              >
                Revision
              </th>
              <th
                rowSpan={2}
                className="px-2 py-3 border-r border-white/20 text-center align-middle whitespace-nowrap min-w-[120px]"
              >
                PO Order Date
              </th>
              <th
                rowSpan={2}
                className="px-2 py-3 border-r border-white/20 text-center align-middle whitespace-nowrap min-w-[80px]"
              >
                PO Line
              </th>
              <th
                rowSpan={2}
                className="px-2 py-3 border-r border-white/20 text-center align-middle whitespace-nowrap min-w-[200px]"
              >
                Part Description
              </th>
              <th
                rowSpan={2}
                className="px-2 py-3 border-r border-white/20 text-center align-middle whitespace-nowrap min-w-[120px]"
              >
                Drawing
              </th>
              <th
                rowSpan={2}
                className="px-2 py-3 border-r border-white/20 text-center align-middle whitespace-nowrap min-w-[80px]"
              >
                PO Qty
              </th>
              <th
                rowSpan={2}
                className="px-2 py-3 border-r border-white/20 text-center align-middle whitespace-nowrap min-w-[120px]"
              >
                PO Require Date
              </th>
              <th
                colSpan={4}
                className="px-2 py-1 border-r text-center border-b border-white/20"
              >
                APAT CONFIRM
              </th>
              <th
                rowSpan={2}
                className="px-2 py-3 text-center align-middle whitespace-nowrap min-w-[60px]"
              >
                Detail
              </th>
            </tr>
            <tr className="bg-[#008DD1] text-white text-sm font-bold uppercase tracking-wider">
              <th className="px-2 py-1 border-r border-white/20 text-center whitespace-nowrap min-w-[100px]">
                Ship Date
              </th>
              <th className="px-2 py-1 border-r border-white/20 text-center whitespace-nowrap min-w-[80px]">
                Qty
              </th>
              <th className="px-2 py-1 border-r border-white/20 text-center whitespace-nowrap min-w-[100px]">
                Owner
              </th>
              <th className="px-2 py-1 border-r border-white/20 text-center whitespace-nowrap min-w-[150px]">
                Remark
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.length > 0 ? (
              currentRows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50 text-sm text-gray-700 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-3 py-3 whitespace-nowrap text-center text-[#008DD1] font-medium">
                    {row.customer}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-center text-[#008DD1] font-medium">
                    {row.shipToPlant}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-center text-[#008DD1] font-medium">
                    {row.poNumber}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-center text-[#008DD1] font-medium">
                    {row.revision}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-center text-[#008DD1] font-medium">
                    {row.poOrderDate}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-center text-[#008DD1] font-medium">
                    {row.poLine}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-[#008DD1] font-medium">
                    {row.partDescription}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-center text-[#008DD1] font-medium">
                    {row.drawing}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-center text-[#008DD1] font-medium">
                    {row.poQty}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-center text-[#008DD1] font-medium">
                    {row.poRequireDate}
                  </td>
                  {/* APAT Confirm Columns */}
                  <td className="px-3 py-3 whitespace-nowrap text-center border-l bg-white">
                    {row.apatShipDate}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-center bg-white">
                    {row.apatQty}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-center bg-white">
                    {row.apatOwner}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-center bg-white border-r">
                    {row.apatRemark}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-center">
                    <button
                      className="p-1.5 text-primary hover:bg-primary/10 rounded-full transition-colors"
                      title="Detail"
                      onClick={() => handleOpenModal(row)}
                    >
                      <BiDetail size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={16}
                  className="px-6 py-8 text-center text-red-500 font-medium"
                >
                  Data not found !!!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="border-t border-gray-200 bg-white px-4 py-3 flex items-center justify-end gap-4 sm:px-6 rounded-b-lg shadow border-x border-b mb-4 -mt-1">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="border border-gray-300 rounded text-sm p-1 focus:outline-none focus:border-primary"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="text-sm text-gray-700">
          Page <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{totalPages}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BiChevronLeft size={24} />
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BiChevronRight size={24} />
          </button>
        </div>
      </div>

      <PoConfirmDetail
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedRow}
      />
    </div>
  );
};

export default Poconfirm;
