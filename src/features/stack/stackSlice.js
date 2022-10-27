import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cathode: {
    wetMass: 30e-3, // in g
    thickness: 100, // in µm
    diameter: 10,  // in mm
  },
  anode: {
    wetMass: 22e-3,
    thickness: 100, // in µm
    diameter: 10, // in mm
  },
  separator: {
    massLoading: 16.5,
    thickness: 16, // in um
  },
  cathodeCC: {
    mass: Number((27 * (0.25 * 100e-6 * Math.PI)).toPrecision(2)),
    massLoading: 27,
    thickness: 10, //in um
  },
  anodeCC: {
    massLoading: 89.6,
    thickness: 10, // in µm
  },
  averageVoltage: 3,
  lowRateCapacity: 300, // mAh
  measuredCapacity: 240, //mAh
  arealEnergyDensity: 200,
  totalCathodeMass: Number((27 * (0.25 * 100e-6 * Math.PI)).toPrecision(2)) + 30e-3,
  totalCathodeThickness: 10 + 100,
  totalAnodeMass: 0,
  activeElectrode: 'none',
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
    setActiveElectrode: (state, action) => {
      state.activeElectrode = action.payload;
    },
    setCCCThickness: (state, action) => {
      state.cathodeCC.thickness = action.payload;
    },
    setCCCMass: (state, action) => {
      state.cathodeCC.mass = action.payload;
      state.cathodeCC.massLoading = action.payload / (0.25 * (state.cathode.diameter*1e-3)**2  * Math.PI);
    },
    setTotalCathodeMass: (state, action) => {
      state.totalCathodeMass = action.payload;
      state.cathode.wetMass = action.payload - state.cathodeCC.mass
    },
    setTotalCathodeThickness: (state, action) => {
      state.totalCathodeThickness = action.payload;
      state.cathode.thickness = action.payload - state.cathodeCC.thickness
    },
    setAvgVoltage: (state, action) => {
      state.averageVoltage = action.payload;
    },
    setLowRateCapacity: (state, action) => {
      state.lowRateCapacity = action.payload;
    },
    setMeasuredCapacity: (state, action) => {
      state.measuredCapacity = action.payload;
    },
  },
});

export const { setCWetMass, setAWetMass, setCThickness, setAThickness,
                setCDiameter, setADiameter, setArealEnergyDensity, setActiveElectrode,
                setCCCThickness, setCCCMass, setTotalCathodeMass, setTotalCathodeThickness,
                setAvgVoltage, setLowRateCapacity, setMeasuredCapacity } = stackSlice.actions;


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
export const selectCCCMass = (state) => state.stack.cathodeCC.mass;
export const selectACCMassLoading = (state) => state.stack.anodeCC.massLoading;
export const selectCCCThickness = (state) => state.stack.cathodeCC.thickness;
export const selectACCThickness = (state) => state.stack.anodeCC.thickness;
export const selectTotalCathodeMass = (state) => state.stack.totalCathodeMass;
export const selectTotalCathodeThickness = (state) => state.stack.totalCathodeThickness;
export const selectAvgVoltage = (state) => state.stack.averageVoltage;
export const selectLowRateCapacity = (state) => state.stack.lowRateCapacity;
export const selectMeasuredCapacity = (state) => state.stack.measuredCapacity;

export const selectActiveElectrode = (state) => state.stack.activeElectrode;

export default stackSlice.reducer;
