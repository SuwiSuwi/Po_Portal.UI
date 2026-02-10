import React, { useEffect, useState } from "react";
import { Button, Modal } from "ponyo-ui";

interface RecipientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

const RecipientModal: React.FC<RecipientModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    employeeCode: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        employeeCode: initialData.employeeCode || "",
        name: initialData.name || "",
        email: initialData.email || "",
      });
    } else {
      setFormData({
        employeeCode: "",
        name: "",
        email: "",
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
      title={initialData ? "Edit Recipient" : "Add New Recipient"}
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
          <label className="text-sm font-medium text-gray-700">
            Employee Code
          </label>
          <input
            type="text"
            name="employeeCode"
            value={formData.employeeCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="Enter employee code"
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
            placeholder="Enter recipient name"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="Enter email address"
            required
          />
        </div>
      </form>
    </Modal>
  );
};

export default RecipientModal;
