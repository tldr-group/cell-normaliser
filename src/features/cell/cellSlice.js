import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  case: {
    internalVolume: 2.105e-5,
    mass: 10.9,
  },
  energy: 0,
  specificEnergy: 0,
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
    setEnergy: (state, action) => {
      state.energy = action.payload;
    },
    setSpecificEnergy: (state, action) => {
      state.specificEnergy = action.payload;
    },
    setEnergyEfficiency: (state, action) => {
      state.energyEfficiency = action.payload;
    },
}
})

export const { setEDensity, setMass, setEnergy, setSpecificEnergy, setEnergyEfficiency } = cellSlice.actions;

export const selectEDensity = (state) => state.cell.energyDensity;
export const selectEnergy = (state) => state.cell.energy;
export const selectSpecificEnergy = (state) => state.cell.specificEnergy;
export const selectEnergyEfficiency = (state) => state.cell.energyEfficiency;
export const selectMass = (state) => state.cell.mass;
export const selectCaseInternalVolume = (state) => state.cell.case.internalVolume;
export const selectCaseMass = (state) => state.cell.case.mass;

export default cellSlice.reducer;