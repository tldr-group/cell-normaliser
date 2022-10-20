import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cathode: {
    wetMass: 30e-3,
    thickness: 100e-6,
    diameter: 10e-3,
  },
  anode: {
    wetMass: 22e-3,
    thickness: 100e-6,
    diameter: 10e-3,
  },
  separator: {
    massLoading: 16.5,
    thickness: 16e-6,
  },
  cathodeCC: {
    massLoading: 27,
    thickness: 10e-6,
  },
  anodeCC: {
    massLoading: 89.6,
    thickness: 10e-6,
  },
  arealEnergyDensity: 200,
  status: 'idle',
};

export const stackSlice = createSlice({
  name: 'stack',
  initialState,
  reducers: {
    setCWetMass: (state, action) => {
        state.cathode.wetMass = action.payload;
    },
    setAWetMass: (state, action) => {
        state.anode.wetMass = action.payload;
    },
    setCThickness: (state, action) => {
        state.cathode.thickness = action.payload;
    },
    setAThickness: (state, action) => {
        state.anode.thickness = action.payload;
    },
    setCDiameter: (state, action) => {
        state.cathode.diameter = action.payload;
    },
    setADiameter: (state, action) => {
        state.anode.diameter = action.payload;
    },
    setArealEnergyDensity: (state, action) => {
        state.arealEnergyDensity= action.payload;
    },
  },
});

export const { setCWetMass, setAWetMass, setCThickness, setAThickness,
                setCDiameter, setADiameter, setArealEnergyDensity } = stackSlice.actions;


export const selectCWetMass = (state) => state.stack.cathode.wetMass;
export const selectAWetMass = (state) => state.stack.anode.wetMass;
export const selectCThickness = (state) => state.stack.cathode.thickness;
export const selectAThickness = (state) => state.stack.anode.thickness;
export const selectCDiameter = (state) => state.stack.cathode.diameter;
export const selectADiameter = (state) => state.stack.anode.diameter;
export const selectArealEnergyDensity = (state) => state.stack.arealEnergyDensity;
export const selectSMassLoading = (state) => state.stack.separator.massLoading;
export const selectSThickness = (state) => state.stack.separator.thickness;
export const selectCCCMassLoading = (state) => state.stack.cathodeCC.massLoading;
export const selectACCMassLoading = (state) => state.stack.anodeCC.massLoading;
export const selectCCCThickness = (state) => state.stack.cathodeCC.thickness;
export const selectACCThickness = (state) => state.stack.anodeCC.thickness;

export default stackSlice.reducer;
