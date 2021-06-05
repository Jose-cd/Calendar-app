import axios from "axios";
import { IEvent } from "../../../typeDefs/Event";

export const eventServices = {
  createEvent: async (evento: IEvent) => {
    return axios.post("http://localhost:5000/", { event: evento });
  },
  getEvents: async () => {
    return axios.get("http://localhost:5000/");
  },
  deleteEvent: async (id: string) => {
    return axios.delete(`http://localhost:5000/${id}`);
  },
  editEvent: async (evento: IEvent) => {
    return axios.patch("http://localhost:5000/" + evento._id, {
      event: evento,
    });
  },
};
