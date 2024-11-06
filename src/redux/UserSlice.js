import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 123456,
  name: "Tamer",
  surname: "Köşe",
  company: "Tamer Kose Software",
  avatar: "https://avatars.githubusercontent.com/u/49494446?v=4",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.avatar = action.payload.avatar;
    },
    refreshState: (state, action) => {
      state.id = initialState.id;
      state.name = initialState.name;
      state.surname = initialState.surname;
      state.avatar = initialState.avatar;
    },
  },
});

export const { setUse, refreshState } = userSlice.actions;
export const userReducer = userSlice.reducer;
