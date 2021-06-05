import React from "react";
import { IEvent } from "../../typeDefs/Event";
import "./EventDayItem.css";
import dayjs from "dayjs";
interface EventDayItemProps {
  event: IEvent;
}

export const EventDayItem: React.FC<EventDayItemProps> = ({ event }) => {
  let horaInicio = dayjs(event.horaInicio).format("hh:mm a");
  let horaFin = dayjs(event.horaFinalizacion).format("hh:mm a");
  return (
    <div className="item-container">
      <b>Nombre: </b>
      {event.nombre}
      <b> descripcion: </b>
      {event.descripcion}
      <b> Hora Inicio: </b>
      {horaInicio}
      <b> Hora Fín: </b>
      {horaFin}
    </div>
  );
};
