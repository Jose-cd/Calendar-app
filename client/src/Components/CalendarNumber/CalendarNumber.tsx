import React from "react";
import "./CalendarNumbers.css";
interface CalendarNumberProps {}

export const CalendarNumber: React.FC<CalendarNumberProps> = () => {
  let days: number[] = [];
  for (let i = 1; i < 32; i++) {
    days.push(i);
  }

  const isWeekend = (day: number) => {
    if (day % 7 === 6 || day % 7 === 0) return true;
  };

  return (
    <>
      <div className="days">
        {days.map((day) => (
          <div className={`day ${isWeekend(day) ? "weekend" : ""}`}>{day}</div>
        ))}
      </div>
    </>
  );
};
