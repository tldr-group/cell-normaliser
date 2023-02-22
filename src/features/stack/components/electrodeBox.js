import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./../Stack.module.css";
import { ResetElectrodes } from "./reset";
import { valueReturn, validate, capitalise } from "../stackFunctions";
import { WetMassBox } from "./wetMassBox";
import {
  setArea,
  selectArea,
  setCCCThickness,
  selectCCCThickness,
  selectCCCMass,
  setCCCMass,
  selectACCMass,
  setACCMass,
  setTotalCathodeThickness,
  selectTotalCathodeThickness,
  setTotalAnodeThickness,
  selectTotalAnodeThickness,
  selectACCThickness,
  setACCThickness,
  setDryCathodeMass,
  setDryAnodeMass,
  selectDryCathodeMass,
  selectDryAnodeMass,
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
  const DryCathodeMass = useSelector(selectDryCathodeMass);
  const DryAnodeMass = useSelector(selectDryAnodeMass);
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
  const setDryMass =
    ActiveElectrode === "cathode" ? setDryCathodeMass : setDryAnodeMass;
  const DryMass = ActiveElectrode === "cathode" ? DryCathodeMass : DryAnodeMass;
  const dispatch = useDispatch();
  return (
    <div className="box-row">
      <div className="box-12">
        <div className={styles.cathode}>
          <div className="box-12">
            <p className={styles.title}>{capitalise(ActiveElectrode)}</p>
          </div>

          <div className="box-row">
            <div className="box-8 vertical-center-parent">
              <div className="vertical-center">
                <p className={styles.subtitle}>
                  Area / mm<sup>2</sup>
                </p>
              </div>
            </div>
            <div className="box-4 vertical-center-parent">
              <div className="vertical-center">
                <input
                  className={styles.button}
                  aria-label="Set area"
                  onChange={(e) => dispatch(setArea(e.target.value))}
                  value={String(valueReturn(Area))}
                ></input>
              </div>
            </div>
          </div>

          <div className="box-row">
            <div className="box-8 vertical-center-parent">
              <div className="vertical-center">
                <p className={styles.subtitle}>
                  Mass of current collector / µm
                </p>
              </div>
            </div>
            <div className="box-4 vertical-center-parent">
              <div className="vertical-center">
                <input
                  className={styles.button}
                  aria-label="Set current collector thickness"
                  onChange={(e) => dispatch(setCCThickness(e.target.value))}
                  value={String(valueReturn(CCThickness))}
                  onBlur={(e) => validate(e)}
                ></input>
              </div>
            </div>
          </div>

          <div className="box-row">
            <div className="box-8 vertical-center-parent">
              <div className="vertical-center">
                <p className={styles.subtitle}>
                  Thickness of {ActiveElectrode} + current collector / µm
                </p>
              </div>
            </div>
            <div className="box-4 vertical-center-parent">
              <div className="vertical-center">
                <input
                  className={styles.button}
                  aria-label="Set thickness"
                  onChange={(e) => dispatch(setTotalThickness(e.target.value))}
                  value={String(valueReturn(TotalThickness))}
                  onBlur={(e) => validate(e)}
                ></input>
              </div>
            </div>
          </div>

          <div className="box-row">
            <div className="box-8 vertical-center-parent">
              <div className="vertical-center">
                <p className={styles.subtitle}>
                  Thickness of current collector / g
                </p>
              </div>
            </div>
            <div className="box-4 vertical-center-parent">
              <div className="vertical-center">
                <input
                  className={styles.button}
                  type="text"
                  aria-label="Set current collector mass"
                  value={String(valueReturn(CCMass))}
                  onChange={(e) => dispatch(setCCMass(e.target.value))}
                  onBlur={(e) => validate(e)}
                ></input>
              </div>
            </div>
          </div>

          <div className="box-row">
            <div className="box-8 vertical-center-parent">
              <div className="vertical-center">
                <p className={styles.subtitle}>
                  Mass of {ActiveElectrode} + current collector / g
                </p>
              </div>
            </div>
            <div className="box-4 vertical-center-parent">
              <div className="vertical-center">
                <input
                  className={styles.button}
                  aria-label="Set dry mass"
                  onChange={(e) => dispatch(setDryMass(e.target.value))}
                  value={String(valueReturn(DryMass))}
                  onBlur={(e) => validate(e)}
                ></input>
              </div>
            </div>
          </div>

          <WetMassBox electrode={ActiveElectrode} />

          <ResetElectrodes />
        </div>
      </div>
    </div>
  );
}
