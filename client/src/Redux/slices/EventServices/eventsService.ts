import axios from "axios";
import { IEvent } from "../../../typeDefs/Event";

export const eventServices = {
  createEvent: async (evento: IEvent) => {
    return axios.post("http://localhost:5000/", { event: evento });
  },
};
