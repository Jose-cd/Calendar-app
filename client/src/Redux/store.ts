import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import eventReducer from "./slices/createEventSlice";
import getEventReducer from "./slices/getEventsSlice";

export const store = configureStore({
  reducer: {
    createEvent: eventReducer,
    events: getEventReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
