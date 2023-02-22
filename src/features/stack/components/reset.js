import { React } from "react";
import { useDispatch } from "react-redux";
import styles from "./../Stack.module.css";
import { setActiveElectrode } from "./../stackSlice";

export function ResetElectrodes() {
  const dispatch = useDispatch();
  return (
    <div className="box-row">
      <div className="box-12">
        <button
          className={styles.button + " " + styles.smallButton}
          onClick={() => dispatch(setActiveElectrode("none"))}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
