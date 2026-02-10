import {
  BiGridAlt,
  BiCheckCircle,
  BiBell,
  BiClipboard,
  BiData,
  BiUser,
  BiUserPin,
  BiPurchaseTag,
} from "react-icons/bi";

export const menuSections = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <BiGridAlt size={24} />,
    path: "/",
    description: "Overview of system status",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "notification",
    label: "Notification",
    icon: <BiBell size={24} />,
    path: "/notification",
    description: "View and manage alerts",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: "confirmpo",
    label: "Confirm PO",
    icon: <BiCheckCircle size={24} />,
    path: "/confirmpo",
    description: "Approve pending purchase orders",
    color: "bg-green-100 text-green-600",
  },

  {
    id: "poconfirm",
    label: "PO Confirmation",
    icon: <BiClipboard size={24} />,
    path: "/poconfirm",
    description: "Track PO confirmation status",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "master",
    label: "Masters",
    icon: <BiData size={24} />,
    subItems: [
      {
        id: "customer",
        label: "Customer",
        icon: <BiUser size={24} />,
        path: "/customer",
        description: "Manage customer information",
        color: "bg-teal-100 text-teal-600",
      },
      {
        id: "recipient",
        label: "Recipient",
        icon: <BiUserPin size={24} />,
        path: "/recipient",
        description: "Manage shipment recipients",
        color: "bg-orange-100 text-orange-600",
      },
      {
        id: "status",
        label: "Status",
        icon: <BiPurchaseTag size={24} />,
        path: "/status",
        description: "Configure PO status workflows",
        color: "bg-pink-100 text-pink-600",
      },
    ],
  },
];

export const settingItems = [
  {
    id: "customer",
    label: "Customer Management",
    icon: <BiUser size={24} />,
    path: "/customer",
  },
  {
    id: "recipient",
    label: "Recipient Management",
    icon: <BiUserPin size={24} />,
    path: "/recipient",
  },
  {
    id: "status",
    label: "Status Configuration",
    icon: <BiPurchaseTag size={24} />,
    path: "/status",
  },
];
