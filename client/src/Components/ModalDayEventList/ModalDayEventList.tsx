import { message, Modal } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { EventDayItem } from "./EventDayItem";
import { v4 as uuidv4 } from "uuid";
import { IEvent } from "../../typeDefs/Event";
import {
  deleteEventThunk,
  editEventThunk,
} from "../../Redux/slices/eventsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
interface ModalDayEventListProps {
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  day: number;
}

export const ModalDayEventList: React.FC<ModalDayEventListProps> = ({
  isModalVisible,
  handleOk,
  handleCancel,
  day,
}) => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.events);
  let eventsForToday = events?.filter(
    (e) => new Date(e.fecha).getDate() === day
  );

  const handleDelete = (event: IEvent) => {
    dispatch(deleteEventThunk(event._id as string))
      .then(unwrapResult)
      .then(() => {
        message.success("Evento eliminado con exito.");
      })
      .catch((err) => message.error(err));
  };

  const onEdit = (event: IEvent) => {
    dispatch(editEventThunk(event))
      .then(unwrapResult)
      .then(() => message.success("Evento editado con exito."))
      .catch((err) => message.error("ha ocurrido un error"));
  };

  return (
    <Modal
      width={700}
      title="Eventos del día"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {eventsForToday?.map((event) => (
        <EventDayItem
          key={uuidv4()}
          event={event}
          onDelete={() => handleDelete(event)}
          onEdit={onEdit}
        />
      ))}
    </Modal>
  );
};
