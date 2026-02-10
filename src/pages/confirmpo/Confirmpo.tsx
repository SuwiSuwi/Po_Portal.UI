import React, { useState, useEffect } from "react";
import { usePageHeader } from "../../app/context/PageHeaderContext";
import {
  BiHome,
  BiCheckCircle,
  BiEdit,
  BiDetail,
  BiChevronLeft,
  BiChevronRight,
  BiSearch,
  BiDownload,
} from "react-icons/bi";
import { Button, AutoComplete, DatePicker } from "ponyo-ui";
import ConfirmpoEdit from "./ConfirmpoEdit";
import ConfirmpoDetail from "./ConfirmpoDetail";
import { exportToExcel } from "../../components/ui/ExportExcel";

interface ConfirmPoData {
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

const Confirmpo: React.FC = () => {
  const { setPageHeader } = usePageHeader();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  const [data, setData] = useState<ConfirmPoData[]>([]);

  // Modal State
  const [selectedPo, setSelectedPo] = useState<ConfirmPoData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    setPageHeader("Confirm PO", [
      { label: "Home", href: "#", icon: <BiHome size={16} /> },
      { label: "Confirm PO", icon: <BiCheckCircle size={16} /> },
    ]);

    // Load mock data
    handleSearch();
  }, [setPageHeader]);

  const handleSearch = () => {
    // Mock Data
    const dummyData: ConfirmPoData[] = Array.from({ length: 55 }, (_, i) => ({
      id: (i + 1).toString(),
      customer: `Customer ${String.fromCharCode(65 + (i % 26))}`,
      shipToPlant: `Plant ${(i % 5) + 1}`,
      poNumber: `PO-2026-${1000 + i}`,
      revision: `R${i % 3}`,
      poOrderDate: `2026-02-${(i % 28) + 1}`,
      poLine: `${(i % 10) + 1}`,
      partDescription: `Part Desc ${i + 1}`,
      drawing: `DWG-${2000 + i}`,
      poQty: (i + 1) * 10,
      poRequireDate: `2026-03-${(i % 28) + 1}`,
      apatShipDate: `2026-03-${(i % 28) + 3}`,
      apatQty: (i + 1) * 10,
      apatOwner: `Owner ${(i % 5) + 1}`,
      apatRemark: i % 2 === 0 ? "Confirmed" : "Pending",
    }));
    setData(dummyData);
  };

  const handleEdit = (po: ConfirmPoData) => {
    setSelectedPo(po);
    setIsEditModalOpen(true);
  };

  const handleDetail = (po: ConfirmPoData) => {
    setSelectedPo(po);
    setIsDetailModalOpen(true);
  };

  const handleSaveEdit = (updatedPo: ConfirmPoData) => {
    setData((prev) =>
      prev.map((item) => (item.id === updatedPo.id ? updatedPo : item)),
    );
    setIsEditModalOpen(false);
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
      fileName: "Confirm_PO",
      customHeaders: headers,
      merges: merges,
    });
  };

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  return (
    <div className="px-6 py-2">
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
            <label className="invisible block text-xs font-medium text-gray-500 mb-2">
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

      <div className="bg-white rounded-lg shadow border border-gray-200 flex flex-col h-[calc(100vh-250px)]">
        <div className="overflow-auto flex-1">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[#008DD1] text-white text-xs uppercase tracking-wider">
                <th
                  rowSpan={2}
                  className="px-2 py-3 border-r border-white/20 font-semibold text-center align-middle whitespace-nowrap min-w-[100px]"
                >
                  Customer
                </th>
                <th
                  rowSpan={2}
                  className="px-2 py-3 border-r border-white/20 font-semibold text-center align-middle whitespace-nowrap min-w-[120px]"
                >
                  Ship To Plant
                </th>
                <th
                  rowSpan={2}
                  className="px-2 py-3 border-r border-white/20 font-semibold text-center align-middle whitespace-nowrap min-w-[120px]"
                >
                  PO Number
                </th>
                <th
                  rowSpan={2}
                  className="px-2 py-3 border-r border-white/20 font-semibold text-center align-middle whitespace-nowrap min-w-[80px]"
                >
                  Revision
                </th>
                <th
                  rowSpan={2}
                  className="px-2 py-3 border-r border-white/20 font-semibold text-center align-middle whitespace-nowrap min-w-[120px]"
                >
                  PO Order Date
                </th>
                <th
                  rowSpan={2}
                  className="px-2 py-3 border-r border-white/20 font-semibold text-center align-middle whitespace-nowrap min-w-[80px]"
                >
                  PO Line
                </th>
                <th
                  rowSpan={2}
                  className="px-2 py-3 border-r border-white/20 font-semibold text-center align-middle whitespace-nowrap min-w-[200px]"
                >
                  Part Description
                </th>
                <th
                  rowSpan={2}
                  className="px-2 py-3 border-r border-white/20 font-semibold text-center align-middle whitespace-nowrap min-w-[120px]"
                >
                  Drawing
                </th>
                <th
                  rowSpan={2}
                  className="px-2 py-3 border-r border-white/20 font-semibold text-center align-middle whitespace-nowrap min-w-[80px]"
                >
                  PO Qty
                </th>
                <th
                  rowSpan={2}
                  className="px-2 py-3 border-r border-white/20 font-semibold text-center align-middle whitespace-nowrap min-w-[120px]"
                >
                  PO Require Date
                </th>
                <th
                  colSpan={4}
                  className="px-2 py-2 border-r border-white/20 font-semibold text-center border-b"
                >
                  APAT CONFIRM
                </th>
                <th
                  rowSpan={2}
                  className="px-2 py-3 font-semibold text-center align-middle whitespace-nowrap min-w-[80px]"
                >
                  Actions
                </th>
              </tr>
              <tr className="bg-[#008DD1] text-white text-xs uppercase tracking-wider">
                <th className="px-2 py-2 border-r border-white/20 font-semibold text-center whitespace-nowrap min-w-[100px]">
                  Ship Date
                </th>
                <th className="px-2 py-2 border-r border-white/20 font-semibold text-center whitespace-nowrap min-w-[80px]">
                  Qty
                </th>
                <th className="px-2 py-2 border-r border-white/20 font-semibold text-center whitespace-nowrap min-w-[100px]">
                  Owner
                </th>
                <th className="px-2 py-2 border-r border-white/20 font-semibold text-center whitespace-nowrap min-w-[150px]">
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
                    <td className="px-3 py-3 whitespace-nowrap text-center">
                      {row.customer}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-center">
                      {row.shipToPlant}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-center font-medium text-primary">
                      {row.poNumber}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-center">
                      {row.revision}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-center">
                      {row.poOrderDate}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-center">
                      {row.poLine}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      {row.partDescription}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-center">
                      {row.drawing}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-center">
                      {row.poQty}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-center">
                      {row.poRequireDate}
                    </td>
                    {/* APAT Confirm Columns */}
                    <td className="px-3 py-3 whitespace-nowrap text-center bg-blue-50/50">
                      {row.apatShipDate}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-center bg-blue-50/50">
                      {row.apatQty}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-center bg-blue-50/50">
                      {row.apatOwner}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-center bg-blue-50/50">
                      {row.apatRemark}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-center">
                      <button
                        className="p-1.5 text-primary hover:bg-primary/10 rounded-full transition-colors"
                        title="Edit"
                        onClick={() => handleEdit(row)}
                      >
                        <BiEdit size={18} />
                      </button>
                      <button
                        className="p-1.5 text-primary hover:bg-primary/10 rounded-full transition-colors"
                        title="Detail"
                        onClick={() => handleDetail(row)}
                      >
                        <BiDetail size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={15}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="border-t border-gray-200 bg-white px-4 py-3 flex items-center justify-end gap-4 sm:px-6">
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
      </div>

      <ConfirmpoEdit
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={selectedPo}
        onSave={handleSaveEdit}
      />

      <ConfirmpoDetail
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        data={selectedPo}
      />
    </div>
  );
};

export default Confirmpo;
