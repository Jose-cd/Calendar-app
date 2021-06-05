import React, { useEffect } from "react";
import { Modal, Form, Input, DatePicker, TimePicker } from "antd";
import {
  configRules,
  configTime,
  hoursFormat,
  defaultFormRule,
} from "../utils/TimePickerConfigs";
import { IEvent } from "../../typeDefs/Event";

interface ModalCreateEventProps {
  onOk: (event: IEvent) => Promise<void>;
  onCancel: () => void;
  visible: boolean;
  clearForm: boolean;
}

const formLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
};

export const ModalCreateEvent: React.FC<ModalCreateEventProps> = ({
  onOk,
  onCancel,
  visible,
  clearForm,
}) => {
  const [form] = Form.useForm();

  // useEffect to clear form values after creating an event
  useEffect(() => {
    if (!clearForm) return;

    form.resetFields();
  }, [clearForm, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onOk(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Crear un nuevo evento"
      okText="Crear Evento"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => handleOk()}
      width={700}
    >
      <Form
        form={form}
        {...formLayout}
        name="Create event form"
        className="Form__Layout"
      >
        <Form.Item name="nombre" label="Nombre" {...defaultFormRule} required>
          <Input required />
        </Form.Item>

        <Form.Item
          name="descripcion"
          label="Descripcion"
          {...defaultFormRule}
          required
        >
          <Input required />
        </Form.Item>

        <Form.Item name="lugar" label="Lugar" {...defaultFormRule} required>
          <Input required />
        </Form.Item>

        <Form.Item name="fecha" label="Fecha" {...configRules} required>
          <DatePicker />
        </Form.Item>

        <Form.Item name="color" label="Color" {...defaultFormRule} required>
          <Input required />
        </Form.Item>

        <Form.Item
          name="horaInicio"
          label="Hora Inicio"
          {...configTime}
          required
        >
          <TimePicker format={hoursFormat} />
        </Form.Item>

        <Form.Item
          name="horaFinalizacion"
          label="Fecha Fin"
          {...configTime}
          required
        >
          <TimePicker format={hoursFormat} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
