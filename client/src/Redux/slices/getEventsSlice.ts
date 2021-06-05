import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IEvent } from "../../typeDefs/Event";
import { eventServices } from "./EventServices/eventsService";

export interface getEventsStates {
  events?: IEvent[];
  status: "idle" | "loading" | "failed";
}

const initialState: getEventsStates = {
  events: undefined,
  status: "idle",
};

// Async thunk to create an event
export const getEventsThunk = createAsyncThunk(
  "event/getEvents",
  async (_, { rejectWithValue }) => {
    return eventServices
      .getEvents()
      .then((response) => {
        return response.data as IEvent[];
      })
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const getEventsSlice = createSlice({
  name: "createEventSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEventsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEventsThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.events = action.payload;
      })
      .addCase(getEventsThunk.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state.
export const selectEvents = (state: getEventsStates) => state;

export default getEventsSlice.reducer;
