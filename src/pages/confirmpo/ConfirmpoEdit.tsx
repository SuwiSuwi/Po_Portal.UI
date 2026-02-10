import React, { useState, useEffect } from "react";
import { Modal, Button } from "ponyo-ui";
import { BiUser, BiClipboard, BiCalendar, BiPackage } from "react-icons/bi";

interface ConfirmPoEditProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  onSave: (data: any) => void;
}

const ConfirmpoEdit: React.FC<ConfirmPoEditProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    confirmQty: 0,
    confirmShipDate: "",
    remark: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        confirmQty: data.apatQty || data.poQty || 0,
        confirmShipDate: data.apatShipDate || "",
        remark: data.apatRemark || "",
      });
    }
  }, [data, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave({ ...data, ...formData });
    onClose();
  };

  if (!data) return null;

  // Helper component for info items (Reused style for consistency)
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
      isOpen={isOpen}
      onClose={onClose}
      title="CONFIRM PO"
      size="xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            variant="danger"
            onClick={onClose}
            className="rounded-lg px-6"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="rounded-lg px-6 bg-[#008DD1] hover:bg-[#007cb8] border-none text-white shadow-md shadow-blue-200"
          >
            Save Confirmation
          </Button>
        </div>
      }
    >
      <div className="px-4 space-y-4 bg-gray-50/30">
        {/* --- Header Info Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer */}
          <InfoItem
            icon={<BiUser size={18} />}
            label="Customer"
            value={data.customer}
            className="md:col-span-2"
          />

          {/* PO Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 shadow-sm">
              <div className="flex items-center gap-2">
                <BiClipboard className="text-blue-500" />
                <span className="text-xs font-bold text-blue-600 uppercase">
                  PO NO.
                </span>
              </div>
              <span className="text-sm font-extrabold text-[#008DD1]">
                {data.poNumber}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2">
                <BiCalendar className="text-gray-400" />
                <span className="text-xs font-bold text-gray-500 uppercase">
                  Req Date
                </span>
              </div>
              <span className="text-sm font-bold text-gray-800">
                {data.poRequireDate}
              </span>
            </div>
          </div>

          {/* Part Info */}
          <div className="p-3 rounded-lg border border-gray-200 bg-white shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-[11px] font-bold text-gray-500 uppercase flex items-center gap-1">
                <BiPackage /> Part No.
              </span>
              <span className="text-xs font-bold text-gray-900">
                {data.drawing}
              </span>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">
                Part Description
              </div>
              <div className="text-xs font-semibold text-gray-700 bg-gray-50 px-2 py-1.5 rounded border border-gray-100">
                {data.partDescription}
              </div>
            </div>
          </div>
        </div>

        {/* --- Input Form Section --- */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <span className="w-2 h-6 bg-[#008DD1] rounded-full"></span>
              Confirmation Details
            </h3>
            <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
              PO Qty:{" "}
              <span className="font-bold text-gray-800">
                {Number(data.poQty).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Qty & Date */}
            <div className="space-y-4">
              {/* Confirm Quantity */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Confirm Qty <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="confirmQty"
                    value={formData.confirmQty}
                    onChange={handleChange}
                    className="w-full pl-3 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#008DD1]/20 focus:border-[#008DD1] transition-all bg-white"
                    placeholder="0"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-xs font-medium text-gray-400">
                    PCS
                  </div>
                </div>
              </div>

              {/* Confirm Ship Date */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Confirm Ship Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="confirmShipDate"
                    value={formData.confirmShipDate}
                    onChange={handleChange}
                    className="w-full pl-3 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#008DD1]/20 focus:border-[#008DD1] transition-all bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Remark */}
            <div className="flex flex-col h-full">
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                Remark
              </label>
              <textarea
                name="remark"
                value={formData.remark}
                onChange={handleChange}
                className="w-full flex-1 p-3 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#008DD1]/20 focus:border-[#008DD1] transition-all bg-white resize-none min-h-[108px]"
                placeholder="Add optional notes here..."
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmpoEdit;
