// plantSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assetGroup: [], // store the assetGroup options => {key : "", value :""},
  assetGroupError: null,
};

const assetGroupSlice = createSlice({
  name: "assetGroup",
  initialState,
  reducers: {
    // Action to add plant
    // payload = {key : "", value :""}
    addAssetGroup: (state, { payload }) => {
      state.assetGroup = [payload, ...state.assetGroup];
    },
    // Action to update plant
    // payload = {key : "", value :""}
    updateAssetGroup: (state, { payload }) => {
      const { key } = payload;

      state.assetGroup = state.assetGroup.map((ele) =>
        ele.key === key ? payload : ele
      );
    },
    // Action to remove plant
    // payload = key || String
    removeAssetGroup: (state, payload) => {
      state.assetGroup = state.assetGroup.filter((ele) => ele.key === payload);
    },
    // Action to clear plant
    clearAssetGroup: (state) => {
      state.assetGroup = [];
    },
  },
});

export const {
  addAssetGroup,
  updateAssetGroup,
  removeAssetGroup,
  clearAssetGroup,
} = assetGroupSlice.actions;

export default assetGroupSlice.reducer;
