import axios from "axios";
import { IEvent } from "../../../typeDefs/Event";

export const eventServices = {
  createEvent: async (evento: IEvent) => {
    let response;
    try {
      response = await axios.post("http://localhost:5000/", {
        event: evento,
      });
    } catch (err) {
      return err;
    }

    return response;
  },
};
