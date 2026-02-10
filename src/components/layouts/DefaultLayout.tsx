import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../../pages/common/layout/Sidebar";
import { Breadcrumbs, Label } from "ponyo-ui";
import { Navbar } from "../../pages/common/layout/Navbar";
import logoAPAT from "../../assets/images/APAT-logo.jpg";
import { logout } from "../../app/auth/authSlice";
import { useDispatch } from "react-redux";
import { usePageHeader } from "../../app/context/PageHeaderContext";
import { menuSections } from "../../config/menu";

const DefaultLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const showSidebar = location.pathname !== "/";

  const user = {
    id: "16011002",
    name: "Admin.",
    role: "Admin",
  };

  const { title, breadcrumbs } = usePageHeader();
  const dispatch = useDispatch();

  const companyInfo = {
    name: "APAT",
    logo: logoAPAT,
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex h-screen bg-bg-main overflow-hidden">
      {/* <CommandPalette commands={commands} /> */}
      {showSidebar && (
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          openSidebar={() => setIsSidebarCollapsed(false)}
          menuItems={menuSections}
        />
      )}
      {/* <HelpWidget /> */}
      <div className="relative flex-1 flex flex-col overflow-hidden transition-all duration-300">
        <Navbar user={user} company={companyInfo} onLogout={handleLogout} />
        <main className="relative flex-1 overflow-y-auto pt-4 scrollbar-thin">
          {(title || breadcrumbs.length > 0) && (
            <div className="flex justify-between items-center">
              {title && (
                <Label className="ml-6 text-2xl font-bold text-gray-800">
                  {title}
                </Label>
              )}
              {breadcrumbs.length > 0 && (
                <div>
                  <Breadcrumbs
                    useRouter={false}
                    items={breadcrumbs.map((item, index) => {
                      const isLast = index === breadcrumbs.length - 1;
                      const { href, ...rest } = item;
                      return isLast ? rest : item;
                    })}
                  />
                </div>
              )}
            </div>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
