import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./../Stack.module.css";
import { valueReturn, validate } from "./../stackFunctions";
import * as stackSlice from "./../stackSlice";

export function WetMassBox(electrode) {
  electrode = electrode.electrode;
  const TotalCathodeMass = useSelector(stackSlice.selectTotalCathodeMass);
  const TotalAnodeMass = useSelector(stackSlice.selectTotalAnodeMass);
  const WetMassMode = useSelector(stackSlice.selectWetMassMode);
  const CPorosity = useSelector(stackSlice.selectCPorosity);
  const APorosity = useSelector(stackSlice.selectAPorosity);
  const CEDensity = useSelector(stackSlice.selectCEDensity);
  const AEDensity = useSelector(stackSlice.selectAEDensity);
  const dispatch = useDispatch();

  const WetMass = electrode === "cathode" ? TotalCathodeMass : TotalAnodeMass;
  const Porosity = electrode === "cathode" ? CPorosity : APorosity;
  const Density = electrode === "cathode" ? CEDensity : AEDensity;

  const setWetMass =
    electrode === "cathode"
      ? stackSlice.setWetCathodeMass
      : stackSlice.setWetAnodeMass;
  const setPorosity =
    electrode === "cathode" ? stackSlice.setCPorosity : stackSlice.setAPorosity;
  const setDensity =
    electrode === "cathode" ? stackSlice.setCEDensity : stackSlice.setAEDensity;

  return (
    <>
      <div className="box-row">
        <div className="box-8 vertical-center-parent">
          <div className="vertical-center">
            <p
              className={styles.subtitle + " " + styles.clickable}
              onClick={() => dispatch(stackSlice.setWetMassMode("Wet"))}
            >
              Mass of electrolyte + {electrode} + current collector / g
            </p>
          </div>
        </div>
        <div className="box-4 vertical-center-parent">
          <div className="vertical-center">
            <input
              className={styles.button}
              type="number"
              aria-label="Set wet mass"
              value={valueReturn(WetMass)}
              onChange={(e) => dispatch(setWetMass(e.target.value))}
              onBlur={(e) => validate(e)}
              disabled={WetMassMode === "Wet" ? false : true}
            ></input>
          </div>
        </div>
      </div>
      <div className="box-row">
        <div className="box-8 vertical-center-parent">
          <div className="vertical-center">
            <p
              className={styles.subtitle + " " + styles.clickable}
              onClick={() => dispatch(stackSlice.setWetMassMode("Dry"))}
            >
              Porosity
            </p>
          </div>
        </div>
        <div className="box-4 vertical-center-parent">
          <div className="vertical-center">
            <input
              className={styles.button}
              aria-label="Set porosity"
              value={valueReturn(Porosity)}
              onChange={(e) => dispatch(setPorosity(e.target.value))}
              onBlur={(e) => validate(e)}
              type="number"
              disabled={WetMassMode === "Dry" ? false : true}
            ></input>
          </div>
        </div>
      </div>

      <div className="box-row">
        <div className="box-8 vertical-center-parent">
          <div className="vertical-center">
            <p
              className={styles.subtitle + " " + styles.clickable}
              onClick={() => dispatch(stackSlice.setWetMassMode("Dry"))}
            >
              Electrolyte density / g m<sup>-3</sup>
            </p>
          </div>
        </div>
        <div className="box-4 vertical-center-parent">
          <div className="vertical-center">
            <input
              className={styles.button}
              type="number"
              aria-label="Set electrolyte density"
              value={valueReturn(Density)}
              onChange={(e) => dispatch(setDensity(e.target.value))}
              onBlur={(e) => validate(e)}
              disabled={WetMassMode === "Dry" ? false : true}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}
