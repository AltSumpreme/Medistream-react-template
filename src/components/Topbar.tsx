export default function Topbar() {
  const role = localStorage.getItem("role") || "PATIENT";
  const userName = localStorage.getItem("userName") || localStorage.getItem("patientName") || "User";
  
  // Get proper role display name
  const getRoleName = () => {
    switch(role) {
      case "DOCTOR": return "Doctor";
      case "ADMIN": return "Admin";
      case "PATIENT": return "Patient";
      default: return "User";
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {role === "DOCTOR"
            ? "Doctor Dashboard"
            : role === "ADMIN"
            ? "Admin Dashboard"
            : "Patient Dashboard"}
        </h2>
        <p className="text-xs text-gray-500">Welcome back, {userName} ({getRoleName()})</p>
      </div>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        className="text-sm font-medium text-gray-600 hover:text-blue-600 transition bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200"
      >
        Logout
      </button>
    </header>
  );
}
