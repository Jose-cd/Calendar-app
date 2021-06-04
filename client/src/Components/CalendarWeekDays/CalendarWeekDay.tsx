import React from "react";
import "./CalendarWeekDay.css";

interface CalendarWeekDayProps {
  weekDays: String[];
}

export const CalendarWeekDay: React.FC<CalendarWeekDayProps> = ({
  weekDays,
}) => {
  return (
    <div className="weekdaysContainer">
      {weekDays.map((dayName) => (
        <div>{dayName}</div>
      ))}
    </div>
  );
};
