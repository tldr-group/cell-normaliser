import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cathode: {
    activeMaterial: {
      mass: 0,
      thickness: 0,
      massPercentDrySlurry: 0.95,
      density: 0,
      theoreticSpecificCapacity: 216,
    },
    binder: {
      mass: 0,
      thickness: 0,
      massPercentDrySlurry: 0.025,
      density: 0,
    },
    conductiveAdditive: {
      mass: 0,
      thickness: 0,
      massPercentDrySlurry: 0.025,
      density: 0,
    },
    electrolyte: {
      mass: 0,
      thickness: 0,
      density: 0,
    },
    porosity: 0,
    wetMass: 30e-3, // in g
    thickness: 100, // in µm
  },
  anode: {
    activeMaterial: {
      mass: 0,
      thickness: 0,
      massPercentDrySlurry: 0.95,
      density: 2.26e6, // g m-3
      theoreticSpecificCapacity: 0.372, // A h g-1
    },
    binder: {
      mass: 0,
      thickness: 0,
      massPercentDrySlurry: 0.025,
      density: 1.6e6,
    },
    conductiveAdditive: {
      mass: 0,
      thickness: 0,
      massPercentDrySlurry: 0.025,
      density: 2e6,
    },
    electrolyte: {
      mass: 0,
      thickness: 0,
      density: 1.2e6,
    },
    porosity: 0.3,
    wetMass: 22e-3,
    thickness: 100, // in µm
  },
  separator: {
    massLoading: 16.5,
    thickness: 16, // in um
    density: 0.9e6,
  },
  cathodeCC: {
    mass: 2.1e-3,
    thickness: 10, //in um
  },
  anodeCC: {
    mass: 2.1e-3,
    thickness: 10, // in µm
  },
  diameter: 10,
  averageVoltage: 3,
  lowRateCapacity: 15, // mAh
  measuredCapacity: 12, //mAh
  arealEnergyDensity: 200,
  totalCathodeMass: Number((27 * (0.25 * 100e-6 * Math.PI)).toPrecision(2)) + 30e-3,
  totalCathodeThickness: 10 + 100,
  totalAnodeMass: 0,
  npRatio: 1.2,
  
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
    setDiameter: (state, action) => {
        state.diameter = action.payload;
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
    setACCThickness: (state, action) => {
      state.anodeCC.thickness = action.payload;
    },
    setACCMass: (state, action) => {
      state.anodeCC.mass = action.payload;
      state.anodeCC.massLoading = action.payload / (0.25 * (state.anode.diameter*1e-3)**2  * Math.PI);
    },
    setTotalCathodeMass: (state, action) => {
      state.totalCathodeMass = action.payload;
      state.cathode.wetMass = action.payload - state.cathodeCC.mass
    },
    setTotalCathodeThickness: (state, action) => {
      state.totalCathodeThickness = action.payload;
      state.cathode.thickness = action.payload - state.cathodeCC.thickness
    },
    setTotalAnodeMass: (state, action) => {
      state.totalAnodeMass = action.payload;
      state.anode.wetMass = action.payload - state.anodeCC.mass
    },
    setTotalAnodeThickness: (state, action) => {
      state.totalAnodeThickness = action.payload;
      state.anode.thickness = action.payload - state.anodeCC.thickness
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
                setDiameter, setArealEnergyDensity, setActiveElectrode,
                setCCCThickness, setCCCMass, setTotalCathodeMass, setTotalCathodeThickness,
                setAvgVoltage, setLowRateCapacity, setMeasuredCapacity, setACCMass,
                setACCThickness, setTotalAnodeMass, setTotalAnodeThickness } = stackSlice.actions;


export const selectCWetMass = (state) => state.stack.cathode.wetMass;
export const selectAWetMass = (state) => state.stack.anode.wetMass;
export const selectCThickness = (state) => state.stack.cathode.thickness;
export const selectAThickness = (state) => state.stack.anode.thickness;
export const selectDiameter = (state) => state.stack.diameter;
export const selectArealEnergyDensity = (state) => state.stack.arealEnergyDensity;
export const selectSMassLoading = (state) => state.stack.separator.massLoading;
export const selectSThickness = (state) => state.stack.separator.thickness;
export const selectCCCMassLoading = (state) => state.stack.cathodeCC.massLoading;
export const selectCCCMass = (state) => state.stack.cathodeCC.mass;
export const selectACCMassLoading = (state) => state.stack.anodeCC.massLoading;
export const selectACCMass = (state) => state.stack.anodeCC.mass;
export const selectCCCThickness = (state) => state.stack.cathodeCC.thickness;
export const selectACCThickness = (state) => state.stack.anodeCC.thickness;
export const selectTotalCathodeMass = (state) => state.stack.totalCathodeMass;
export const selectTotalCathodeThickness = (state) => state.stack.totalCathodeThickness;
export const selectTotalAnodeMass = (state) => state.stack.totalAnodeMass;
export const selectTotalAnodeThickness = (state) => state.stack.totalAnodeThickness;
export const selectAvgVoltage = (state) => state.stack.averageVoltage;
export const selectLowRateCapacity = (state) => state.stack.lowRateCapacity;
export const selectMeasuredCapacity = (state) => state.stack.measuredCapacity;
export const selectStack = (state) => state.stack

export const selectActiveElectrode = (state) => state.stack.activeElectrode;

export default stackSlice.reducer;
