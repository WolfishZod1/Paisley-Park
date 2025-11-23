import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IHexMap {
  selectedRegion: number;
}

const initialState: IHexMap = {
  selectedRegion: 0,
};

export const hexMapSlice = createSlice({
  name: "hexMap",
  initialState,
  reducers: {
    setRegion: (state, action: PayloadAction<number>) => {
      state.selectedRegion = action.payload;
    },
  },
});

export const { setRegion } = hexMapSlice.actions;

export default hexMapSlice.reducer;
