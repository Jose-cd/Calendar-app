import { Modal } from "antd";
import React from "react";
import { useAppSelector } from "../../Redux/hooks";
import { EventDayItem } from "./EventDayItem";
import { v4 as uuidv4 } from "uuid";
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
  const events = useAppSelector((state) => state.events.events);
  let eventsForToday = events?.filter(
    (e) => new Date(e.fecha).getDate() === day
  );
  return (
    <Modal
      width={700}
      title="Eventos del día"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {eventsForToday?.map((event) => (
        <EventDayItem key={uuidv4()} event={event} />
      ))}
    </Modal>
  );
};
