import { useState, useRef, useEffect } from "react";
import { BiLogOut, BiUser, BiCog, BiChevronDown } from "react-icons/bi";

export interface NavbarUser {
  id: string;
  name: string;
  role: string;
}

export interface NavbarCompany {
  name: string;
  logo?: string;
}

interface NavbarProps {
  user: NavbarUser;
  company: NavbarCompany;
  onLogout: () => void;
}

export const Navbar = ({ user, company, onLogout }: NavbarProps) => {
  const { logo, name } = company;
  const defaultLogo = "https://placehold.co/600x400";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full h-16 bg-bg-sidebar shadow-sm border-b border-text-muted/10 flex items-center justify-between px-6 z-30 relative">
      <div className="flex items-center gap-3">
        <img
          src={logo || defaultLogo}
          alt="Logo"
          className="h-8 w-auto object-contain"
        />
        <div className="hidden md:block h-6 w-px bg-gray-200 mx-2"></div>
        <span className="hidden md:block font-bold text-text-main text-lg tracking-tight">
          {name}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-6 w-px bg-gray-200 hidden sm:block mx-2"></div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 hover:bg-bg-main p-2 rounded-lg transition-colors"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-text-main">{user.name}</p>
              <p className="text-xs text-text-muted">{user.id}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <BiUser size={20} />
            </div>
            <BiChevronDown
              className={`text-text-muted transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-text-muted/10 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 border-b border-gray-100 bg-bg-main/50">
                <p className="text-sm font-bold text-text-main">Signed in as</p>
                <p className="text-xs text-text-muted truncate">
                  {user.name} ({user.role})
                </p>
              </div>

              <div className="p-1">
                <button className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-text-main hover:bg-bg-main rounded-lg transition-colors">
                  <BiUser className="text-text-muted" /> My Profile
                </button>
                <button className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-text-main hover:bg-bg-main rounded-lg transition-colors">
                  <BiCog className="text-text-muted" /> Settings
                </button>
              </div>

              <div className="p-1 border-t border-gray-100">
                <button
                  onClick={onLogout}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <BiLogOut /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
