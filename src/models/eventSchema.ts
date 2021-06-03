import mongoose from "mongoose";
import { IEvent } from "../typeDefs/Event";

export const eventSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  lugar: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  horaInicio: {
    type: String,
    required: true,
  },
  horaFinalizacion: {
    type: String,
    required: true,
  },
});

export const Event = mongoose.model("Evento", eventSchema);
export const createEventInstance = (event: IEvent) => new Event(event);
