import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  case: {
    internalVolume: 2.105e-5,
    mass: 10.9,
  },
    energyDensity: 0,
    mass: 0,
};

export const cellSlice = createSlice({
  name: 'cell',
  initialState,
  reducers: {
    setEDensity: (state, action) => {
        state.energyDensity = action.payload;
    },
    setMass: (state, action) => {
          state.mass = action.payload;
    },
}
})

export const { setEDensity } = cellSlice.actions;

export const selectEDensity = (state) => state.cell.energyDensity;
export const selectMass = (state) => state.cell.caseMass;
export const selectCaseInternalVolume = (state) => state.cell.case.internalVolume;
export const selectCaseMass = (state) => state.cell.case.mass;

export default cellSlice.reducer;