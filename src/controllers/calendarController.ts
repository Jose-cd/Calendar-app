import { IcalendarController } from "../typeDefs/controllerTypes";
import { createEventInstance } from "../models/eventSchema";
import { IEvent } from "#root/typeDefs/Event";

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
};
