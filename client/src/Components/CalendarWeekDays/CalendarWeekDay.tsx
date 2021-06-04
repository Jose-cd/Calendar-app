import React from "react";
import "./CalendarWeekDay.css";
import { v4 as uuidv4 } from "uuid";
interface CalendarWeekDayProps {
  weekDays: String[];
}

export const CalendarWeekDay: React.FC<CalendarWeekDayProps> = ({
  weekDays,
}) => {
  return (
    <div className="weekdaysContainer">
      {weekDays.map((dayName) => (
        <div key={uuidv4()}>{dayName}</div>
      ))}
    </div>
  );
};
