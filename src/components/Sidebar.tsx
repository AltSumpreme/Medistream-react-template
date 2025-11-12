import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  ClipboardList,
  FileText,
  Activity,
  Users,
} from "lucide-react";

export default function Sidebar() {
  const [role, setRole] = useState("PATIENT");
  const location = useLocation();

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) setRole(savedRole);
  }, []);

  // Main navigation group (top)
  const mainLinks =
    role === "PATIENT"
      ? [
          { name: "Dashboard", path: "/patient", icon: LayoutDashboard },
          { name: "Appointments", path: "/patient/appointments", icon: CalendarCheck },
          { name: "Prescriptions", path: "/patient/prescriptions", icon: ClipboardList },
          { name: "Medical Reports", path: "/patient/reports", icon: FileText },
          { name: "Vitals", path: "/patient/vitals", icon: Activity },
          { name: "Medical Records", path: "/patient/medical-records", icon: FileText },
        ]
      : [];

  // Bottom navigation
  const bottomLinks =
    role === "PATIENT"
      ? [{ name: "Users", path: "/patient/users", icon: Users }]
      : [];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-sm hidden md:flex flex-col justify-between min-h-screen">
      {/* Top section */}
      <div className="flex flex-col flex-1">
        {/* Logo */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight select-none">
            Medistream
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {mainLinks.map(({ name, path, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                  active
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                <Icon
                  size={18}
                  className={`${
                    active ? "text-blue-700" : "text-gray-500"
                  } shrink-0`}
                />
                <span className="truncate">{name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-100 p-4">
        {bottomLinks.map(({ name, path, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                active
                  ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              }`}
            >
              <Icon
                size={18}
                className={active ? "text-blue-700" : "text-gray-500"}
              />
              <span>{name}</span>
            </Link>
          );
        })}

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6 select-none">
          © {new Date().getFullYear()} Medistream
        </p>
      </div>
    </aside>
  );
}
