import DashboardLayout from "../../layouts/DashboardLayout";

export default function DashboardPatient() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Upcoming Appointments
          </h3>
          <p className="text-sm text-gray-600">Check your upcoming visits.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Active Prescriptions
          </h3>
          <p className="text-sm text-gray-600">
            Review your prescribed medications.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Latest Reports
          </h3>
          <p className="text-sm text-gray-600">
            View your diagnostic reports securely.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
