import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Stack.module.css";
import { valueReturn } from "./stackFunctions";
import "./../../App.css";
import {
  selectLowRateCapacity,
  selectMeasuredCapacity,
  selectAvgVoltage,
  setAvgVoltage,
  setLowRateCapacity,
  setMeasuredCapacity,
  selectMeasuredCurrent,
  setMeasuredCurrent,
} from "./stackSlice";
export function Stack() {
  const MeasuredCapacity = useSelector(selectMeasuredCapacity);
  const AverageVoltage = useSelector(selectAvgVoltage);
  const LowRateCapacity = useSelector(selectLowRateCapacity);
  const MeasuredCurrent = useSelector(selectMeasuredCurrent);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="container">
        <div className="box-12">
          <div className={styles.electrodeSection}>
            <div className="box-row">
              <div className="box-12">
                <p className={styles.title}>Performance measurements</p>
              </div>
            </div>
            <div className="box-row">
              <div className="box-12">
                <div className="box-12">
                  <p className={styles.title}>Low current capacity / mAh</p>
                  <input
                    className={styles.button}
                    aria-label="Set low rate capacity"
                    type="number"
                    onChange={(e) =>
                      dispatch(setLowRateCapacity(e.target.value))
                    }
                    value={valueReturn(LowRateCapacity)}
                  ></input>
                </div>

                <div className="box-12">
                  <p className={styles.title}>
                    Current of reported capacity / mA
                  </p>
                  <input
                    className={styles.button}
                    aria-label="Set measured current"
                    type="number"
                    onChange={(e) =>
                      dispatch(setMeasuredCurrent(e.target.value))
                    }
                    value={valueReturn(MeasuredCurrent)}
                  ></input>
                </div>

                <div className="box-12">
                  <p className={styles.title}>Reported capacity / mAh</p>
                  <input
                    className={styles.button}
                    aria-label="Set measured capacity"
                    type="number"
                    onChange={(e) =>
                      dispatch(setMeasuredCapacity(e.target.value))
                    }
                    value={valueReturn(MeasuredCapacity)}
                  ></input>
                </div>

                <div className="box-12">
                  <p className={styles.title}>
                    Average voltage for reported capacity / V
                  </p>
                  <input
                    className={styles.button}
                    aria-label="Set avg voltage"
                    type="number"
                    onChange={(e) => dispatch(setAvgVoltage(e.target.value))}
                    value={valueReturn(AverageVoltage)}
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
