// plantSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plants: [], // store the plant options => {key : "", value :""},
  plantError: null,
};

const plantSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
    // Action to add plant
    // payload = {key : "", value :""}
    addPlant: (state, { payload }) => {
      state.plants = [payload, ...state.plants];
    },
    // Action to update plant
    // payload = {key : "", value :""}
    updatePlant: (state, { payload }) => {
      const { key } = payload;

      state.plants = state.plants.map((ele) =>
        ele.key === key ? payload : ele
      );
    },
    // Action to remove plant
    // payload = key || String
    removePlant: (state, payload) => {
      state.plants = state.plants.filter((ele) => ele.key === payload);
    },
    // Action to clear plant
    clearPlant: (state) => {
      state.plants = [];
    },
  },
});

export const { addPlant, updatePlant, removePlant, clearPlant } =
  plantSlice.actions;

export default plantSlice.reducer;
