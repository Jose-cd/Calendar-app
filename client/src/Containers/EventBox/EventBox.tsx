import { Button, DatePicker, Form, Input, message, TimePicker } from "antd";
import React from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { createEvent } from "../../Redux/slices/eventSlice";
import { IEvent } from "../../typeDefs/Event";
import "./EventBox.css";
import axios, { AxiosError } from "axios";
interface EventBoxProps {}

export const EventBox: React.FC<EventBoxProps> = () => {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const onFinish = async (values: IEvent) => {
    dispatch(createEvent(values))
      .then(unwrapResult)
      .then(() => message.success("Evento creado con exito."))
      .catch((err) => message.error(err.message));
  };

  const config = {
    rules: [
      {
        type: "object" as const,
        required: true,
        message: "Selecciona una fecha",
      },
    ],
  };
  const configTime = {
    rules: [
      {
        type: "object" as const,
        required: true,
        message: "Selecciona una hora",
      },
    ],
  };

  const formLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 12,
    },
  };
  const format = "HH:mm";

  return (
    <div className="Event__Box">
      <h1>Agregar Evento</h1>
      <Form
        form={form}
        name="evento"
        onFinish={onFinish}
        {...formLayout}
        className="Form__Layout"
      >
        <Form.Item name="nombre" label="Nombre" required>
          <Input required />
        </Form.Item>

        <Form.Item name="descripcion" label="Descripcion" required>
          <Input required />
        </Form.Item>

        <Form.Item name="lugar" label="Lugar" required>
          <Input required />
        </Form.Item>

        <Form.Item name="fecha" label="Fecha" {...config} required>
          <DatePicker />
        </Form.Item>

        <Form.Item name="color" label="Color" required>
          <Input required />
        </Form.Item>

        <Form.Item
          name="horaInicio"
          label="Hora Inicio"
          {...configTime}
          required
        >
          <TimePicker format={format} />
        </Form.Item>

        <Form.Item
          name="horaFinalizacion"
          label="Fecha Fin"
          {...configTime}
          required
        >
          <TimePicker format={format} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Completar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
