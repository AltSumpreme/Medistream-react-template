export default function Topbar() {
  const role = localStorage.getItem("role") || "PATIENT";
  const name = localStorage.getItem("patientName") || "Patient";

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
        <p className="text-xs text-gray-500">Welcome back, {name}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="text-sm px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
