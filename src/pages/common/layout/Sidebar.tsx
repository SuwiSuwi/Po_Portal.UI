// src/components/layout/Sidebar.tsx
import { useState, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { SidebarMenuItem } from "./SidebarMenuItem";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  menuItems: any[]; // Ideally this should be typed properly, e.g., MenuItem[]
}

export const Sidebar = ({
  isCollapsed,
  toggleSidebar,
  openSidebar,
  menuItems,
}: SidebarProps) => {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // Update activeMenu based on current URL path
  useEffect(() => {
    const currentPath = location.pathname;

    // Find matching menu item based on path
    for (const item of menuItems) {
      // Check if it's a direct match (e.g., /dashboard)
      if (item.path && currentPath === item.path) {
        setActiveMenu(item.id);
        return;
      }

      // Check subitems
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (subItem.path && currentPath === subItem.path) {
            setActiveMenu(subItem.id);
            return;
          }
        }
      }
    }
  }, [location.pathname, menuItems]);

  // Debug log
  // console.log(
  //   "Sidebar rendering with menuItems:",
  //   menuItems,
  //   "isCollapsed:",
  //   isCollapsed,
  // );

  return (
    <aside
      onClick={() => {
        if (isCollapsed) openSidebar();
      }}
      className={`relative h-screen bg-bg-sidebar border-r border-text-muted/20 transition-all duration-300 ease-in-out flex flex-col shadow-lg
        ${isCollapsed ? "w-20" : "w-64"}
      `}
      style={{ minWidth: isCollapsed ? "80px" : "256px" }}
    >
      <div className="h-16 flex items-center justify-center border-b border-text-muted/20 relative bg-white">
        {!isCollapsed && (
          <span className="font-bold text-primary text-lg">PO Portal</span>
        )}
        {isCollapsed && (
          <span className="font-bold text-primary text-sm">PO</span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
          className="absolute right-[-12px] top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:text-primary text-gray-500 z-50"
        >
          {isCollapsed ? (
            <BiChevronRight size={20} />
          ) : (
            <BiChevronLeft size={20} />
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin">
        {menuItems && menuItems.length > 0 ? (
          menuItems.map((item) => (
            <SidebarMenuItem
              key={item.id}
              item={item}
              isCollapsed={isCollapsed}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              openSidebar={openSidebar}
            />
          ))
        ) : (
          <div className="text-center text-text-muted text-sm p-4">
            No menu items
          </div>
        )}
      </div>

      {/* <div className="p-3 border-t border-text-muted/20">
        <button className="flex items-center w-full p-3 rounded-lg text-text-muted hover:bg-red-50 hover:text-red-500 transition-colors overflow-hidden">
          <div className="flex-shrink-0"><BiLogOut size={24} /></div>
           <span className={`whitespace-nowrap ml-4 transition-all duration-300 ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
              Logout
            </span>
        </button>
      </div> */}
    </aside>
  );
};
