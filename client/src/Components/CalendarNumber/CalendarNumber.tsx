import React, { useEffect, useState } from "react";
import "./CalendarNumbers.css";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { getEventsThunk } from "../../Redux/slices/getEventsSlice";
import { IEvent } from "../../typeDefs/Event";
import { message } from "antd";

interface CalendarNumberProps {}

type days = {
  dayNum: number;
  event?: IEvent;
};

export const CalendarNumber: React.FC<CalendarNumberProps> = ({}) => {
  const [days, setDays] = useState<days[]>([]);
  const dispatch = useAppDispatch();

  const { status, events } = useAppSelector((state) => state.events);

  // fetch events
  useEffect(() => {
    dispatch(getEventsThunk()).catch(() =>
      message.error("Ocurrió un error al solicitar los eventos")
    );
  }, [dispatch]);

  useEffect(() => {
    if (status === "loading") return;
    if (!events?.length) return;
    if (days.length) return;

    let formattedDays: days[] = [];

    for (let i = 1; i < 32; i++) {
      // check if an event exists this day
      let todayEvent = events.filter(
        (e) => new Date(e.fecha).getDate() === i
      )[0];
      if (todayEvent) {
        formattedDays.push({
          dayNum: i,
          event: todayEvent,
        });
      } else {
        formattedDays.push({ dayNum: i });
      }
    }

    setDays(formattedDays);
  }, [events, status, days]);

  const isWeekend = (day: number) => {
    if (day % 7 === 6 || day % 7 === 0) return true;
  };

  if (status === "loading") return <> </>;

  return (
    <div>
      <div className="days">
        {days.map((day) => (
          <div
            key={uuidv4()}
            className={`day ${isWeekend(day.dayNum) ? "weekend" : ""}`}
          >
            {day.dayNum}
          </div>
        ))}
      </div>
    </div>
  );
};
