import React from "react";
import { CalendarNumber } from "../../Components/CalendarNumber/CalendarNumber";
import { CalendarWeekDay } from "../../Components/CalendarWeekDays/CalendarWeekDay";

interface CalendarBoxProps {}

export const CalendarBox: React.FC<CalendarBoxProps> = () => {
  const weekDays = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  return (
    <div>
      <CalendarWeekDay weekDays={weekDays} />
      <CalendarNumber />
    </div>
  );
};
