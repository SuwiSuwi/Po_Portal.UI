import React from "react";
import { BiSearch, BiDownload } from "react-icons/bi";
import { Button, AutoComplete, DatePicker } from "ponyo-ui";

interface PoConfirmSearchProps {
  fromDate: string;
  setFromDate: (date: string) => void;
  toDate: string;
  setToDate: (date: string) => void;
  selectedCustomer: any;
  setSelectedCustomer: (customer: any) => void;
  selectedStatus: any;
  setSelectedStatus: (status: any) => void;
  onSearch: () => void;
  onExport: () => void;
}

const customerOptions = [
  { label: "ASIAN HONDA MOTOR CO.,LTD.", value: "ASIAN HONDA" },
  { label: "ALLIANCE LAUNDRY", value: "ALLIANCE LAUNDRY" },
];

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "Confirmed", value: "Confirmed" },
];

const PoConfirmSearch: React.FC<PoConfirmSearchProps> = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  selectedCustomer,
  setSelectedCustomer,
  selectedStatus,
  setSelectedStatus,
  onSearch,
  onExport,
}) => {
  return (
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
              onClick={onSearch}
              className="w-1/2 justify-center"
              leftIcon={<BiSearch size={18} />}
            >
              Search
            </Button>
            <Button
              variant="secondary"
              onClick={onExport}
              className="w-1/2 justify-center"
              leftIcon={<BiDownload size={18} />}
            >
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoConfirmSearch;
