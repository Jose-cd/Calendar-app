import React, { useEffect, useState } from "react";
import "./CalendarNumbers.css";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { IEvent } from "../../typeDefs/Event";
import { message, Tooltip } from "antd";
import { ModalDayEventList } from "../ModalDayEventList/ModalDayEventList";
import { getEventsThunk } from "../../Redux/slices/eventsSlice";

interface CalendarNumberProps {}

type days = {
  dayNum: number;
  event?: IEvent;
};

export const CalendarNumber: React.FC<CalendarNumberProps> = () => {
  const [days, setDays] = useState<days[]>([]);
  const dispatch = useAppDispatch();
  const [currentDaySelected, setCurrentDaySelected] = useState<number>(0);
  const [displayEventListModal, setDisplayEventListModal] = useState(false);
  const { status, events } = useAppSelector((state) => state.events);

  // fetch events
  useEffect(() => {
    dispatch(getEventsThunk()).catch(() =>
      message.error("Ocurrió un error al solicitar los eventos")
    );
  }, [dispatch]);

  // format calendar using events
  useEffect(() => {
    let formattedDays: days[] = [];
    // if (status === "loading") return;

    /// in case theres not events
    if (!events?.length && !days.length) {
      for (let i = 1; i < 32; i++) {
        formattedDays.push({ dayNum: i });
      }
      return setDays(formattedDays);
    }

    // in case theres events
    for (let i = 1; i < 32; i++) {
      // check if an event exists this day
      let todayEvent = events?.filter(
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
  }, [events]);

  const isWeekend = (day: number) => {
    if (day % 7 === 6 || day % 7 === 0) return true;
  };

  const handleDayClick = (day: number) => {
    setDisplayEventListModal(true);
    setCurrentDaySelected(day);
  };

  if (status === "loading") return <> </>;

  return (
    <div>
      <div className="days">
        {days.map((day) => (
          <div
            onClick={() => handleDayClick(day.dayNum)}
            key={uuidv4()}
            className={`day ${isWeekend(day.dayNum) ? "weekend" : ""}`}
          >
            {day.event ? (
              <Tooltip title={day.event.nombre}>
                {" "}
                <span className="day-event">{day.dayNum}</span>
              </Tooltip>
            ) : (
              <span>{day.dayNum}</span>
            )}
          </div>
        ))}
      </div>

      {/* View Event list for the day Modal */}
      <ModalDayEventList
        isModalVisible={displayEventListModal}
        day={currentDaySelected}
        handleCancel={() => setDisplayEventListModal(false)}
        handleOk={() => setDisplayEventListModal(false)}
      />
    </div>
  );
};
