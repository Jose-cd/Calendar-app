import React from "react";
import { IEvent } from "../../typeDefs/Event";
import "./EventDayItem.css";
import dayjs from "dayjs";
import { Button, message } from "antd";
import { useAppDispatch } from "../../Redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { deleteEventThunk } from "../../Redux/slices/eventsSlice";
interface EventDayItemProps {
  event: IEvent;
}

export const EventDayItem: React.FC<EventDayItemProps> = ({ event }) => {
  let horaInicio = dayjs(event.horaInicio).format("hh:mm a");
  let horaFin = dayjs(event.horaFinalizacion).format("hh:mm a");
  const dispatch = useAppDispatch();

  const handleDelete = (event: IEvent) => {
    dispatch(deleteEventThunk(event._id as string))
      .then(unwrapResult)
      .then(() => {
        message.success("Evento eliminado con exito.");
      })
      .catch((err) => message.error(err));
  };

  return (
    <div className="item-container">
      <div className="info">
        <b>Nombre: </b>
        {event.nombre}
        <b> descripcion: </b>
        {event.descripcion}
        <b> Hora Inicio: </b>
        {horaInicio}
        <b> Hora Fín: </b>
        {horaFin}
      </div>

      <div>
        <Button onClick={() => handleDelete(event)} type="primary" danger>
          Borrar
        </Button>
      </div>
    </div>
  );
};
