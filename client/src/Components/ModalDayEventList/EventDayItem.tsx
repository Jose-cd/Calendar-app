import React from "react";
import { IEvent } from "../../typeDefs/Event";
import "./EventDayItem.css";
interface EventDayItemProps {
  event: IEvent;
}

export const EventDayItem: React.FC<EventDayItemProps> = ({ event }) => {
  let horaInicio =
    new Date(event.horaInicio).getHours() +
    ":" +
    new Date(event.horaInicio).getMinutes();
  let horaFin =
    new Date(event.horaFinalizacion).getHours() +
    ":" +
    new Date(event.horaFinalizacion).getMinutes();

  console.log(new Date(event.horaFinalizacion).getMinutes());
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
