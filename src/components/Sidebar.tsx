import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  ClipboardList,
  FileText,
  Activity,
  Users,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const [role, setRole] = useState("PATIENT");
  const location = useLocation();

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) setRole(savedRole);
  }, []);

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

  const bottomLinks =
    role === "PATIENT"
      ? [{ name: "Users", path: "/patient/users", icon: Users }]
      : [];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 bg-blue-700 text-white hidden md:flex flex-col justify-between min-h-screen">
      {/* Logo Section */}
      <div className="flex flex-col flex-1">
        <div className="px-6 pt-6 pb-4 border-b border-blue-600">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white text-blue-700 font-bold flex items-center justify-center text-lg">
              M
            </div>
            <h1 className="text-xl font-extrabold tracking-tight select-none">
              Medistream
            </h1>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {mainLinks.map(({ name, path, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-150 ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-blue-100 hover:bg-blue-600/50 hover:text-white"
                }`}
              >
                <Icon
                  size={18}
                  className={`${
                    active ? "text-white" : "text-blue-200"
                  } shrink-0`}
                />
                <span className="truncate">{name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-blue-600 px-3 py-5">
        {bottomLinks.map(({ name, path, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-blue-100 hover:bg-blue-600/50 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span>{name}</span>
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="mt-3 flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium text-blue-100 hover:bg-blue-600/50 hover:text-white transition-all duration-150 w-full text-left"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

        <p className="text-xs text-blue-200 text-center mt-6 select-none">
          © {new Date().getFullYear()} Medistream
        </p>
      </div>
    </aside>
  );
}
