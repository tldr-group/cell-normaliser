import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { WetMassBox } from "./components/wetMassBox";
import { valueReturn, validate } from "./stackFunctions";
import {
  setAThickness,
  setCThickness,
  setArea,
  selectArea,
  selectActiveElectrode,
  setActiveElectrode,
  setCCCThickness,
  selectCCCThickness,
  selectCCCMass,
  setCCCMass,
  selectACCMass,
  setACCMass,
  setTotalCathodeMass,
  setTotalCathodeThickness,
  selectTotalCathodeThickness,
  setTotalAnodeMass,
  setTotalAnodeThickness,
  selectTotalAnodeThickness,
  selectLowRateCapacity,
  selectStack,
  selectACCThickness,
  setACCThickness,
  setAAMMass,
  setAAMThickness,
  setCAMMass,
  setCAMThickness,
} from "./stackSlice";

import styles from "./Stack.module.css";
import "./../../App.css";

export function Electrode() {
  const Area = useSelector(selectArea);
  const ActiveElectrode = useSelector(selectActiveElectrode);
  const CCCThickness = useSelector(selectCCCThickness);
  const CCCMass = useSelector(selectCCCMass);
  const ACCMass = useSelector(selectACCMass);
  const ACCThickness = useSelector(selectACCThickness);
  const TotalCathodeThickness = useSelector(selectTotalCathodeThickness);
  const TotalAnodeThickness = useSelector(selectTotalAnodeThickness);
  const LowRateCapacity = useSelector(selectLowRateCapacity);
  const Stack = useSelector(selectStack);
  const dispatch = useDispatch();

  useEffect(() => {
    syncElectrode();
  }, [Stack]);

  function syncElectrode() {
    var LRCap = Stack.npRatio * LowRateCapacity;
    if (ActiveElectrode === "cathode") {
      var anodeAMMass =
        LRCap / (Stack.anode.activeMaterial.theoreticSpecificCapacity * 1e3);
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
      dispatch(setAAMMass(anodeAMMass));

      var anodeAMThickness =
        (anodeAMMass * 1e6) /
        (Stack.anode.activeMaterial.density * (Area * 1e-3 ** 2));
      var anodeBThickness =
        (anodeBMass * 1e6) / (Stack.anode.binder.density * (Area * 1e-3 ** 2));
      var anodeCAThickness =
        (anodeCAMass * 1e6) /
        (Stack.anode.conductiveAdditive.density * (Area * 1e-3 ** 2));
      dispatch(setAAMThickness(anodeAMThickness));

      var anodeThickness =
        (anodeAMThickness + anodeBThickness + anodeCAThickness) /
        (1 - Stack.anode.porosity);
      var anodeEThickness = Stack.anode.porosity * anodeThickness;
      var anodeEMass =
        anodeEThickness *
        1e-6 *
        Stack.anode.electrolyte.density *
        (Area * 1e-3 ** 2);
      var anodeMass = Number(
        anodeAMMass + anodeBMass + anodeCAMass + anodeEMass
      );

      dispatch(setAThickness(anodeThickness));
      dispatch(setTotalAnodeMass(anodeMass + ACCMass));
      dispatch(setTotalAnodeThickness(anodeThickness + ACCThickness));
    } else if (ActiveElectrode === "anode") {
      var cathodeAMMass =
        LRCap / (Stack.cathode.activeMaterial.theoreticSpecificCapacity * 1e3);
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
      dispatch(setCAMMass(cathodeCAMass));

      var cathodeAMThickness =
        (cathodeAMMass * 1e6) /
        (Stack.cathode.activeMaterial.density * (Area * 1e-3 ** 2));
      var cathodeBThickness =
        (cathodeBMass * 1e6) /
        (Stack.cathode.binder.density * (Area * 1e-3 ** 2));
      var cathodeCAThickness =
        (cathodeCAMass * 1e6) /
        (Stack.cathode.conductiveAdditive.density * (Area * 1e-3 ** 2));
      dispatch(setCAMThickness(cathodeAMThickness));

      var cathodeThickness =
        (cathodeAMThickness + cathodeBThickness + cathodeCAThickness) /
        (1 - Stack.cathode.porosity);
      var cathodeEThickness = Stack.cathode.porosity * cathodeThickness;
      var cathodeEMass =
        cathodeEThickness *
        1e-6 *
        Stack.cathode.electrolyte.density *
        (Area * 1e-3 ** 2);
      var cathodeMass = Number(
        cathodeAMMass + cathodeBMass + cathodeCAMass + cathodeEMass
      );

      dispatch(setCThickness(cathodeThickness));
      dispatch(setTotalCathodeMass(cathodeMass + CCCMass));
      dispatch(setTotalCathodeThickness(cathodeThickness + CCCThickness));
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
                  onClick={() => dispatch(setActiveElectrode("cathode"))}
                >
                  Cathode half cell
                </button>
              </div>
              <div className="box-4">
                <button
                  className={styles.button}
                  onClick={() => dispatch(setActiveElectrode("anode"))}
                >
                  Anode half cell
                </button>
              </div>
              <div className="box-4">
                <button
                  className={styles.button}
                  onClick={() => dispatch(setActiveElectrode("both"))}
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

  //   CATHODE HALF CELL
  else if (ActiveElectrode === "cathode") {
    return (
      <div className="box-row">
        <div className="box-12">
          <div className={styles.cathode}>
            <div className="box-12">
              <p className={styles.title}>Cathode</p>
            </div>

            <div className="box-12-row-4">
              <p className={styles.title}>
                Area / mm<sup>2</sup>
              </p>
              <input
                className={styles.button}
                aria-label="Set cathode area"
                onChange={(e) => dispatch(setArea(e.target.value))}
                value={String(valueReturn(Area))}
              ></input>
            </div>

            <div className="box-12-row-4">
              <p className={styles.title}>Current collector thickness / µm</p>
              <input
                className={styles.button}
                aria-label="Set cathode current collector thickness"
                onChange={(e) => dispatch(setCCCThickness(e.target.value))}
                value={String(valueReturn(CCCThickness))}
                onBlur={(e) => validate(e)}
              ></input>
            </div>

            <div className="box-12-row-4">
              <p className={styles.title}>Current collector mass / g</p>
              <input
                className={styles.button}
                type="text"
                aria-label="Set cathode current collector mass"
                value={String(valueReturn(CCCMass))}
                onChange={(e) => dispatch(setCCCMass(e.target.value))}
                onBlur={(e) => validate(e)}
              ></input>
            </div>

            <div className="box-12-row-4">
              <p className={styles.title}>
                Cathode + current collector thickness / µm
              </p>
              <input
                className={styles.button}
                aria-label="Set cathode thickness"
                onChange={(e) =>
                  dispatch(setTotalCathodeThickness(e.target.value))
                }
                value={valueReturn(TotalCathodeThickness)}
                onBlur={(e) => validate(e)}
              ></input>
            </div>

            <WetMassBox electrode={ActiveElectrode} />
          </div>
        </div>
      </div>
    );
  }

  // ANODE HALF CELL
  else if (ActiveElectrode === "anode") {
    return (
      <div className="box-row">
        <div className="box-12">
          <div className={styles.anode}>
            <div className="box-12">
              <p className={styles.title}>Anode</p>
            </div>

            <div className="box-12-row-4">
              <p className={styles.title}>
                Area / mm<sup>2</sup>
              </p>
              <input
                className={styles.button}
                aria-label="Set anode area"
                onChange={(e) => dispatch(setArea(e.target.value))}
                value={String(valueReturn(Area))}
              ></input>
            </div>

            <div className="box-12-row-4">
              <p className={styles.title}>Current collector thickness / µm</p>
              <input
                className={styles.button}
                aria-label="Set anode current collector thickness"
                onChange={(e) => dispatch(setACCThickness(e.target.value))}
                value={String(valueReturn(ACCThickness))}
                onBlur={(e) => validate(e)}
              ></input>
            </div>

            <div className="box-12-row-4">
              <p className={styles.title}>Current collector mass / g</p>
              <input
                className={styles.button}
                type="text"
                aria-label="Set anode current collector mass"
                value={String(valueReturn(ACCMass))}
                onChange={(e) => dispatch(setACCMass(e.target.value))}
                onBlur={(e) => validate(e)}
              ></input>
            </div>

            <div className="box-12-row-4">
              <p className={styles.title}>
                Anode + current collector thickness / µm
              </p>
              <input
                className={styles.button}
                aria-label="Set anode thickness"
                onChange={(e) =>
                  dispatch(setTotalAnodeThickness(e.target.value))
                }
                value={valueReturn(TotalAnodeThickness)}
                onBlur={(e) => validate(e)}
              ></input>
            </div>

            <WetMassBox electrode={ActiveElectrode} />
          </div>
        </div>
      </div>
    );
  }

  // FULL CELL
  else if (ActiveElectrode === "both") {
    return (
      <div className="box-row">
        <div className="box-6">
          <div className={styles.cathode}>
            <div className="box-12">
              <p className={styles.title}>Cathode</p>
            </div>

            <div className="box-12-row-4">
              <p className={styles.title}>
                Area / mm<sup>2</sup>
              </p>
              <input
                className={styles.button}
                aria-label="Set cathode area"
                onChange={(e) => dispatch(setArea(e.target.value))}
                value={String(valueReturn(Area))}
              ></input>
            </div>

            <div className="box-12-row-4">
              <p className={styles.title}>Current collector thickness / µm</p>
              <input
                className={styles.button}
                aria-label="Set cathode current collector thickness"
                onChange={(e) => dispatch(setCCCThickness(e.target.value))}
                value={String(valueReturn(CCCThickness))}
                onBlur={(e) => validate(e)}
              ></input>
            </div>

            <div className="box-12-row-4">
              <p className={styles.title}>Current collector mass / g</p>
              <input
                className={styles.button}
                type="text"
                aria-label="Set cathode current collector mass"
                value={String(valueReturn(CCCMass))}
                onChange={(e) => dispatch(setCCCMass(e.target.value))}
                onBlur={(e) => validate(e)}
              ></input>
            </div>

            <div className="box-12-row-4">
              <p className={styles.title}>
                Cathode + current collector thickness / µm
              </p>
              <input
                className={styles.button}
                aria-label="Set cathode thickness"
                onChange={(e) =>
                  dispatch(setTotalCathodeThickness(e.target.value))
                }
                value={valueReturn(TotalCathodeThickness)}
                onBlur={(e) => validate(e)}
              ></input>
            </div>

            <WetMassBox electrode="cathode" />
          </div>
        </div>

        <div className="box-6">
          <div className={styles.anode}>
            <div className="box-12">
              <p className={styles.title}>Anode</p>
            </div>

            <div className="box-12-row-4">
              <p className={styles.title}>
                Area / mm<sup>2</sup>
              </p>
              <input
                className={styles.button}
                aria-label="Set anode area"
                onChange={(e) => dispatch(setArea(e.target.value))}
                value={String(valueReturn(Area))}
              ></input>
            </div>

            <div className="box-12-row-4">
              <p className={styles.title}>Current collector thickness / µm</p>
              <input
                className={styles.button}
                aria-label="Set anode current collector thickness"
                onChange={(e) => dispatch(setACCThickness(e.target.value))}
                value={String(valueReturn(ACCThickness))}
                onBlur={(e) => validate(e)}
              ></input>
            </div>

            <div className="box-12-row-4">
              <p className={styles.title}>Current collector mass / g</p>
              <input
                className={styles.button}
                type="text"
                aria-label="Set anode current collector mass"
                value={String(valueReturn(ACCMass))}
                onChange={(e) => dispatch(setACCMass(e.target.value))}
                onBlur={(e) => validate(e)}
              ></input>
            </div>

            <div className="box-12-row-4">
              <p className={styles.title}>
                Anode + current collector thickness / µm
              </p>
              <input
                className={styles.button}
                aria-label="Set anode thickness"
                onChange={(e) =>
                  dispatch(setTotalAnodeThickness(e.target.value))
                }
                value={valueReturn(TotalAnodeThickness)}
                onBlur={(e) => validate(e)}
              ></input>
            </div>

            <WetMassBox electrode="anode" />
          </div>
        </div>
      </div>
    );
  }
}
