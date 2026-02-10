// src/components/layout/SidebarMenuItem.tsx
import { useState, type ReactNode, useEffect } from "react";
// import { type MenuItem } from "@/types/menu";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "../../../components/ui/Tooltip";

export interface MenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  path?: string; // ถ้ามี path คือลิ้งค์, ถ้าไม่มี path อาจจะเป็นหัวข้อเมนูที่มีลูก
  subItems?: MenuItem[]; // ✅ ตัวนี้แหละที่ทำให้เป็น Multi-level
}
interface SidebarMenuItemProps {
  item: MenuItem;
  isCollapsed: boolean;
  activeMenu: string;
  setActiveMenu: (id: string) => void;
  openSidebar: () => void;
}

export const SidebarMenuItem = ({
  item,
  isCollapsed,
  activeMenu,
  setActiveMenu,
  openSidebar,
}: SidebarMenuItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.subItems && item.subItems.length > 0;
  const isChildActive = hasChildren && item.subItems?.some((sub) => sub.id === activeMenu);
  const isActive = activeMenu === item.id || isChildActive; const navigate = useNavigate();

  // Auto-expand if a child is active
  useEffect(() => {
    if (isChildActive) {
      setIsExpanded(true);
    }
  }, [isChildActive]);
  const handleClick = () => {
    if (isCollapsed) {
      openSidebar();
    }
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      setActiveMenu(item.id);
      if (item.path) {
        navigate(item.path);
      }
    }
  };

  const buttonContent = (
    <button
      onClick={handleClick}
      className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 group
        ${isActive && !hasChildren
          ? "bg-primary text-white shadow-md"
          : "text-text-muted hover:bg-bg-main hover:text-text-main"
        }
      `}
    >
      <div
        className={`shrink-0 transition-colors ${isActive && !hasChildren
          ? "text-white"
          : isChildActive ? "text-text-muted" : ""
          }`}
      >
        {item.icon}
      </div>
      <div
        className={`flex flex-1 items-center justify-between ml-4 overflow-hidden transition-all duration-300
          ${isCollapsed
            ? "w-0 opacity-0 translate-x-[-10px]"
            : "w-auto opacity-100 translate-x-0"
          }
      `}
      >
        <span className="truncate" title={item.label}>{item.label}</span>

        {/* แสดงลูกศร ถ้ามีลูก */}
        {hasChildren && (
          <div className="text-gray-400">
            {isExpanded ? <BiChevronDown /> : <BiChevronRight />}
          </div>
        )}
      </div>
    </button>
  );

  return (
    <div className="mb-1">
      {isCollapsed ? (
        <Tooltip content={item.label} position="right" className="w-full">
          {buttonContent}
        </Tooltip>
      ) : (
        buttonContent
      )}

      {/* ส่วนลูกเมนู (Children / Submenu) */}
      {hasChildren && !isCollapsed && (
        <div
          className={`pl-12 overflow-hidden transition-all duration-500 ease-in-out space-y-1
            ${isExpanded
              ? "max-h-[2000px] opacity-100 mt-1"
              : "max-h-0 opacity-0"
            }
          `}
        >
          {item.subItems!.map((subItem) => (
            <button
              key={subItem.id}
              onClick={() => {
                setActiveMenu(subItem.id);
                if (subItem.path) {
                  navigate(subItem.path);
                }
              }}
              className={`w-full text-left p-2 text-sm rounded-md transition-colors
                ${activeMenu === subItem.id
                  ? "text-primary bg-primary/10 font-medium"
                  : "text-text-muted hover:text-text-main hover:bg-bg-main"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className="shrink-0 transition-colors scale-75">
                  {subItem.icon}
                </div>
                <span className="whitespace-nowrap flex-1">
                  {subItem.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
