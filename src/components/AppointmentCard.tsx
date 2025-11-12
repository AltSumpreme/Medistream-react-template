export default function AppointmentCard({
  id,
  doctorName,
  specialization,
  appointmentDate,
  status,
  location,
  onCancel,
  onReschedule,
  style,
}: any) {
  const date = new Date(appointmentDate).toLocaleString(undefined, {
    dateStyle: "long",
    timeStyle: "short",
  });

  const statusColors: Record<string, string> = {
    CONFIRMED: "bg-green-100 text-green-700",
    SCHEDULED: "bg-blue-100 text-blue-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <div
      style={style}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              M
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Dr. {doctorName}
              </h3>
              <p className="text-sm text-gray-500">{specialization}</p>
            </div>
          </div>
        </div>

        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            statusColors[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="text-sm text-gray-700 space-y-1 mt-2">
        <p>
          <span className="font-medium">Date & Time:</span> {date}
        </p>
        <p>
          <span className="font-medium">Location:</span> {location}
        </p>
      </div>

      <div className="flex gap-3 mt-4">
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
