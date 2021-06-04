import React from "react";
import { CalendarNumber } from "../../Components/CalendarNumber/CalendarNumber";
import { CalendarWeekDay } from "../../Components/CalendarWeekDays/CalendarWeekDay";

interface CalendarBoxProps {}

export const CalendarBox: React.FC<CalendarBoxProps> = () => {
  const weekDays = [
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div>
      <CalendarWeekDay weekDays={weekDays} />
      <CalendarNumber />
    </div>
  );
};
