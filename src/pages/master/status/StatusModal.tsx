import React, { useEffect, useState } from "react";
import { Button, Modal } from "ponyo-ui";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    prefix: "",
    name: "",
    description: "",
    value: "",
    sort: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        prefix: initialData.prefix || "",
        name: initialData.name || "",
        description: initialData.description || "",
        value: initialData.value || "",
        sort: initialData.sort || 0,
      });
    } else {
      setFormData({
        prefix: "",
        name: "",
        description: "",
        value: "",
        sort: 0,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Status" : "Add New Status"}
      size="md"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="danger" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="px-4 py-2 space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Prefix</label>
          <input
            type="text"
            name="prefix"
            value={formData.prefix}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="Enter prefix"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="Enter status name"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="Enter description"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Value</label>
            <input
              type="text"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="Enter value"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Sort</label>
            <input
              type="number"
              name="sort"
              value={formData.sort}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="0"
              required
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default StatusModal;
