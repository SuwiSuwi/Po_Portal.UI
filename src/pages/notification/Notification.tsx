import React, { useState, useEffect } from "react";
import { usePageHeader } from "../../app/context/PageHeaderContext";
import { BiHome, BiBell } from "react-icons/bi";
import { DataTable } from "ponyo-ui";
import NotificationSearch from "./NotificationSearch";

interface NotificationData {
  id: string;
  customer: string;
  shipToPlant: string;
  customerPo: string;
  soNumber: string;
  soDate: string;
  status: string;
  notifiedDate: string;
  recipients: string;
}

const Notification: React.FC = () => {
  const { setPageHeader } = usePageHeader();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  const [data, setData] = useState<NotificationData[]>([]);
  const [selectedRows, setSelectedRows] = useState<NotificationData[]>([]);

  useEffect(() => {
    setPageHeader("Notification", [
      { label: "Home", href: "#", icon: <BiHome size={16} /> },
      { label: "Notification", icon: <BiBell size={16} /> },
    ]);
    handleSearch();
  }, [setPageHeader]);

  useEffect(() => {
    // Set default status if needed, or leave generic
    const defaultStatus = { label: "Pending", value: "Pending" };
    if (defaultStatus) {
      setSelectedStatus(defaultStatus);
    }
  }, []);

  const handleSearch = () => {
    const dummyData: NotificationData[] = [
      {
        id: "1",
        customer: "AIR SYSTEMS (THAILAND) CO.,LTD.",
        shipToPlant: "CHONBURI",
        customerPo: "PO B60210009",
        soNumber: "112600183",
        soDate: "06-Feb-26",
        status: "PENDING",
        notifiedDate: "",
        recipients: "",
      },
      {
        id: "2",
        customer: "ALLIANCE LAUNDRY (THAILAND) CO.,LTD.",
        shipToPlant: "CHONBURI",
        customerPo: "PO 5100027298",
        soNumber: "112600161",
        soDate: "30-Jan-26",
        status: "PENDING",
        notifiedDate: "",
        recipients: "",
      },
      {
        id: "3",
        customer: "ALLIANCE LAUNDRY (THAILAND) CO.,LTD.",
        shipToPlant: "CHONBURI",
        customerPo: "PO 5100027349",
        soNumber: "112600182",
        soDate: "06-Feb-26",
        status: "PENDING",
        notifiedDate: "",
        recipients: "",
      },
      {
        id: "4",
        customer: "ASIAN HONDA MOTOR CO.,LTD.",
        shipToPlant: "BANGWUA,BANGPAKONG CHACHOENG-SAO",
        customerPo: "PO 539872Q-10",
        soNumber: "112600035",
        soDate: "12-Jan-26",
        status: "PENDING",
        notifiedDate: "",
        recipients: "",
      },
      {
        id: "5",
        customer: "ASIAN HONDA MOTOR CO.,LTD.",
        shipToPlant: "BANGWUA,BANGPAKONG CHACHOENG-SAO",
        customerPo: "PO 539872Q-20",
        soNumber: "112600035",
        soDate: "12-Jan-26",
        status: "PENDING",
        notifiedDate: "",
        recipients: "",
      },
      {
        id: "6",
        customer: "ASIAN HONDA MOTOR CO.,LTD.",
        shipToPlant: "BANGWUA,BANGPAKONG CHACHOENG-SAO",
        customerPo: "PO 539872Q-20 / รอวัตถุดิบ / 12-01-26",
        soNumber: "112600035",
        soDate: "12-Jan-26",
        status: "PENDING",
        notifiedDate: "",
        recipients: "",
      },
      {
        id: "7",
        customer: "ASIAN HONDA MOTOR CO.,LTD.",
        shipToPlant: "BANGWUA,BANGPAKONG CHACHOENG-SAO",
        customerPo: "PO 545518Q-10",
        soNumber: "112600035",
        soDate: "12-Jan-26",
        status: "PENDING",
        notifiedDate: "",
        recipients: "",
      },
      {
        id: "8",
        customer: "ASIAN HONDA MOTOR CO.,LTD.",
        shipToPlant: "BANGWUA,BANGPAKONG CHACHOENG-SAO",
        customerPo: "PO 545518Q-20",
        soNumber: "112600035",
        soDate: "12-Jan-26",
        status: "PENDING",
        notifiedDate: "",
        recipients: "",
      },
      {
        id: "9",
        customer: "ASIAN HONDA MOTOR CO.,LTD.",
        shipToPlant: "BANGWUA,BANGPAKONG CHACHOENG-SAO",
        customerPo: "PO 554462Q-10",
        soNumber: "112600035",
        soDate: "12-Jan-26",
        status: "PENDING",
        notifiedDate: "",
        recipients: "",
      },
      {
        id: "10",
        customer: "ASIAN HONDA MOTOR CO.,LTD.",
        shipToPlant: "BANGWUA,BANGPAKONG CHACHOENG-SAO",
        customerPo: "PO 554462Q-20",
        soNumber: "112600035",
        soDate: "12-Jan-26",
        status: "PENDING",
        notifiedDate: "",
        recipients: "",
      },
    ];
    setData(dummyData);
  };

  const columns = [
    {
      id: "select",
      header: ({ table }: any) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }: any) => (
        <div className="text-center">
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </div>
      ),
      size: 50,
    },
    {
      header: "CUSTOMER",
      accessorKey: "customer",
      size: 300,
    },
    {
      header: "SHIP TO PLANT",
      accessorKey: "shipToPlant",
      size: 250,
    },
    {
      header: "CUSTOMERPO",
      accessorKey: "customerPo",
      size: 200,
    },
    {
      header: "SO NUMBER",
      accessorKey: "soNumber",
      size: 200,
    },
    {
      header: "SO DATE",
      accessorKey: "soDate",
      size: 200,
    },
    {
      header: "STATUS",
      accessorKey: "status",
      cell: ({ getValue }: any) => (
        <span className="px-2 py-1 rounded-full text-xs font-semibold border border-yellow-400 text-yellow-600 bg-white">
          {getValue()}
        </span>
      ),
    },
    {
      header: "NOTIFIED DATE",
      accessorKey: "notifiedDate",
      size: 200,
    },
    {
      header: "RECIPIENTS",
      accessorKey: "recipients",
      size: 200,
    },
  ];

  return (
    <div className="px-6 py-2">
      {/* Search Filters */}
      <NotificationSearch
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onSearch={handleSearch}
        onSendEmail={() => {}} // Placeholder as original code didn't have handler logic inline
        hasSelectedRows={selectedRows.length > 0}
      />

      {/* Table */}
      <DataTable
        data={data}
        columns={columns}
        initialEnableActions={false}
        initialEnableRowSelection={true}
        onRowSelect={setSelectedRows}
        exportFileName="Notification"
      />
    </div>
  );
};

export default Notification;
