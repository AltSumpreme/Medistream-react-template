  // src/components/Calendar.tsx
  import { useMemo } from "react";

  export type AppointmentSummary = {
    // dateKey = 'YYYY-MM-DD'
    dateKey: string;
    count: number;
  };

  interface CalendarProps {
    year?: number;
    month?: number; // 0 = Jan
    appointmentsByDate: Record<string, number>; // { '2025-11-12': 2, ... }
    selectedDate?: string | null; // 'YYYY-MM-DD'
    onSelectDate: (dateKey: string | null) => void;
  }

  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function pad(n: number) {
    return n < 10 ? `0${n}` : `${n}`;
  }

  export function toDateKey(d: Date) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  export default function Calendar({
    year,
    month,
    appointmentsByDate,
    selectedDate,
    onSelectDate,
  }: CalendarProps) {
    const today = new Date();
    const viewYear = typeof year === "number" ? year : today.getFullYear();
    const viewMonth = typeof month === "number" ? month : today.getMonth();

    // days in month and first day index
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay(); // 0..6, Sun..Sat

    const grid = useMemo(() => {
      const arr: Array<number | null> = [];
      // fill blanks for first week
      for (let i = 0; i < firstDayIndex; i++) arr.push(null);
      for (let d = 1; d <= daysInMonth; d++) arr.push(d);
      return arr;
    }, [daysInMonth, firstDayIndex]);

    const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleString(undefined, {
      month: "long",
      year: "numeric",
    });

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-full max-w-md">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm text-gray-500">Month</div>
            <div className="text-lg font-semibold text-gray-800">{monthLabel}</div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="p-2 rounded-md hover:bg-gray-100"
              onClick={() => {
                // move -1 month
                const cur = new Date(viewYear, viewMonth, 1);
                cur.setMonth(cur.getMonth() - 1);
                onSelectDate(null); // clear selection when changing month
                // emit custom event? We'll not manage external month state here;
                // parent can control month via props for advanced use.
                // For now, no-op because Appointments uses current month only.
              }}
              aria-label="Previous month"
              title="Previous month"
            >
              ←
            </button>
            <button
              type="button"
              className="p-2 rounded-md hover:bg-gray-100"
              onClick={() => {
                // similar no-op
              }}
              aria-label="Next month"
              title="Next month"
            >
              →
            </button>
          </div>
        </div>

        {/* weekday headers */}
        <div className="grid grid-cols-7 text-xs text-gray-500 mb-2">
          {weekdayNames.map((w) => (
            <div key={w} className="text-center py-1">
              {w}
            </div>
          ))}
        </div>

        {/* days grid */}
        <div className="grid grid-cols-7 gap-2">
          {grid.map((day, idx) => {
            if (day === null) return <div key={idx} className="h-12" />;
            const d = new Date(viewYear, viewMonth, day);
            const dateKey = toDateKey(d);
            const hasAppointments = Boolean(appointmentsByDate[dateKey]);
            const isSelected = selectedDate === dateKey;
            const isToday = toDateKey(new Date()) === dateKey;

            return (
              <button
                key={dateKey}
                onClick={() => onSelectDate(isSelected ? null : dateKey)}
                className={`h-12 flex flex-col items-center justify-center rounded-lg transition focus:outline-none
                  ${isSelected ? "ring-2 ring-blue-400 bg-blue-50" : "hover:bg-gray-50"}
                `}
                title={`${day}${hasAppointments ? ` — ${appointmentsByDate[dateKey]} appointment(s)` : ""}`}
                aria-pressed={isSelected}
              >
                <div className="text-sm font-medium text-gray-800">{day}</div>

                {/* small dot for appointments */}
                <div className="mt-1">
                  {hasAppointments ? (
                    <span className={`inline-block w-2 h-2 rounded-full ${isToday ? "bg-blue-600" : "bg-blue-400"}`} />
                  ) : (
                    <span className="inline-block w-2 h-2 rounded-full opacity-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* footer actions */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <div>
            <button
              onClick={() => onSelectDate(null)}
              className="text-sm text-blue-600 hover:underline"
            >
              Show all
            </button>
          </div>
          <div>{/* reserved for extra stats */}</div>
        </div>
      </div>
    );
  }
