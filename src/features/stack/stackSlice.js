import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cathode: {
    activeMaterial: {
      mass: 0,
      thickness: 0,
      massPercentDrySlurry: 0.95,
      density: 4.7e6,
      theoreticSpecificCapacity: 0.195,
    },
    binder: {
      mass: 0,
      thickness: 0,
      massPercentDrySlurry: 0.025,
      density: 1.78e6,
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
      density: 1e6, // g/m3
    },
    dryMass: 4.95e-3, // in g
    thickness: 100, // in µm
    wetMass: 5e-3,
    totalThickness: 100 + 10,
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
      density: 1e6,
    },
    dryMass: 2.95e-3,
    thickness: 100, // in µm
    wetMass: 3e-3,
    totalThickness: 100 + 10,
  },
  separator: {
    massLoading: 16.5,
    thickness: 16, // in um
    density: 0.9e6,
  },
  cathodeCC: {
    mass: 1e-4,
    thickness: 10, //in um
  },
  anodeCC: {
    mass: 1e-4,
    thickness: 10, // in µm
  },
  area: 1,
  averageVoltage: 3,
  lowRateCapacity: 5, // mAh
  measuredCapacity: 2, //mAh
  npRatio: 1,
  activeElectrode: "none",
  showSubElectrode: false,
  wetMassMode: "Wet",
};

initialState.cathode.porosity = calculatePorosity(
  initialState.area,
  initialState.cathodeCC.thickness,
  initialState.cathode.thickness,
  initialState.cathode.wetMass,
  initialState.cathode.dryMass,
  initialState.cathode.electrolyte.density
);

initialState.anode.porosity = calculatePorosity(
  initialState.area,
  initialState.anodeCC.thickness,
  initialState.anode.thickness,
  initialState.anode.wetMass,
  initialState.anode.dryMass,
  initialState.anode.electrolyte.density
);

function calculatePorosity(
  area,
  CCThickness,
  totalThickness,
  wetMass,
  dryMass,
  electrolyteDensity
) {
  const totalVolume = (totalThickness - CCThickness) * area * 1e-12; // in m3
  const massElectrolyte = wetMass - dryMass; // in g
  const volumeElectrolyte = massElectrolyte / electrolyteDensity; // in m3
  return (volumeElectrolyte / totalVolume).toPrecision(3);
}

function calculateWetMass(
  area,
  CCThickness,
  totalThickness,
  dryMass,
  electrolyteDensity,
  porosity
) {
  const totalVolume = (totalThickness - CCThickness) * area * 1e-12; // in m3
  const volumeElectrolyte = porosity * totalVolume; // in m3
  const massElectrolyte = volumeElectrolyte * electrolyteDensity; // in g
  return dryMass + massElectrolyte;
}

export const stackSlice = createSlice({
  name: "stack",
  initialState,
  reducers: {
    setArea: (state, action) => {
      state.area = action.payload;
    },
    setActiveElectrode: (state, action) => {
      state.activeElectrode = action.payload;
    },
    setCCCThickness: (state, action) => {
      state.cathodeCC.thickness = action.payload;
    },
    setCCCMass: (state, action) => {
      state.cathodeCC.mass = action.payload;
    },
    setACCThickness: (state, action) => {
      state.anodeCC.thickness = action.payload;
    },
    setACCMass: (state, action) => {
      state.anodeCC.mass = action.payload;
    },
    setWetCathodeMass: (state, action) => {
      state.cathode.wetMass = action.payload;
    },
    setTotalCathodeThickness: (state, action) => {
      state.cathode.totalThickness = action.payload;
    },
    setWetAnodeMass: (state, action) => {
      state.anode.wetMass = action.payload;
    },
    setTotalAnodeThickness: (state, action) => {
      state.anode.totalThickness = action.payload;
    },
    setDryCathodeMass: (state, action) => {
      state.cathode.dryMass = action.payload;
    },
    setDryAnodeMass: (state, action) => {
      state.anode.dryMass = action.payload;
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
    setCPorosity: (state, action) => {
      state.cathode.porosity = action.payload;
    },
    setAPorosity: (state, action) => {
      state.anode.porosity = action.payload;
    },
    setCEDensity: (state, action) => {
      state.cathode.electrolyte.density = action.payload;
    },
    setAEDensity: (state, action) => {
      state.anode.electrolyte.density = action.payload;
    },
    setWetMassMode: (state, action) => {
      state.wetMassMode = action.payload;
    },
    updateCPorosity: (state) => {
      state.cathode.porosity = calculatePorosity(
        state.area,
        state.cathodeCC.thickness,
        state.cathode.totalThickness,
        state.cathode.wetMass,
        state.cathode.dryMass,
        state.cathode.electrolyte.density
      );
    },
    updateAPorosity: (state) => {
      state.anode.porosity = calculatePorosity(
        state.area,
        state.anodeCC.thickness,
        state.anode.totalThickness,
        state.anode.wetMass,
        state.anode.dryMass,
        state.anode.electrolyte.density
      );
    },
    updateCWetMass: (state) => {
      state.cathode.wetMass = calculateWetMass(
        state.area,
        state.cathodeCC.thickness,
        state.cathode.totalThickness,
        state.cathode.dryMass,
        state.cathode.electrolyte.density,
        state.cathode.porosity
      );
    },
    updateAWetMass: (state) => {
      state.anode.wetMass = calculateWetMass(
        state.area,
        state.anodeCC.thickness,
        state.anode.totalThickness,
        state.anode.dryMass,
        state.anode.electrolyte.density,
        state.anode.porosity
      );
    },
  },
});

export const {
  setCWetMass,
  setAWetMass,
  setCThickness,
  setAThickness,
  setArea,
  setArealEnergyDensity,
  setActiveElectrode,
  setCCCThickness,
  setCCCMass,
  setWetCathodeMass,
  setTotalCathodeThickness,
  setAvgVoltage,
  setLowRateCapacity,
  setMeasuredCapacity,
  setACCMass,
  setACCThickness,
  setWetAnodeMass,
  setTotalAnodeThickness,
  setCAMMass,
  setCAMThickness,
  setAAMMass,
  setAAMThickness,
  setCBMass,
  setCBThickness,
  setABMass,
  setABThickness,
  setCCAMass,
  setCCAThickness,
  setACAMass,
  setACAThickness,
  setCEMass,
  setCEThickness,
  setAEMass,
  setAEThickness,
  setCPorosity,
  setAPorosity,
  setShowSubelectrode,
  setDryCathodeMass,
  setWetMassMode,
  setCEDensity,
  setAEDensity,
  setDryAnodeMass,
  updateCPorosity,
  updateAPorosity,
  updateCWetMass,
  updateAWetMass,
} = stackSlice.actions;

export const selectCWetMass = (state) => state.stack.cathode.wetMass;
export const selectAWetMass = (state) => state.stack.anode.wetMass;
export const selectCThickness = (state) => state.stack.cathode.thickness;
export const selectAThickness = (state) => state.stack.anode.thickness;
export const selectArea = (state) => state.stack.area;
export const selectArealEnergyDensity = (state) =>
  state.stack.arealEnergyDensity;
export const selectSMassLoading = (state) => state.stack.separator.massLoading;
export const selectSThickness = (state) => state.stack.separator.thickness;
export const selectCCCMassLoading = (state) =>
  state.stack.cathodeCC.massLoading;
export const selectCCCMass = (state) => state.stack.cathodeCC.mass;
export const selectACCMassLoading = (state) => state.stack.anodeCC.massLoading;
export const selectACCMass = (state) => state.stack.anodeCC.mass;
export const selectCCCThickness = (state) => state.stack.cathodeCC.thickness;
export const selectACCThickness = (state) => state.stack.anodeCC.thickness;
export const selectSMass = (state) => state.stack.separator.mass;
export const selectTotalCathodeMass = (state) => state.stack.cathode.wetMass;
export const selectTotalCathodeThickness = (state) =>
  state.stack.cathode.totalThickness;
export const selectTotalAnodeMass = (state) => state.stack.anode.wetMass;
export const selectTotalAnodeThickness = (state) =>
  state.stack.anode.totalThickness;
export const selectAvgVoltage = (state) => state.stack.averageVoltage;
export const selectLowRateCapacity = (state) => state.stack.lowRateCapacity;
export const selectMeasuredCapacity = (state) => state.stack.measuredCapacity;
export const selectStack = (state) => state.stack;
export const selectShowSubElectrode = (state) => state.stack.showSubElectrode;
export const selectWetMassMode = (state) => state.stack.wetMassMode;
export const selectDryCathodeMass = (state) => state.stack.cathode.dryMass;
export const selectDryAnodeMass = (state) => state.stack.anode.dryMass;

export const selectCPorosity = (state) => state.stack.cathode.porosity;
export const selectAPorosity = (state) => state.stack.anode.porosity;

export const selectCEDensity = (state) =>
  state.stack.cathode.electrolyte.density;
export const selectAEDensity = (state) => state.stack.anode.electrolyte.density;

export const selectActiveElectrode = (state) => state.stack.activeElectrode;

export default stackSlice.reducer;
