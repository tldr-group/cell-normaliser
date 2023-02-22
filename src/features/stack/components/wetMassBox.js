import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./../Stack.module.css";
import { valueReturn, validate } from "./../stackFunctions";
import {
  selectTotalCathodeMass,
  selectTotalAnodeMass,
  selectWetMassMode,
  selectCPorosity,
  selectAPorosity,
  selectAEDensity,
  selectCEDensity,
  setCEDensity,
  setAEDensity,
  setAPorosity,
  setTotalAnodeMass,
  setTotalCathodeMass,
  setWetMassMode,
  setCPorosity,
} from "./../stackSlice";

export function WetMassBox(electrode) {
  electrode = electrode.electrode;
  const TotalCathodeMass = useSelector(selectTotalCathodeMass);
  const TotalAnodeMass = useSelector(selectTotalAnodeMass);
  const WetMassMode = useSelector(selectWetMassMode);
  const CPorosity = useSelector(selectCPorosity);
  const APorosity = useSelector(selectAPorosity);
  const CEDensity = useSelector(selectCEDensity);
  const AEDensity = useSelector(selectAEDensity);
  const dispatch = useDispatch();

  const WetMass = electrode === "cathode" ? TotalCathodeMass : TotalAnodeMass;
  const Porosity = electrode === "cathode" ? CPorosity : APorosity;
  const Density = electrode === "cathode" ? CEDensity : AEDensity;

  const setWetMass =
    electrode === "cathode" ? setTotalCathodeMass : setTotalAnodeMass;
  const setPorosity = electrode === "cathode" ? setCPorosity : setAPorosity;
  const setDensity = electrode === "cathode" ? setCEDensity : setAEDensity;

  return (
    <>
      <div className="box-12-row-4">
        <p
          className={styles.title + " " + styles.clickable}
          onClick={() => dispatch(setWetMassMode("Wet"))}
        >
          Electrolyte + {electrode} + current collector mass / g
        </p>
        <input
          className={styles.button}
          type="text"
          aria-label="Set wet mass"
          value={String(valueReturn(WetMass))}
          onChange={(e) => dispatch(setWetMass(e.target.value))}
          onBlur={(e) => validate(e)}
          disabled={WetMassMode === "Wet" ? false : true}
        ></input>
      </div>
      <div className="box-12-row-4">
        <p
          className={styles.title + " " + styles.clickable}
          onClick={() => dispatch(setWetMassMode("Dry"))}
        >
          Porosity
        </p>
        <input
          className={styles.button}
          type="text"
          aria-label="Set porosity"
          value={String(valueReturn(Porosity))}
          onChange={(e) => dispatch(setPorosity(e.target.value))}
          onBlur={(e) => validate(e)}
          disabled={WetMassMode === "Dry" ? false : true}
        ></input>
      </div>

      <div className="box-12-row-4">
        <p
          className={styles.title + " " + styles.clickable}
          onClick={() => dispatch(setWetMassMode("Dry"))}
        >
          Electrolyte density / g m<sup>-3</sup>
        </p>
        <input
          className={styles.button}
          type="text"
          aria-label="Set electrolyte density"
          value={String(valueReturn(Density))}
          onChange={(e) => dispatch(setDensity(e.target.value))}
          onBlur={(e) => validate(e)}
          disabled={WetMassMode === "Dry" ? false : true}
        ></input>
      </div>
    </>
  );
}
