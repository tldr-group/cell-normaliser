import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as stackSlice from "./stackSlice";

import styles from "./Stack.module.css";
import "./../../App.css";
import { ElectrodeBox } from "./components/electrodeBox";

export function Electrode() {
  const Area = useSelector(stackSlice.selectArea);
  const ActiveElectrode = useSelector(stackSlice.selectActiveElectrode);
  const CCCThickness = useSelector(stackSlice.selectCCCThickness);
  const CCCMass = useSelector(stackSlice.selectCCCMass);
  const ACCMass = useSelector(stackSlice.selectACCMass);
  const ACCThickness = useSelector(stackSlice.selectACCThickness);
  const LowRateCapacity = useSelector(stackSlice.selectLowRateCapacity);
  const Stack = useSelector(stackSlice.selectStack);
  const dispatch = useDispatch();

  useEffect(() => {
    syncElectrode();
    updatePorosityOrWetMass();
  }, [Stack]);

  function syncElectrode() {
    if (ActiveElectrode === "cathode") {
      var LRCap = LowRateCapacity * Stack.npRatio;
      var anodeAMMass =
        LRCap / Stack.anode.activeMaterial.theoreticSpecificCapacity;
      var anodeBMass =
        (Stack.anode.binder.massPercentDrySlurry * anodeAMMass) /
        (1 -
          Stack.anode.binder.massPercentDrySlurry -
          Stack.anode.conductiveAdditive.massPercentDrySlurry);
      var anodeCAMass =
        (Stack.anode.conductiveAdditive.massPercentDrySlurry * anodeAMMass) /
        (1 -
          Stack.anode.binder.massPercentDrySlurry -
          Stack.anode.conductiveAdditive.massPercentDrySlurry);

      var anodeAMThickness =
        (anodeAMMass * 1e6) /
        (Stack.anode.activeMaterial.density * (Area * 1e-3 ** 2));
      var anodeBThickness =
        (anodeBMass * 1e6) / (Stack.anode.binder.density * (Area * 1e-3 ** 2));
      var anodeCAThickness =
        (anodeCAMass * 1e6) /
        (Stack.anode.conductiveAdditive.density * (Area * 1e-3 ** 2));

      var anodeThickness =
        (anodeAMThickness + anodeBThickness + anodeCAThickness) /
        (1 - Stack.anode.porosity);
      var anodeEThickness = Stack.anode.porosity * anodeThickness;
      var anodeEMass =
        anodeEThickness * 1e-6 * Stack.electrolyte.density * (Area * 1e-3 ** 2);
      var anodeMass = Number(
        anodeAMMass + anodeBMass + anodeCAMass + anodeEMass
      );

      dispatch(
        stackSlice.setWetAnodeMass((anodeMass + ACCMass).toPrecision(3))
      );
      dispatch(
        stackSlice.setTotalAnodeThickness(
          (anodeThickness + ACCThickness).toPrecision(3)
        )
      );
    } else if (ActiveElectrode === "anode") {
      var LRCap = LowRateCapacity / Stack.npRatio;
      var cathodeAMMass =
        LRCap / Stack.cathode.activeMaterial.theoreticSpecificCapacity;
      var cathodeBMass =
        (Stack.cathode.binder.massPercentDrySlurry * cathodeAMMass) /
        (1 -
          Stack.cathode.binder.massPercentDrySlurry -
          Stack.cathode.conductiveAdditive.massPercentDrySlurry);
      var cathodeCAMass =
        (Stack.cathode.conductiveAdditive.massPercentDrySlurry *
          cathodeAMMass) /
        (1 -
          Stack.cathode.binder.massPercentDrySlurry -
          Stack.cathode.conductiveAdditive.massPercentDrySlurry);

      var cathodeAMThickness =
        (cathodeAMMass * 1e3) /
        (Stack.cathode.activeMaterial.density * (Area * 1e-3 ** 2));
      var cathodeBThickness =
        (cathodeBMass * 1e3) /
        (Stack.cathode.binder.density * (Area * 1e-3 ** 2));
      var cathodeCAThickness =
        (cathodeCAMass * 1e3) /
        (Stack.cathode.conductiveAdditive.density * (Area * 1e-3 ** 2));

      var cathodeThickness =
        (cathodeAMThickness + cathodeBThickness + cathodeCAThickness) /
        (1 - 0.335); // 0.335 is the porosity of the cathode
      var cathodeEThickness = 0.335 * cathodeThickness;
      var cathodeEMass =
        cathodeEThickness *
        1e-6 *
        Stack.electrolyte.density *
        (Area * 1e-3 ** 2) *
        1e3;
      var cathodeMass = Number(
        cathodeAMMass + cathodeBMass + cathodeCAMass + cathodeEMass
      );
      console.log(cathodeBMass, cathodeCAMass, cathodeMass);

      dispatch(
        stackSlice.setWetCathodeMass((cathodeMass + CCCMass).toPrecision(3))
      );
      dispatch(
        stackSlice.setTotalCathodeThickness(
          (cathodeThickness + CCCThickness).toPrecision(3)
        )
      );
    }
  }

  function updatePorosityOrWetMass() {
    if (Stack.wetMassMode === "Wet" && ActiveElectrode === "cathode") {
      dispatch(stackSlice.updateCPorosity());
    } else if (Stack.wetMassMode === "Wet" && ActiveElectrode === "anode") {
      dispatch(stackSlice.updateAPorosity());
    } else if (Stack.wetMassMode === "Dry" && ActiveElectrode === "cathode") {
      dispatch(stackSlice.updateCWetMass());
    } else if (Stack.wetMassMode === "Dry" && ActiveElectrode === "anode") {
      dispatch(stackSlice.updateAWetMass());
    } else if (Stack.wetMassMode === "Dry" && ActiveElectrode === "both") {
      dispatch(stackSlice.updateCWetMass());
      dispatch(stackSlice.updateAWetMass());
    } else if (Stack.wetMassMode === "Wet" && ActiveElectrode === "both") {
      dispatch(stackSlice.updateCPorosity());
      dispatch(stackSlice.updateAPorosity());
    }
  }

  if (ActiveElectrode === "none") {
    return (
      <div className="box-row">
        <div className="box-12">
          <div className={styles.selector}>
            <div className="box-row">
              <div className="box-12">
                <p className={styles.title}>Choose your cell type</p>
              </div>
            </div>

            <div className="box-row">
              <div className="box-4">
                <button
                  className={styles.button}
                  onClick={() =>
                    dispatch(stackSlice.setActiveElectrode("cathode"))
                  }
                >
                  Cathode half cell
                </button>
              </div>
              <div className="box-4">
                <button
                  className={styles.button}
                  onClick={() =>
                    dispatch(stackSlice.setActiveElectrode("anode"))
                  }
                >
                  Anode half cell
                </button>
              </div>
              <div className="box-4">
                <button
                  className={styles.button}
                  onClick={() =>
                    dispatch(stackSlice.setActiveElectrode("both"))
                  }
                >
                  Full cell
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //   HALF CELL
  else if (ActiveElectrode === "cathode" || ActiveElectrode === "anode") {
    return <ElectrodeBox electrode={ActiveElectrode} />;
  }

  // FULL CELL
  else if (ActiveElectrode === "both") {
    return (
      <div className="box-row">
        <div className="box-6">
          <ElectrodeBox electrode="cathode" />
        </div>

        <div className="box-6">
          <ElectrodeBox electrode="anode" />
        </div>
      </div>
    );
  }
}
