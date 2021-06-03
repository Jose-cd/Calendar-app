import { IcalendarController } from "../typeDefs/controllerTypes";

export const calendarController: IcalendarController = {
  helloWorld: async (req, res, next) => {
    return res.json("Hello world!");
  },
};
