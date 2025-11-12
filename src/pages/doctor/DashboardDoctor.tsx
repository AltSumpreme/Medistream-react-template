import DashboardLayout from "../../layouts/DashboardLayout";

export default function DashboardDoctor() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            My Patients
          </h3>
          <p className="text-sm text-gray-600">
            Manage patients under your care.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Reports Uploaded
          </h3>
          <p className="text-sm text-gray-600">
            Review and upload patient reports.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Medical Records
          </h3>
          <p className="text-sm text-gray-600">
            Access and update medical records.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
