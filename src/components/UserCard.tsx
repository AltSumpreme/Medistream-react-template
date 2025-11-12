import type { User } from "../services/usersapi";

interface UserCardProps {
  user: User;
  onPromote?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export default function UserCard({ user, onPromote, onEdit }: UserCardProps) {
  const date = new Date(user.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const roleColor: Record<string, string> = {
    PATIENT: "bg-blue-50 text-blue-700 border border-blue-200",
    DOCTOR: "bg-green-50 text-green-700 border border-green-200",
    ADMIN: "bg-purple-50 text-purple-700 border border-purple-200",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex justify-between items-start hover:shadow-md transition">
      <div className="space-y-1">
        <div className="text-lg font-semibold text-gray-800">{user.name}</div>
        <div className="text-sm text-gray-600">{user.email}</div>

        <span
          className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColor[user.role] || "bg-gray-100 text-gray-700 border border-gray-200"}`}
        >
          {user.role}
        </span>

        {user.specialization && (
          <div className="text-sm text-gray-700 mt-2">
            Specialization:{" "}
            <span className="font-medium">{user.specialization}</span>
          </div>
        )}
        <div className="text-xs text-gray-500 mt-2">Joined: {date}</div>
      </div>

      <div className="flex flex-col items-end gap-2 ml-4 shrink-0">
        {user.role === "PATIENT" && onPromote && (
          <button
            onClick={() => onPromote(user.id)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Promote
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => onEdit(user.id)}
            className="text-sm text-gray-600 hover:text-gray-700 font-medium"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
