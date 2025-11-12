import { useEffect, useState } from "react";
import {
  getUsers,
  promoteUserToDoctor,
  updateUser,
} from "../services/usersapi";
import type { User } from "../services/usersapi";
import UserCard from "../components/UserCard";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [refreshKey, setRefreshKey] = useState(0);

  const role = localStorage.getItem("role") || "PATIENT";
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const roleQuery = roleFilter !== "ALL" ? roleFilter : undefined;
      const data = await getUsers(roleQuery);
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role === "ADMIN") fetchUsers();
    else setLoading(false); // For doctor/patient, no fetch needed
  }, [refreshKey, roleFilter]);

  const handlePromote = async (id: string) => {
    const specialization = prompt("Enter specialization for this doctor:");
    if (!specialization) return;
    await promoteUserToDoctor(id, specialization);
    setRefreshKey((k) => k + 1);
  };

  const handleEdit = async (id: string) => {
    const newName = prompt("Enter new name:");
    if (!newName) return;
    await updateUser(id, { name: newName });
    setRefreshKey((k) => k + 1);
  };

  const filtered =
    role === "ADMIN"
      ? users.filter(
          (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  if (loading)
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-screen text-gray-600 text-sm">
          Loading...
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
            {role === "ADMIN" ? "User Management" : "Profile"}
          </h1>
          {role === "ADMIN" && (
            <div className="text-sm text-gray-500">
              Total Users: {users.length}
            </div>
          )}
        </div>

        {role === "ADMIN" ? (
          <>
            {/* Filters for Admin */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 mb-8 flex flex-col sm:flex-row justify-between gap-4">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none flex-1 text-sm"
              />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              >
                <option value="ALL">All Roles</option>
                <option value="PATIENT">Patients</option>
                <option value="DOCTOR">Doctors</option>
                <option value="ADMIN">Admins</option>
              </select>
            </div>

            {/* User List for Admin */}
            {filtered.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 text-sm shadow-sm">
                No users found.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((user, i) => (
                  <div
                    key={user.id}
                    className="transition-transform duration-150 hover:-translate-y-1"
                    style={{
                      animation: `fadeIn 0.3s ease ${i * 0.05}s both`,
                    }}
                  >
                    <UserCard
                      user={user}
                      onPromote={handlePromote}
                      onEdit={handleEdit}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          // Profile-style view for Doctor / Patient
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
            <UserCard user={currentUser} />
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </DashboardLayout>
  );
}
