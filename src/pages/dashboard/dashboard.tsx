import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { menuSections } from "../../config/menu";
import { usePageHeader } from "../../app/context/PageHeaderContext";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { clearPageHeader } = usePageHeader();

  useEffect(() => {
    clearPageHeader();
  }, [clearPageHeader]);

  const MenuCard = ({ item }: { item: any }) => (
    <div
      onClick={() => item.path && navigate(item.path)}
      className="bg-white px-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 flex flex-col items-center justify-center gap-4 h-48 group hover:-translate-y-1"
    >
      <div
        className={`p-4 rounded-full ${
          item.color || "bg-primary/5 text-primary"
        } group-hover:bg-primary transition-colors duration-300 transform group-hover:scale-110`}
      >
        {item.icon}
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-700 group-hover:text-primary transition-colors">
          {item.label}
        </h3>
        {item.description && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2 px-2">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto animation-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to PO Portal
        </h1>
        <p className="text-gray-500 mt-2">Select a menu to get started</p>
      </div>

      {/* Main Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-10">
        {menuSections
          .filter(
            (item) => item.id !== "dashboard" && !item.subItems && item.path,
          )
          .map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
      </div>

      {/* Sections with Sub Items (e.g. Master Data) */}
      {menuSections
        .filter((item) => item.subItems)
        .map((section) => (
          <div key={section.id} className="mb-10">
            <h2 className="text-xl font-bold text-gray-700 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
              <span className="text-primary">{section.icon}</span>
              {section.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {section.subItems?.map((subItem: any) => (
                <MenuCard key={subItem.id} item={subItem} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
