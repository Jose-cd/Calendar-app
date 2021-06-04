import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import eventReducer from "./slices/eventSlice";

export const store = configureStore({
  reducer: {
    createEvent: eventReducer,
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
