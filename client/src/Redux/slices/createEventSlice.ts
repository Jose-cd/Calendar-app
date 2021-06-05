import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IEvent } from "../../typeDefs/Event";
import { eventServices } from "./EventServices/eventsService";

export interface createEventState {
  event?: IEvent;
  status: "idle" | "loading" | "failed";
}

const initialState: createEventState = {
  event: undefined,
  status: "idle",
};

// Async thunk to create an event
export const createEventThunk = createAsyncThunk(
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
      .addCase(createEventThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEventThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.event = action.payload;
      })
      .addCase(createEventThunk.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state.
export const selectCreateEventState = (state: createEventState) => state;

export default createEventSlice.reducer;
