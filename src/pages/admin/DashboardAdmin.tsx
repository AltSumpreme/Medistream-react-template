import DashboardLayout from "../../layouts/DashboardLayout";

export default function DashboardAdmin() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            User Management
          </h3>
          <p className="text-sm text-gray-600">
            View, edit, and promote users.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            System Insights
          </h3>
          <p className="text-sm text-gray-600">
            Monitor activity and performance metrics.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
