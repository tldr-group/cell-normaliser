import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./../Stack.module.css";
import { ResetElectrodes } from "./reset";
import { valueReturn, validate } from "../stackFunctions";
import { WetMassBox } from "./wetMassBox";
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
} from "./../stackSlice";

export function ElectrodeBox(props) {
  const ActiveElectrode = props.electrode;
  const Area = useSelector(selectArea);
  const CCCThickness = useSelector(selectCCCThickness);
  const CCCMass = useSelector(selectCCCMass);
  const ACCMass = useSelector(selectACCMass);
  const ACCThickness = useSelector(selectACCThickness);
  const TotalCathodeThickness = useSelector(selectTotalCathodeThickness);
  const TotalAnodeThickness = useSelector(selectTotalAnodeThickness);
  const setCCThickness =
    ActiveElectrode === "cathode" ? setCCCThickness : setACCThickness;
  const CCThickness =
    ActiveElectrode === "cathode" ? CCCThickness : ACCThickness;
  const setCCMass = ActiveElectrode === "cathode" ? setCCCMass : setACCMass;
  const CCMass = ActiveElectrode === "cathode" ? CCCMass : ACCMass;
  const setTotalThickness =
    ActiveElectrode === "cathode"
      ? setTotalCathodeThickness
      : setTotalAnodeThickness;
  const TotalThickness =
    ActiveElectrode === "cathode" ? TotalCathodeThickness : TotalAnodeThickness;
  const dispatch = useDispatch();
  return (
    <div className="box-row">
      <div className="box-12">
        <div className={styles.cathode}>
          <div className="box-12">
            <p className={styles.title}>{ActiveElectrode}</p>
          </div>

          <div className="box-12-row-4">
            <p className={styles.title}>
              Area / mm<sup>2</sup>
            </p>
            <input
              className={styles.button}
              aria-label="Set area"
              onChange={(e) => dispatch(setArea(e.target.value))}
              value={String(valueReturn(Area))}
            ></input>
          </div>

          <div className="box-12-row-4">
            <p className={styles.title}>Current collector thickness / µm</p>
            <input
              className={styles.button}
              aria-label="Set current collector thickness"
              onChange={(e) => dispatch(setCCThickness(e.target.value))}
              value={String(valueReturn(CCThickness))}
              onBlur={(e) => validate(e)}
            ></input>
          </div>

          <div className="box-12-row-4">
            <p className={styles.title}>Current collector mass / g</p>
            <input
              className={styles.button}
              type="text"
              aria-label="Set current collector mass"
              value={String(valueReturn(CCMass))}
              onChange={(e) => dispatch(setCCMass(e.target.value))}
              onBlur={(e) => validate(e)}
            ></input>
          </div>

          <div className="box-12-row-4">
            <p className={styles.title}>
              {ActiveElectrode} + current collector thickness / µm
            </p>
            <input
              className={styles.button}
              aria-label="Set thickness"
              onChange={(e) => dispatch(setTotalThickness(e.target.value))}
              value={valueReturn(TotalThickness)}
              onBlur={(e) => validate(e)}
            ></input>
          </div>

          <WetMassBox electrode={ActiveElectrode} />

          <ResetElectrodes />
        </div>
      </div>
    </div>
  );
}
