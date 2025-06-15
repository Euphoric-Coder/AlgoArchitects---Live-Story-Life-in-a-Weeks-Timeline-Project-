"use client";

import { getAnniversaryDetails } from "@/lib/anniversaryDetails";
import { useEffect, useState } from "react";

const AnniversaryList = ({ selectedYear }) => {
  const [anniversaries, setAnniversaries] = useState([]);

  useEffect(() => {
    const fetchEventsAndAnniversaries = async () => {
      try {
        const res = await fetch("/api/fetch-events");
        const events = await res.json();

        const filtered = events.filter(
          (event) => parseInt(event.year) === parseInt(selectedYear)
        );

        const enriched = filtered.map((event) => {
          const { weeksLeft, nextAnniversaryDate } = getAnniversaryDetails(
            event.date
          );
          return {
            id: event.id,
            title: event.title,
            weeksLeft,
            date: nextAnniversaryDate,
          };
        });

        setAnniversaries(enriched.sort((a, b) => a.weeksLeft - b.weeksLeft));
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEventsAndAnniversaries();
  }, [selectedYear]);

  return (
    <div className="mt-6">
      <h2 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-500 dark:from-blue-500 dark:via-indigo-500 dark:to-cyan-400">
        Anniversaries in {selectedYear}
      </h2>

      {anniversaries.length === 0 ? (
        <p className="text-sm text-slate-500">No anniversaries found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {anniversaries.map((a) => (
            <li
              key={a.id}
              className="form-layout"
            >
              <div className="font-semibold">{a.title}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {a.weeksLeft === 0
                  ? "🎉 This week!"
                  : `${a.weeksLeft} week${
                      a.weeksLeft > 1 ? "s" : ""
                    } left`}{" "}
                (on {a.date})
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnniversaryList;
