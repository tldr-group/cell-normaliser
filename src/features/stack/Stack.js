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
} from "./stackSlice";
export function Stack() {
  const MeasuredCapacity = useSelector(selectMeasuredCapacity);
  const AverageVoltage = useSelector(selectAvgVoltage);
  const LowRateCapacity = useSelector(selectLowRateCapacity);
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
                  <p className={styles.title}>Low current capacity / mA h</p>
                  <input
                    className={styles.button}
                    aria-label="Set low rate capacity"
                    onChange={(e) =>
                      dispatch(setLowRateCapacity(e.target.value))
                    }
                    value={String(valueReturn(LowRateCapacity))}
                  ></input>
                </div>

                <div className="box-12">
                  <p className={styles.title}>Current of reported capacity / mA</p>
                  <input
                    className={styles.button}
                    aria-label="Set current"
                    value={"0.1"}
                  ></input>
                </div>

                <div className="box-12">
                  <p className={styles.title}>Reported capacity / mA h</p>
                  <input
                    className={styles.button}
                    aria-label="Set measured capacity"
                    onChange={(e) =>
                      dispatch(setMeasuredCapacity(e.target.value))
                    }
                    value={String(valueReturn(MeasuredCapacity))}
                  ></input>
                </div>

                <div className="box-12">
                <div className="box-12">
                  <p className={styles.title}>Average voltage for reported capacity / V</p>
                  <input
                    className={styles.button}
                    aria-label="Set avg voltage"
                    onChange={(e) => dispatch(setAvgVoltage(e.target.value))}
                    value={String(valueReturn(AverageVoltage))}
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
