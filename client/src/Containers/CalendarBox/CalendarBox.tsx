import { message } from "antd";
import React, { useEffect } from "react";
import { CalendarNumber } from "../../Components/CalendarNumber/CalendarNumber";
import { CalendarWeekDay } from "../../Components/CalendarWeekDays/CalendarWeekDay";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { getEventsThunk } from "../../Redux/slices/getEventsSlice";
interface CalendarBoxProps {}

export const CalendarBox: React.FC<CalendarBoxProps> = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.events);

  const weekDays = [
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    dispatch(getEventsThunk()).catch(() =>
      message.error("Ocurrió un error al solicitar los eventos")
    );
  }, [dispatch]);

  return (
    <div>
      <CalendarWeekDay weekDays={weekDays} />
      <CalendarNumber />
    </div>
  );
};
