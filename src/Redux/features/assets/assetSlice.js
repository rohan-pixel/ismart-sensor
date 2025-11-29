// assetSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assets: [], // store the assets list
  assetsError: null,
};

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    // Action to add plant
    // payload = {key : "", value :""}
    addAssets: (state, { payload }) => {
      state.assets = [payload, ...state.assets];
    },
    // Action to update plant
    updateAssets: (state, { payload }) => {
      const { serialNumber } = payload;

      state.assets = state.assets.map((ele) =>
        ele.serialNumber === serialNumber ? { ...ele, ...payload } : ele
      );
    },
    // Action to remove plant
    removeAssets: (state, { payload }) => {
      state.assets = state.assets?.filter(
        (ele) => ele?.serialNumber !== payload
      );
    },
    // Action to clear plant
    clearAssets: (state) => {
      state.assets = [];
    },
  },
});

export const { addAssets, updateAssets, removeAssets, clearAssets } =
  assetsSlice.actions;

export default assetsSlice.reducer;
