import React, { useState, useEffect } from "react";
import { usePageHeader } from "../../../app/context/PageHeaderContext";
import {
  BiHome,
  BiUser,
  BiRadioCircle,
  BiRadioCircleMarked,
} from "react-icons/bi";
import { DataTable } from "ponyo-ui";

interface CustomerData {
  id: string;
  name: string;
  description: string;
  confirmPo?: boolean;
}

const Customer: React.FC = () => {
  const { setPageHeader } = usePageHeader();
  const [data, setData] = useState<CustomerData[]>([]);

  useEffect(() => {
    setPageHeader("Customer", [
      { label: "Home", href: "#", icon: <BiHome size={16} /> },
      { label: "Setting", href: "#" },
      { label: "Customer", icon: <BiUser size={16} /> },
    ]);

    // Mock Data
    const dummyData: CustomerData[] = Array.from({ length: 15 }, (_, i) => ({
      id: (i + 1).toString(),
      name: `Customer ${String.fromCharCode(65 + i)}`,
      description: `Description for Customer ${String.fromCharCode(65 + i)}`,
      confirmPo: i % 2 === 0,
    }));
    setData(dummyData);
  }, [setPageHeader]);

  const handleToggleConfirm = (id: string, value: boolean) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, confirmPo: value } : item,
      ),
    );
  };

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ getValue }: any) => (
        <div className="text-center">{getValue()}</div>
      ),
    },
    {
      header: "Confirm PO",
      accessorKey: "confirmPo",
      cell: ({ row, getValue }: any) => {
        const isConfirmed = getValue();
        return (
          <div className="flex justify-center items-center gap-4">
            {/* YES Option */}
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => handleToggleConfirm(row.original.id, true)}
            >
              {isConfirmed ? (
                <BiRadioCircleMarked className="text-red-600" size={24} />
              ) : (
                <BiRadioCircle className="text-gray-400" size={24} />
              )}
              <span
                className={`text-xs font-semibold ${
                  isConfirmed ? "text-gray-700" : "text-gray-400"
                }`}
              >
                YES
              </span>
            </div>

            {/* NO  */}
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => handleToggleConfirm(row.original.id, false)}
            >
              {!isConfirmed ? (
                <BiRadioCircleMarked className="text-red-600" size={24} />
              ) : (
                <BiRadioCircle className="text-gray-400" size={24} />
              )}
              <span
                className={`text-xs font-semibold ${
                  !isConfirmed ? "text-gray-700" : "text-gray-400"
                }`}
              >
                NO
              </span>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="px-6 py-2">
      <DataTable
        data={data}
        columns={columns}
        initialEnableActions={false}
        initialEnableRowSelection={false}
        exportFileName="Customer"
      />
    </div>
  );
};

export default Customer;
