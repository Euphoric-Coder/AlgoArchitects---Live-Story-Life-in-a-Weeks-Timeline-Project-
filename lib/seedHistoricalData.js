import { parse as parseDate, isBefore, isAfter } from "date-fns";
import Papa from "papaparse";

/**
 * Get ISO week number
 */
function getISOWeek(date) {
  const target = new Date(date.valueOf());
  const dayNr = (target.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const diff = target - firstThursday;
  return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
}

/**
 * Transform CSV text to structured historical events
 * @param {string} csvText - Raw CSV string
 * @param {string} createdBy - User ID
 * @param {string} dobISO - Date of birth in YYYY-MM-DD
 * @returns {Array}
 */
export function transformHistoricalEvents(csvText, createdBy, dobISO) {
  const dob = new Date(dobISO);
  const today = new Date();

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data
    .filter(
      (row) =>
        row["Date"]?.toLowerCase() !== "unknown" &&
        row["Month"]?.toLowerCase() !== "unknown" &&
        row["Year"]?.toLowerCase() !== "unknown"
    )
    .map((row) => {
      try {
        const dateStr = `${row["Date"]} ${row["Month"]} ${row["Year"]}`;
        const eventDate = parseDate(dateStr, "d MMMM yyyy", new Date());

        if (isBefore(eventDate, dob) || isAfter(eventDate, today)) return null;

        const year = eventDate.getFullYear().toString();
        const date = eventDate.toISOString().split("T")[0];
        const week = `${getISOWeek(eventDate)
          .toString()
          .padStart(2, "0")}`;

        return {
          year,
          date,
          week,
          type: "historical",
          title: row["Name of Incident"],
          description: row["Impact"] || null,
          icon: "ScrollText",
          color: "from-yellow-500 to-yellow-600",
          createdBy,
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}
