export default function AppointmentCard({
  id,
  doctorName,
  specialization,
  appointmentDate,
  status,
  onCancel,
  onReschedule,
}: any) {
  const date = new Date(appointmentDate).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const statusColors: Record<string, string> = {
    CONFIRMED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Dr. {doctorName}
          </h3>
          <p className="text-sm text-gray-500">{specialization}</p>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            statusColors[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-4">
        Appointment Date:{" "}
        <span className="font-medium text-gray-900">{date}</span>
      </p>

      <div className="flex gap-3">
        {status !== "CANCELLED" && (
          <>
            <button
              onClick={() => onReschedule?.(id)}
              className="px-4 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
            >
              Reschedule
            </button>
            <button
              onClick={() => onCancel?.(id)}
              className="px-4 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
