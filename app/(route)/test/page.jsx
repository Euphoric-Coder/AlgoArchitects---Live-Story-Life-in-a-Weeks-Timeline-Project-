"use client"; // for app router
import { transformHistoricalEvents } from "@/lib/seedHistoricalData";
import { useEffect, useState } from "react";

export default function historicalEventsLoader() {
  const [historicalEvents, sethistoricalEvents] = useState([]);

  useEffect(() => {
    const createdBy = "user_123";
    const dob = "2005-06-14";

    fetch("/historical_event.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const result = transformHistoricalEvents(
          csvText,
          createdBy,
          dob
        );
        sethistoricalEvents(result);
      });
  }, []);

  useEffect(() => {
      if(historicalEvents.length > 0) {
        console.log(historicalEvents);
        console.log("not empty")
    }
  }, [historicalEvents]);

  return (
    <div>
      <h1>Filtered Historical historicalEvents</h1>
      <ul className="list-disc ml-5">
        {historicalEvents.map((event, index) => (
          <li key={index}>
            <strong>{event.title}</strong> – {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
