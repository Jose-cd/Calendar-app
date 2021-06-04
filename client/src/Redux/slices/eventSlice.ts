import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IEvent } from "../../typeDefs/Event";
import { eventServices } from "./EventServices/eventsService";

export interface eventState {
  event?: IEvent;
  status: "idle" | "loading" | "failed";
}

const initialState: eventState = {
  event: undefined,
  status: "idle",
};

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (event: IEvent, { rejectWithValue }) => {
    return eventServices
      .createEvent(event)
      .then((response) => {
        return response.data as IEvent;
      })
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const createEventSlice = createSlice({
  name: "createEventSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = "idle";
        state.event = action.payload;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = "failed";
        state.event = action.payload as any;
      });
  },
});

// export const {} = createEventSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state
// export const selectEvents = (state: RootState) => state.events.eventList;

export default createEventSlice.reducer;
