import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import dayjs from "dayjs";
import React from "react";
import { IEvent } from "../../typeDefs/Event";
import "./EventDayItem.css";
interface EventDayItemProps {
  event: IEvent;
  onDelete: (event: IEvent) => void;
  onEdit: (event: IEvent) => void;
}

export const EventDayItem: React.FC<EventDayItemProps> = ({
  event,
  onDelete,
  onEdit,
}) => {
  let horaInicio = dayjs(event.horaInicio).format("hh:mm a");
  let horaFin = dayjs(event.horaFinalizacion).format("hh:mm a");

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

      <div className="action_buttons_container">
        <Button
          type="primary"
          onClick={() => onEdit(event)}
          shape="circle"
          icon={<EditOutlined />}
          className="button-edit"
        />
        <Button
          icon={<DeleteOutlined />}
          onClick={() => onDelete(event)}
          type="primary"
          danger
          shape="circle"
        />
      </div>
    </div>
  );
};
