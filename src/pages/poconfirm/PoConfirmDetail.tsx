import React from "react";
import { Modal } from "ponyo-ui";
import {
  BiUser,
  BiBuilding,
  BiChevronLeft,
  BiChevronRight, // ใช้แค่ Left/Right ก็พอสำหรับแบบ Minimal
} from "react-icons/bi";

interface PoConfirmDetailProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
}

const PoConfirmDetail: React.FC<PoConfirmDetailProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  // Mock data
  const detailData = [
    {
      revision: "0",
      createDate: "13-Jan-26 15:04:52",
      poLine: "1",
      drawing: "-",
      poQty: 1500,
      unitPrice: 5.6,
      poRequireDate: "12-Feb-26",
      shipDate: "13-Feb-26",
      qty: 1500,
      owner: "KANITTHA",
      remark: "ให้ตรงกับแผนการผลิตงาน",
      confirmedDate: "13-Jan-26 15:34:12",
    },
    {
      revision: "1",
      createDate: "02-Feb-26 14:22:54",
      poLine: "1",
      drawing: "-",
      poQty: 1730,
      unitPrice: 5.6,
      poRequireDate: "13-Feb-26",
      shipDate: "-",
      qty: null,
      owner: "-",
      remark: "-",
      confirmedDate: "-",
    },
  ];

  // Helper component for info items
  const InfoItem = ({ icon, label, value, className = "" }: any) => (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
    >
      <div className="p-2 bg-blue-50 rounded-full text-[#008DD1]">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
          {label}
        </div>
        <div className="text-sm font-bold text-gray-900 truncate" title={value}>
          {value}
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title="PO Confirmation Detail"
      isOpen={isOpen}
      size="full"
      onClose={onClose}
    >
      <div className="flex flex-col h-full">
        {/* Top Info Section */}
        <div className="px-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoItem
              icon={<BiUser size={18} />}
              label="Customer"
              value="ASAHI TEC ALUMINIUM (THAILAND) CO.,LTD."
            />
            <InfoItem
              icon={<BiBuilding size={18} />}
              label="Ship To Plant"
              value="CHONBURI"
            />
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-blue-50 border border-blue-100 shadow-sm">
                <span className="text-xs font-bold text-blue-600">PO NO.</span>
                <span className="text-sm font-extrabold text-[#008DD1]">
                  PO 228067
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-500">SO NO.</span>
                <span className="text-sm font-extrabold text-gray-800">
                  112600058
                </span>
              </div>
            </div>
            <div className="p-3 rounded-lg border border-gray-200 bg-white shadow-sm space-y-2.5">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase">
                  Order Date
                </span>
                <span className="text-sm font-bold text-gray-900">
                  13-Jan-26
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">
                    Part No.
                  </span>
                  <span className="text-xs font-bold text-gray-900">
                    5-ATA-T1109
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-gray-600 truncate bg-gray-50 px-2 py-1 rounded">
                  M9T-1109 LOCATING RING
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="flex-1 px-4 py-2 overflow-hidden flex flex-col">
          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden flex-1 flex flex-col">
            {/* Scrollable Table Area */}
            <div className="overflow-auto flex-1">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="text-gray-700 bg-gray-100 font-bold sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th
                      rowSpan={2}
                      className="px-4 py-3 border-r border-gray-300 min-w-[80px] text-center bg-gray-200/50"
                    >
                      REV.
                    </th>
                    <th
                      rowSpan={2}
                      className="px-4 py-3 border-r border-gray-300 min-w-[140px] bg-gray-200/50"
                    >
                      CREATE DATE
                    </th>
                    <th
                      rowSpan={2}
                      className="px-4 py-3 border-r border-gray-300 min-w-[80px] text-center bg-gray-200/50"
                    >
                      PO LINE
                    </th>
                    <th
                      rowSpan={2}
                      className="px-4 py-3 border-r border-gray-300 min-w-[100px] bg-gray-200/50"
                    >
                      DRAWING
                    </th>
                    <th
                      rowSpan={2}
                      className="px-4 py-3 border-r border-gray-300 min-w-[100px] text-right bg-gray-200/50"
                    >
                      PO QTY
                    </th>
                    <th
                      rowSpan={2}
                      className="px-4 py-3 border-r border-gray-300 min-w-[100px] text-right bg-gray-200/50"
                    >
                      UNIT PRICE
                    </th>
                    <th
                      rowSpan={2}
                      className="px-4 py-3 border-r border-gray-300 min-w-[140px] text-center bg-gray-200/50"
                    >
                      PO REQ DATE
                    </th>
                    <th
                      colSpan={4}
                      className="px-4 py-2 text-center bg-[#007cb8] text-white border-b border-white/20 shadow-inner"
                    >
                      APAT CONFIRMATION
                    </th>
                    <th
                      rowSpan={2}
                      className="px-4 py-3 min-w-[140px] bg-[#007cb8] text-white text-center border-l border-white/20 shadow-inner"
                    >
                      CONFIRMED DATE
                    </th>
                  </tr>
                  <tr className="bg-[#008DD1] text-white">
                    <th className="px-4 py-2 font-bold border-r border-white/20 min-w-[120px] text-center">
                      SHIP DATE
                    </th>
                    <th className="px-4 py-2 font-bold border-r border-white/20 min-w-[100px] text-right">
                      QTY
                    </th>
                    <th className="px-4 py-2 font-bold border-r border-white/20 min-w-[120px]">
                      OWNER
                    </th>
                    <th className="px-4 py-2 font-bold min-w-[200px]">
                      REMARK
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {detailData.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-blue-50 transition-colors group"
                    >
                      <td className="px-4 py-3 border-r border-gray-200 text-center font-bold text-gray-700 bg-gray-50/80 group-hover:bg-blue-50/50">
                        {item.revision}
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200 text-gray-700 font-medium">
                        {item.createDate}
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200 text-center text-gray-700">
                        {item.poLine}
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200 text-gray-500 text-center">
                        {item.drawing || "-"}
                      </td>
                      <td
                        className={`px-4 py-3 border-r border-gray-200 text-right font-bold ${index === 1 ? "text-red-600" : "text-gray-800"}`}
                      >
                        {item.poQty?.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200 text-right text-gray-700 font-medium">
                        {item.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200 text-center text-gray-700 font-medium">
                        {item.poRequireDate}
                      </td>
                      <td
                        className={`px-4 py-3 border-r border-gray-200 text-center font-bold ${index === 0 ? "text-red-600 bg-red-50" : "text-gray-800"}`}
                      >
                        {item.shipDate || "-"}
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200 text-right font-bold text-[#008DD1]">
                        {item.qty?.toLocaleString() || "-"}
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200 text-gray-700 font-medium">
                        {item.owner || "-"}
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200 text-gray-600 italic">
                        {item.remark || "-"}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-700 font-medium">
                        {item.confirmedDate || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* --- Minimal Pagination --- */}
            <div className="border-t border-gray-200 bg-white px-4 py-2 flex items-center justify-end gap-4 text-xs">
              {/* Rows Selector */}
              <div className="flex items-center gap-2 text-gray-500">
                <span>Rows:</span>
                <select className="bg-transparent font-bold text-gray-700 focus:outline-none cursor-pointer border-none p-0 text-xs">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </div>

              {/* Divider */}
              <div className="h-3 w-px bg-gray-300"></div>

              {/* Page Count */}
              <span className="text-gray-500 font-medium">1-2 of 2</span>

              {/* Divider */}
              <div className="h-3 w-px bg-gray-300"></div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-1">
                <button
                  className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled
                >
                  <BiChevronLeft size={20} />
                </button>
                <button
                  className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled
                >
                  <BiChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PoConfirmDetail;
