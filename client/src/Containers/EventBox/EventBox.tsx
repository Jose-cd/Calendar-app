import React from "react";
import { Button, DatePicker, Form, Input, TimePicker } from "antd";
import moment from "moment";
import "./EventBox.css";
interface EventBoxProps {}
interface formType {
  nombre: string;
  descripcion: string;
  lugar: string;
  color: string;
  fecha: Date;
  horaInicio: Date;
  horaFinalizacion: Date;
}

export const EventBox: React.FC<EventBoxProps> = () => {
  const [form] = Form.useForm();

  const onFinish = (values: formType) => {
    console.log(values);
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
          label="Fecha"
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
