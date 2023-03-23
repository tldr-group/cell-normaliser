import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cathode: {
    activeMaterial: {
      mass: 0,
      thickness: 0,
      massPercentDrySlurry: 0.95,
      density: 4.95e6, // g m-3
      theoreticSpecificCapacity: 0.19, // A h g-1
    },
    binder: {
      mass: 0,
      thickness: 0,
      massPercentDrySlurry: 0.025,
      density: 2e6,
    },
    conductiveAdditive: {
      mass: 0,
      thickness: 0,
      massPercentDrySlurry: 0.025,
      density: 2e6,
    },
    dryMass: 24.85, // in mg
    thickness: 96.9 - 11.7, // in µm
    wetMass: 27.4, // in mg
    totalThickness: 96.9,
  },
  anode: {
    activeMaterial: {
      mass: 0,
      thickness: 0,
      massPercentDrySlurry: 0.95,
      density: 4.26e6, // g m-3
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
    dryMass: 24.85, // in mg
    thickness: 96.9 - 11.7, // in µm
    wetMass: 27.48, // in mg
    totalThickness: 96.9,
  },
  electrolyte: {
    density: 1.2e6,
  },
  separator: {
    thickness: 12, // in um
    massLoading: 12492, // mg m-2
  },
  cathodeCC: {
    mass: 4.4, // in mg
    thickness: 16.3, //in um
  },
  anodeCC: {
    mass: 10.48, // in mg
    thickness: 11.7, // in µm
  },
  area: 100,
  averageVoltage: 3.7,
  lowRateCapacity: 4.67, // mAh
  measuredCapacity: 4.67, //mAh
  measuredCurrent: 0.99, // mA
  npRatio: 1.1,
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
  initialState.electrolyte.density
);

initialState.anode.porosity = calculatePorosity(
  initialState.area,
  initialState.anodeCC.thickness,
  initialState.anode.thickness,
  initialState.anode.wetMass,
  initialState.anode.dryMass,
  initialState.electrolyte.density
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
  const massElectrolyte = wetMass - dryMass; // in mg
  const volumeElectrolyte = (massElectrolyte * 1e-3) / electrolyteDensity; // in m3
  return Number((volumeElectrolyte / totalVolume).toPrecision(3));
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
  return dryMass + massElectrolyte * 1e3;
}

function widenElectrodeContainer(ActiveElectrode) {
  const eContainer = document.getElementById("electrode-container");
  const sContainer = document.getElementById("stack-container");
  const cContainer = document.getElementById("cell-container");
  if (ActiveElectrode === "both") {
    eContainer.className = "";
    eContainer.classList.add("box-12");
    sContainer.className = "";
    sContainer.classList.add("box-6");
    cContainer.className = "";
    cContainer.classList.add("box-6");
  } else {
    eContainer.className = "";
    eContainer.classList.add("box-6");
    sContainer.className = "";
    sContainer.classList.add("box-3");
    cContainer.className = "";
    cContainer.classList.add("box-3");
  }
}

export const stackSlice = createSlice({
  name: "stack",
  initialState,
  reducers: {
    setArea: (state, action) => {
      if (action.payload === "") {
        state.area = action.payload;
      } else {
        state.area = Number(action.payload);
      }
    },
    setActiveElectrode: (state, action) => {
      state.activeElectrode = action.payload;
      widenElectrodeContainer(action.payload);
    },
    setCCCThickness: (state, action) => {
      if (action.payload === "") {
        state.cathodeCC.thickness = action.payload;
      } else {
        state.cathodeCC.thickness = Number(action.payload);
      }
    },
    setCCCMass: (state, action) => {
      if (action.payload === "") {
        state.cathodeCC.mass = action.payload;
      } else {
        state.cathodeCC.mass = Number(action.payload);
      }
    },
    setACCThickness: (state, action) => {
      if (action.payload === "") {
        state.anodeCC.thickness = action.payload;
      } else {
        state.anodeCC.thickness = Number(action.payload);
      }
    },
    setACCMass: (state, action) => {
      if (action.payload === "") {
        state.anodeCC.mass = action.payload;
      } else {
        state.anodeCC.mass = Number(action.payload);
      }
    },
    setWetCathodeMass: (state, action) => {
      if (action.payload === "") {
        state.cathode.wetMass = action.payload;
      } else {
        state.cathode.wetMass = Number(action.payload);
      }
    },
    setTotalCathodeThickness: (state, action) => {
      if (action.payload === "") {
        state.cathode.totalThickness = action.payload;
      } else {
        state.cathode.totalThickness = Number(action.payload);
      }
    },
    setWetAnodeMass: (state, action) => {
      if (action.payload === "") {
        state.anode.wetMass = action.payload;
      } else {
        state.anode.wetMass = Number(action.payload);
      }
    },
    setTotalAnodeThickness: (state, action) => {
      if (action.payload === "") {
        state.anode.totalThickness = action.payload;
      } else {
        state.anode.totalThickness = Number(action.payload);
      }
    },
    setDryCathodeMass: (state, action) => {
      if (action.payload === "") {
        state.cathode.dryMass = action.payload;
      } else {
        state.cathode.dryMass = Number(action.payload);
      }
    },
    setDryAnodeMass: (state, action) => {
      if (action.payload === "") {
        state.anode.dryMass = action.payload;
      } else {
        state.anode.dryMass = Number(action.payload);
      }
    },
    setAvgVoltage: (state, action) => {
      if (action.payload === "") {
        state.avgVoltage = action.payload;
      } else {
        state.avgVoltage = Number(action.payload);
      }
    },
    setLowRateCapacity: (state, action) => {
      if (action.payload === "") {
        state.lowRateCapacity = action.payload;
      } else {
        state.lowRateCapacity = Number(action.payload);
      }
    },
    setMeasuredCapacity: (state, action) => {
      if (action.payload === "") {
        state.measuredCapacity = action.payload;
      } else {
        state.measuredCapacity = Number(action.payload);
      }
    },
    setMeasuredCurrent: (state, action) => {
      if (action.payload === "") {
        state.measuredCurrent = action.payload;
      } else {
        state.measuredCurrent = Number(action.payload);
      }
    },
    setCPorosity: (state, action) => {
      if (action.payload === "") {
        state.cathode.porosity = action.payload;
      } else {
        state.cathode.porosity = Number(action.payload);
      }
    },
    setAPorosity: (state, action) => {
      if (action.payload === "") {
        state.anode.porosity = action.payload;
      } else {
        state.anode.porosity = Number(action.payload);
      }
    },
    setEDensity: (state, action) => {
      if (action.payload === "") {
        state.electrolyte.density = action.payload;
      } else {
        state.electrolyte.density = Number(action.payload);
      }
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
        state.electrolyte.density
      );
    },
    updateAPorosity: (state) => {
      state.anode.porosity = calculatePorosity(
        state.area,
        state.anodeCC.thickness,
        state.anode.totalThickness,
        state.anode.wetMass,
        state.anode.dryMass,
        state.electrolyte.density
      );
    },
    updateCWetMass: (state) => {
      state.cathode.wetMass = calculateWetMass(
        state.area,
        state.cathodeCC.thickness,
        state.cathode.totalThickness,
        state.cathode.dryMass,
        state.electrolyte.density,
        state.cathode.porosity
      );
    },
    updateAWetMass: (state) => {
      state.anode.wetMass = calculateWetMass(
        state.area,
        state.anodeCC.thickness,
        state.anode.totalThickness,
        state.anode.dryMass,
        state.electrolyte.density,
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
  setMeasuredCurrent,
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
export const selectMeasuredCurrent = (state) => state.stack.measuredCurrent;
export const selectStack = (state) => state.stack;
export const selectShowSubElectrode = (state) => state.stack.showSubElectrode;
export const selectWetMassMode = (state) => state.stack.wetMassMode;
export const selectDryCathodeMass = (state) => state.stack.cathode.dryMass;
export const selectDryAnodeMass = (state) => state.stack.anode.dryMass;

export const selectCPorosity = (state) => state.stack.cathode.porosity;
export const selectAPorosity = (state) => state.stack.anode.porosity;

export const selectEDensity = (state) => state.stack.electrolyte.density;

export const selectActiveElectrode = (state) => state.stack.activeElectrode;

export default stackSlice.reducer;
