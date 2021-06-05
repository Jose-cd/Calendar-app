import { unwrapResult } from "@reduxjs/toolkit";
import { Button, message } from "antd";
import React, { useState } from "react";
import { ModalCreateEvent } from "../../Components/ModalCreateEvent/ModalCreateEvent";
import { useAppDispatch } from "../../Redux/hooks";
import { createEventThunk } from "../../Redux/slices/createEventSlice";
import { getEventsThunk } from "../../Redux/slices/getEventsSlice";
import { IEvent } from "../../typeDefs/Event";
import "./EventBox.css";
interface EventBoxProps {}

export const EventBox: React.FC<EventBoxProps> = () => {
  const dispatch = useAppDispatch();
  const [createEventVisible, setCreateEventVisible] = useState(false);

  const onFinish = async (values: IEvent) => {
    const loadingMsg = message.loading("Cargando...");
    dispatch(createEventThunk(values))
      .then(unwrapResult)
      .then(() => {
        loadingMsg();
        message.success("Evento creado con exito.");
        dispatch(getEventsThunk());
        return;
      })
      .catch((err) => {
        loadingMsg();
        message.error(err.message);
        return;
      });
  };

  const onCancel = () => {
    setCreateEventVisible(false);
  };

  return (
    <div className="Event__Box">
      <Button onClick={() => setCreateEventVisible(true)} type="primary">
        Agregar Evento
      </Button>
      <ModalCreateEvent
        visible={createEventVisible}
        onCancel={onCancel}
        onOk={(values) => onFinish(values)}
      />
    </div>
  );
};
