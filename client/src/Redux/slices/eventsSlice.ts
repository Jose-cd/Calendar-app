import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IEvent } from "../../typeDefs/Event";
import { eventServices } from "./EventServices/eventsService";

export interface eventSliceState {
  events: IEvent[];
  status: "idle" | "loading" | "failed";
}

const initialState: eventSliceState = {
  events: [],
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

// Async thunk to get events
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

// Async thunk to delete an event
export const deleteEventThunk = createAsyncThunk(
  "event/deteleEvent",
  async (id: string, { rejectWithValue }) => {
    return eventServices
      .deleteEvent(id)
      .then((response) => {
        return response.data as IEvent;
      })
      .catch((err) => rejectWithValue(err.response.data));
  }
);

// Async thunk to edit an event
export const editEventThunk = createAsyncThunk(
  "event/editEvent",
  async (event: IEvent, { rejectWithValue }) => {
    return eventServices
      .editEvent(event)
      .then((response) => {
        return response.data as IEvent;
      })
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const eventsSlice = createSlice({
  name: "eventsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create events thunks
      .addCase(createEventThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEventThunk.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(createEventThunk.rejected, (state, action) => {
        state.status = "failed";
      })
      // get events thunks
      .addCase(getEventsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEventsThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.events = action.payload;
      })
      .addCase(getEventsThunk.rejected, (state, action) => {
        state.status = "failed";
      })
      // delete event thunks
      .addCase(deleteEventThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEventThunk.fulfilled, (state, action) => {
        state.status = "idle";
        const updatedEventList = state.events?.filter(
          (e) => e._id !== action.payload._id
        );
        state.events = updatedEventList;
      })
      .addCase(deleteEventThunk.rejected, (state) => {
        state.status = "failed";
      })
      // edit event Thunk
      .addCase(editEventThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editEventThunk.fulfilled, (state, action) => {
        state.status = "idle";
        let eventIdx = state.events?.findIndex(
          (e) => e._id === action.payload._id
        ) as number;

        state.events[eventIdx] = action.payload;
      })
      .addCase(editEventThunk.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state.
export const selectEvents = (state: eventSliceState) => state;

export default eventsSlice.reducer;
