import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import { Button, Form, Input, TimePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import React, { useState } from "react";
import { IEvent } from "../../typeDefs/Event";
import { hoursFormat } from "../utils/TimePickerConfigs";
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
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      nombre: event.nombre,
      descripcion: event.descripcion,
    });
  }, [form, event]);

  const handleSubmitEdit = (values: any) => {
    onEdit({ ...values, _id: event._id });
  };

  return (
    <div className="item-container">
      <Form form={form} layout="inline" onFinish={handleSubmitEdit}>
        <Form.Item name="nombre" label="Nombre">
          <Input bordered={editMode} disabled={!editMode} />
        </Form.Item>
        <Form.Item name="descripcion" label="Descripción">
          <Input bordered={editMode} disabled={!editMode} />
        </Form.Item>
        <Form.Item name="horaInicio" label="Hora Inicio">
          <TimePicker
            disabled={!editMode}
            defaultValue={moment(
              dayjs(event.horaInicio).format("hh:mm"),
              "HH:mm"
            )}
            format={hoursFormat}
          />
        </Form.Item>

        <Form.Item name="horaFinalizacion" label="Fecha Fin">
          <TimePicker
            disabled={!editMode}
            defaultValue={moment(
              dayjs(event.horaFinalizacion).format("hh:mm"),
              "HH:mm"
            )}
            format={hoursFormat}
          />
        </Form.Item>

        <div className="action_buttons_container">
          {editMode ? (
            <Button
              type="text"
              shape="circle"
              icon={<CheckOutlined />}
              className="confirm_edit_button"
              htmlType="submit"
            />
          ) : (
            <Button
              type="primary"
              onClick={() => setEditMode(true)}
              shape="circle"
              icon={<EditOutlined />}
              className="button-edit"
            />
          )}

          <Button
            icon={<DeleteOutlined />}
            onClick={() => onDelete(event)}
            type="primary"
            danger
            shape="circle"
          />
        </div>
      </Form>
    </div>
  );
};
