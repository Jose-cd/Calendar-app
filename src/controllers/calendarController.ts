import { IcalendarController } from "../typeDefs/controllerTypes";
import { createEventInstance, Event } from "../models/eventSchema";
import { IEvent } from "../typeDefs/Event";
import mongoose, { Mongoose } from "mongoose";

export const calendarController: IcalendarController = {
  newEvent: async (req, res, next) => {
    const { event }: { event: IEvent } = req.body;
    const newEvent = createEventInstance(event);

    try {
      await newEvent.save();
    } catch (err) {
      return next(err);
    }

    return res.json(newEvent);
  },

  editEvent: async (req, res, next) => {
    let { eventId } = req.params;
    const { event }: { event: IEvent } = req.body;
    const filter = { _id: eventId };
    const update = { ...event };

    try {
      await Event.findByIdAndUpdate(filter, update);
    } catch (err) {
      return next(err);
    }

    const updatedEvent = await Event.findById(eventId);

    return res.json({ eventId: updatedEvent });
  },
};
