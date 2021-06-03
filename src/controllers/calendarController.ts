import { IcalendarController } from "../typeDefs/controllerTypes";
import { createEventInstance, Event } from "../models/eventSchema";
import { IEvent } from "../typeDefs/Event";

export const calendarController: IcalendarController = {
  newEvent: async (req, res, next) => {
    let { event }: { event: IEvent } = req.body;
    //  convert new event's date to Date()
    event.fecha = new Date(event.fecha);
    event.horaFinalizacion = new Date(event.horaFinalizacion);
    event.horaInicio = new Date(event.horaInicio);

    const newEvent = createEventInstance(event);
    const eventList: IEvent[] = await Event.find();
    let eventExists = false;

    for (let i = 0; i < eventList.length; i++) {
      // check if the event is in the same day
      if (eventList[i].fecha.getDay() == event.fecha.getDay()) {
        // check if the event is in the same range of hours
        if (
          event.horaInicio.getHours() == eventList[i].horaInicio.getHours() ||
          (event.horaInicio.getHours() > eventList[i].horaInicio.getHours() &&
            event.horaInicio.getHours() <
              eventList[i].horaFinalizacion.getHours())
        )
          eventExists = true;
        break;
      }
    }

    if (eventExists) return next(new Error("Ya existe un evento a esta hora"));

    try {
      await newEvent.save();
    } catch (err) {
      return next(err);
    }

    return res.json(newEvent);
  },

  editEvent: async (req, res, next) => {
    let { id } = req.params;
    const { event }: { event: IEvent } = req.body;
    const filter = { _id: id };
    const update = { ...event };

    try {
      await Event.findByIdAndUpdate(filter, update);
    } catch (err) {
      return next(err);
    }

    const updatedEvent = await Event.findById(id);

    return res.json({ eventId: updatedEvent });
  },

  deleteEvent: async (req, res, next) => {
    const { id } = req.params;

    try {
      await Event.findOneAndDelete({ _id: id });
    } catch (err) {
      next(err);
    }

    res.json(true);
  },

  getEvents: async (req, res, next) => {
    try {
      const events = await Event.find();
      return res.json(events);
    } catch (err) {
      next(err);
    }
  },
};
