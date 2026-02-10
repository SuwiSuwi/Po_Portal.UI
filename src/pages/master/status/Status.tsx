import React, { useState, useEffect } from "react";
import { usePageHeader } from "../../../app/context/PageHeaderContext";
import { BiHome, BiPlus, BiEdit, BiTrash, BiCheckCircle } from "react-icons/bi";
import { DataTable } from "ponyo-ui";
import StatusModal from "./StatusModal";

interface StatusData {
  id: string;
  prefix: string;
  name: string;
  description: string;
  value: string;
  sort: number;
}

const Status: React.FC = () => {
  const { setPageHeader } = usePageHeader();
  const [data, setData] = useState<StatusData[]>([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StatusData | null>(null);

  useEffect(() => {
    setPageHeader("Status", [
      { label: "Home", href: "#", icon: <BiHome size={16} /> },
      { label: "Setting", href: "#" },
      { label: "Status", icon: <BiCheckCircle size={16} /> },
    ]);

    // Mock Data
    const dummyData: StatusData[] = Array.from({ length: 10 }, (_, i) => ({
      id: (i + 1).toString(),
      prefix: `ST-${i + 1}`,
      name: `Status ${i + 1}`,
      description: `Description for status ${i + 1}`,
      value: `${i + 1}`,
      sort: i + 1,
    }));
    setData(dummyData);
  }, [setPageHeader]);

  const handleEdit = (item: StatusData) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: StatusData) => {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
      setData((prev) => prev.filter((i) => i.id !== item.id));
    }
  };

  const handleSave = (formData: any) => {
    if (editingItem) {
      // Update existing
      setData((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...item, ...formData } : item,
        ),
      );
    } else {
      // Add new
      const newId = (data.length + 1).toString();
      const newItem: StatusData = {
        id: newId,
        ...formData,
      };
      setData((prev) => [...prev, newItem]);
    }
  };

  const columns = [
    {
      header: "Prefix",
      accessorKey: "prefix",
      cell: ({ getValue }: any) => (
        <div className="text-center">{getValue()}</div>
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ getValue }: any) => (
        <div className="text-center">{getValue()}</div>
      ),
    },
    { header: "Description", accessorKey: "description", size: 200 },
    {
      header: "Value",
      accessorKey: "value",
      cell: ({ getValue }: any) => (
        <div className="text-center">{getValue()}</div>
      ),
    },
    {
      header: "Sort",
      accessorKey: "sort",
      cell: ({ getValue }: any) => (
        <div className="text-center">{getValue()}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      size: 100,
      cell: ({ row }: any) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="p-1.5 bg-primary hover:bg-primary/80 text-white rounded"
            title="Edit"
          >
            <BiEdit size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.original)}
            className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded"
            title="Delete"
          >
            <BiTrash size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="px-6 py-2">
      <DataTable
        data={data}
        columns={columns}
        initialEnableActions={true}
        initialEnableRowSelection={false}
        customActions={
          <button
            className="px-2 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary/20 hover:text-primary transition-colors duration-500 flex items-center gap-2"
            onClick={() => {
              setEditingItem(null);
              setIsModalOpen(true);
            }}
          >
            <BiPlus className="w-5 h-5" />
            <span className="text-sm">เพิ่มข้อมูล</span>
          </button>
        }
        exportFileName="Status"
      />

      <StatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingItem}
      />
    </div>
  );
};

export default Status;
